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
const isLazyLoaded = ref<{ [index: string]: boolean }>({ 0: true });

function handleScrollInto(parent: HTMLUListElement | null) {
  if (!parent) return;
  const activeChild = parent.getElementsByClassName(
    'pokemon-list__active-tile'
  )[0];
  if (!activeChild) return;
  activeChild.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
    inline: 'center'
  });
}

function lazyLoadPokemon(newPosition: number) {
  console.log(
    '🚀 ~ file: PokemonList.vue ~ line 50 ~ lazyLoadPokemon ~ newPosition',
    newPosition
  );
  const buffer = 20;

  // check for list checkpoint to batch load buffer amount
  // do this once to avoid loading again

  if (newPosition === 10 || newPosition === 9) {
    const startPosition = 20;
    for (let i = 20; i <= startPosition + buffer; i++) {
      isLazyLoaded.value[i] = true;
    }
  } else if (newPosition === 30 || newPosition === 29) {
    const startPosition = 50;
    for (let i = 30; i <= startPosition + buffer; i++) {
      isLazyLoaded.value[i] = true;
    }
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
