<template>
  <article class="pokemon-list">
    <ul ref="pokelist">
      <li
        v-for="({ name }, index) in pokemonList"
        :key="`pokemon-${name}`"
        :class="{ 'pokemon-list__active-tile': listPosition === index }"
      >
        <PokemonTile
          v-if="isLazyLoaded[index]"
          v-bind="{
            name,
            isActive: listPosition === index
          }"
        />
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { useControlsStore } from '@/store/controls';
import { storeToRefs } from 'pinia';

// move some state to store so we can track the lazy loaded and go back with everything loaded

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();
const { pokemonList, genNum } = storeToRefs(pokeStore);
const { listPosition } = storeToRefs(controlsStore);
const pokelist = ref<HTMLUListElement | null>(null);
const isLazyLoaded = ref<{ [index: string]: boolean }>({ 1: true });

function handleScrollInto(parent: HTMLUListElement | null) {
  if (!parent) return;
  console.log({ parent });
  const activeChild = parent.getElementsByClassName(
    'pokemon-list__active-tile'
  )[0];
  activeChild.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });
}

function lazyLoadPokemon(newPosition: number) {
  const buffer = 20;
  const indexToLoad = buffer + newPosition;
  if (indexToLoad <= Number(pokemonList.value?.length)) {
    isLazyLoaded.value[indexToLoad] = true;
    isLazyLoaded.value[indexToLoad - 1] = true;
  }
}

function handlePokemonHighlighted(pos = 0) {
  if (!pokemonList?.value?.length) return;
  const { name } = pokemonList.value[pos];
  pokeStore.setActivePokemonName(name);
}

function initializeLazyLoad() {
  let initialObject = {};
  for (let i = 0; i <= Number(pokemonList?.value?.length); i++) {
    if (i < 20) initialObject[i] = true;
    else initialObject[i] = false;
    isLazyLoaded.value = { ...initialObject };
  }
}

onMounted(() => {
  initializeLazyLoad();
  handleScrollInto(pokelist.value);
  handlePokemonHighlighted();
});

watch(listPosition, (newPosition) => {
  lazyLoadPokemon(newPosition);
  handleScrollInto(pokelist.value);
  handlePokemonHighlighted(newPosition);
});
</script>

<style scoped lang="scss">
.pokemon-list {
  position: absolute;
  inset: 0 -2px 0 -2px;
  width: 100%;
  height: 100%;
  background: $off-white;

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
