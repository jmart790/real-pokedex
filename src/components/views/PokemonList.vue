<template>
  <article class="pokemon-list">
    <PikachuLoader v-if="isGenLoading" />
    <ul v-else ref="listElement">
      <li
        v-for="({ name, isLoaded, id }, index) in pokemonList"
        :key="`pokemon-${name}`"
        :class="{ 'pokemon-list__active-tile': listPosition === index }"
      >
        <FrostCard>
          <PokemonTile
            v-if="isLoaded"
            v-bind="{
              name,
              genNum,
              id,
              isActive: listPosition === index
            }"
          />
        </FrostCard>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { watchEffect, watch, ref } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { useControlsStore } from '@/store/controls';
import { storeToRefs } from 'pinia';

// move some state to store so we can track the lazy loaded and go back with everything loaded

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();
const { pokemonList, isGenLoading, genNum } = storeToRefs(pokeStore);
const { listPosition } = storeToRefs(controlsStore);
const { resetListPosition, setListLength } = controlsStore;
const listElement = ref<HTMLUListElement | null>(null);

function handleScrollInto(parent: HTMLUListElement | null) {
  if (!parent || !pokemonList?.value?.length) return;

  const activeChild = parent.getElementsByClassName(
    'pokemon-list__active-tile'
  )[0];
  if (!activeChild) return;
  activeChild.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'end'
  });
}

function lazyLoadPokemon(pos: number) {
  if (!pokemonList.value?.length) return;

  const loadBuffer = 20;
  const posToLoad = pos + loadBuffer;

  if (posToLoad < pokemonList.value.length) {
    pokeStore.setPokemonLoaded(posToLoad);
    pokeStore.setPokemonLoaded(posToLoad - 1);
  }
}

function handlePokemonHighlighted(pos = 0) {
  if (!pokemonList?.value?.length) return;
  const { name, id } = pokemonList.value[pos];
  pokeStore.setActivePokemonPayload(id);
}

function resetList() {
  resetListPosition();
  handleScrollInto(listElement.value);
  setListLength(pokemonList.value?.length || 0);
}

watch(genNum, (newVal, oldVal) => {
  if (newVal !== oldVal) resetList();
});

watchEffect(() => {
  lazyLoadPokemon(listPosition.value);
  handleScrollInto(listElement.value);
  handlePokemonHighlighted(listPosition.value);
});
</script>

<style scoped lang="scss">
.pokemon-list {
  @include cool-bg;
  ul {
    height: 100%;
    padding: gap(9) gap(5);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(3) gap(4);
    overflow: auto;
  }
}
</style>
