<template>
  <article class="evo-chain">
    <div class="evo-chain__card">
      <PikachuLoader v-if="isLoading" />
      <div
        v-else-if="evoChain"
        class="evo-chain__pokemons"
        :class="{
          'evo-chain__pokemons--single': totalEvolutions === 1,
          'evo-chain__pokemons--multiple-rows': totalEvolutions > 4
        }"
      >
        <EvolutionCard
          v-for="pokemon in evoChain"
          :key="pokemon.name"
          v-bind="{ ...pokemon, totalEvolutions }"
          class="evo-chain__pokemon"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { watchEffect, ref, computed } from 'vue';
import PokeAPI, {
  type IChainLink,
  type IEvolutionDetail,
  type IPokemon
} from 'pokeapi-typescript';
import { useLoading } from '@/composables/useLoading';

const { isLoading, executeFn } = useLoading(getEvoChain);

interface IPokeEvolution {
  name: string;
  url: string;
  details: IEvolutionDetail[];
  pokemon: IPokemon;
  isNonLinear?: boolean;
}

const pokeStore = usePokeStore();
const { activePokemonId } = storeToRefs(pokeStore);
const evoChain = ref<IPokeEvolution[]>();

const totalEvolutions = computed(() => {
  return evoChain.value?.length || 0;
});

async function mapEvolutionsRecursively(
  chain: IChainLink,
  evolutions: IPokeEvolution[]
) {
  const { species, evolution_details, evolves_to } = chain;
  const pokemon = await PokeAPI.Pokemon.resolve(species.name);
  evolutions.push({ ...species, details: evolution_details, pokemon });
  if (!evolves_to.length) return evolutions;
  const nextChain = evolves_to[0];
  await mapEvolutionsRecursively(nextChain, evolutions);
  return evolutions;
}

async function mapEvolutionsLinearly(
  chain: IChainLink,
  evolutions: IPokeEvolution[]
) {
  chain.evolves_to.forEach(async (evo) => {
    const { species, evolution_details } = evo;
    const pokemon = await PokeAPI.Pokemon.resolve(species.name);
    evolutions.push({
      ...species,
      details: evolution_details,
      pokemon,
      isNonLinear: true
    });
  });
  return evolutions;
}

async function getEvoChain(id: number) {
  const evolutions: IPokeEvolution[] = [];
  const chainId = await PokeAPI.PokemonSpecies.resolve(id).then((res) => {
    return Number(res.evolution_chain.url.split('/')[6]);
  });
  try {
    // hacky test, meowth has a weird evo chain and it breaks the view
    evoChain.value = await PokeAPI.EvolutionChain.resolve(chainId).then(
      async ({ chain }) =>
        chain.evolves_to.length > 2
          ? await mapEvolutionsLinearly(chain, evolutions)
          : await mapEvolutionsRecursively(chain, evolutions)
    );
  } catch (e) {
    // do something meaningfull
    console.log({ e });
  } 
}

watchEffect(async () => {
  const payload = activePokemonId.value || 1;
  await executeFn(payload);
});
</script>

<style scoped lang="scss">
.evo-chain {
  @include cool-bg;
  padding: $medium-window-padding;
  &__card {
    height: 100%;
  }
  &__pokemons {
    position: relative;
    z-index: 5;
    height: inherit;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    align-content: center;
    gap: gap(4);
    border-radius: $cool-border-radius;
    &--single {
      max-width: 50%;
      margin-inline: auto;
    }
    &--multiple-rows {
      gap: gap(1);
    }
  }
  &__pokemon {
    width: 100%;
    height: 100%;
  }
}
</style>
