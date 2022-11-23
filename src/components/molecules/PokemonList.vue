<template>
  <article class="pokemon-list">
    <h1 class="pokemon-list__title">Gen {{ genNum }} Pokemon</h1>
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
            isActive: listPosition === index,
          }"
        />
      </li>
    </ul>
    <p class="pokemon-list__instructions"><span>A</span> Select</p>
  </article>
</template>

<script setup lang="ts">
import { watch, ref, onMounted } from "vue";
import { usePokeStore } from "@/store/pokemon";
import { useControlsStore } from "@/store/controls";
import { storeToRefs } from "pinia";

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();

const { pokemonList, genNum } = storeToRefs(pokeStore);
const { listPosition } = storeToRefs(controlsStore);

const pokelist = ref<HTMLUListElement | null>(null);
const isLazyLoaded = ref<{ [index: string]: boolean }>({ 1: true });

function scrollInto(parent: HTMLUListElement | null) {
  if (!parent) return;
  const activeChild = parent.getElementsByClassName(
    "pokemon-list__active-tile"
  )[0];
  activeChild.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
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

onMounted(() => {
  let initialObject = {};
  for (let i = 0; i <= Number(pokemonList?.value?.length); i++) {
    if (i < 20) {
      initialObject[i] = true;
    } else {
      initialObject[i] = false;
    }
    isLazyLoaded.value = { ...initialObject };
  }
});

watch(listPosition, (newPosition) => {
  lazyLoadPokemon(newPosition);
  scrollInto(pokelist.value);
});
</script>

<style scoped lang="scss">
.pokemon-list {
  position: absolute;
  inset: 0 -2px 0 -2px;
  width: 100%;
  height: 100%;
  background: $off-white;

  &__title,
  &__instructions {
    position: absolute;
    z-index: 1;
    padding: 4px 16px;
    background: black;
    font-size: 16px;
    color: $off-white;

    &::before {
      position: absolute;
      background-color: inherit;
      z-index: -1;

      content: " ";
      width: 65px;
      height: 30px;
    }
  }

  &__title {
    top: 0;
    left: 0;
    border-bottom-right-radius: 10px;
    font-weight: 700;
    &::before {
      top: 0;
      right: -30px;
      transform: skew(-64deg);
      border-bottom-right-radius: 5px;
    }
  }
  &__instructions {
    display: flex;
    align-items: center;
    gap: 8px;
    bottom: 0;
    right: 0;
    border-top-left-radius: 10px;

    &::before {
      bottom: 0;
      left: -30px;
      transform: skew(-64deg);
      border-top-left-radius: 5px;
    }
    span {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1/1;
      width: 24px;
      border-radius: 50%;
      font-size: 14px;
      background: $light-grey;
      line-height: 1;
    }
  }

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
