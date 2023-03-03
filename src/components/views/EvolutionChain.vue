<template>
  <article class="evo-chain">
    <div class="evo-chain__card">
      <PikachuLoader v-if="isLoading" />
      <div v-else-if="isYoshView" class="evo-chain__pokemons">
        <div
          v-for="(yosh, index) in yoshs"
          :key="`yosh-evo--${index}`"
          class="evo-chain__yosh"
        >
          <p>{{ yosh.level }}</p>
          <img :src="(yosh.img as unknown as string)" :alt="yosh.name" />
          <FrostCard>
            <label>{{ yosh.name }}</label>
          </FrostCard>
          <span v-if="index < 2" class="evo-chain__arrow">→</span>
        </div>
      </div>
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
import { useControlsStore } from '@/store/controls';

const controlsStore = useControlsStore();
const { isYoshView } = storeToRefs(controlsStore);

const { isLoading, executeFn } = useLoading(getEvoChain);

const childYoshUrl = new URL('/src/assets/images/BonzaiYoshChild.png', import.meta.url);
const youngYoshUrl = new URL('/src/assets/images/BonzaiYoshYoung.png', import.meta.url);
const professorYoshUrl = new URL('/src/assets/images/BonzaiYoshProfessor.png', import.meta.url);

const yoshs = [
  { name: 'Child Yosh', img: childYoshUrl, level: '9 years' },
  { name: 'Young Yosh', img: youngYoshUrl, level: '22 years' },
  { name: 'Prof. Yosh', img: professorYoshUrl, level: '35 years' }
];

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
  &__yosh {
    height: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    justify-items: center;
    color: $off-white;
    img {
      width: 115px;
      filter: drop-shadow(4px 4px 8px rgba(black, 0.7));
    }
    p {
      font-size: rem(12);
    }
    label {
      padding-inline: gap(3);
    }
    &:first-of-type {
      img {
        margin-top: auto;
        height: 180px;
      }
    }
  }
  &__arrow {
    position: absolute;
    top: -2px;
    left: 120px;
  }
}
</style>
