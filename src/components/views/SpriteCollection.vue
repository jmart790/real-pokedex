<template>
  <section class="sprite-collection">
    <PikachuLoader v-if="isLoading" />
    <div v-else class="sprite-collection__container">
      <div class="sprite-collection__sprites">
        <div class="sprite-collection__sprite" v-for="sprite in spritesSplit.firstHalf" :key="sprite">
          <img :src="sprite" />
        </div>
      </div>
      <div class="sprite-collection__sprites">
        <div class="sprite-collection__sprite" v-for="sprite in spritesSplit.secondHalf" :key="sprite">
          <img :src="sprite" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import type { IPokemonSpritesUpdated } from '@/types';
import { useControlsStore } from '@/store/controls';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();

const { activePokemon } = storeToRefs(pokeStore);
const { isYoshView } = storeToRefs(controlsStore);

const isLoading = ref(false);
const sprites = ref([]);

const yoshSprites = {
  firstHalf: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/512px-HTML5_logo_and_wordmark.svg.png?20170517184425',
    'https://cdn.freebiesupply.com/logos/large/2x/css3-logo-png-transparent.png',
    'https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/2048px-Visual_Studio_Code_1.35_icon.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png',
    'https://www.pngall.com/wp-content/uploads/13/Pokemon-Logo-PNG-Pic.png',
    'https://cdn.freebiesupply.com/logos/thumbs/2x/prettier-1-logo.png'
  ],
  secondHalf: [
    'https://vuejs.org/images/logo.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1039px-Vitejs-logo.svg.png',
    'https://pinia.vuejs.org/logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/2560px-Sass_Logo_Color.svg.png',
    'https://seeklogo.com/images/S/segment-logo-FCBB33F58E-seeklogo.com.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/1200px-ESLint_logo.svg.png'
  ]
};

const spritesSplit = computed(() => {
  if (isYoshView.value) return yoshSprites;
  if (!sprites.value) return { firstHalf: [], secondHalf: [] };
  const middleIndex = Math.ceil(sprites.value.length / 2);
  const firstHalf = sprites.value.slice(0, middleIndex);
  const secondHalf = sprites.value.slice(-middleIndex);
  return { firstHalf, secondHalf };
});

const scrollSpeed = computed(() => {
  const ratio = 1.558;
  const totalYoshSprites = yoshSprites.firstHalf.length + yoshSprites.secondHalf.length;
  const totalPokemonSprites = sprites.value.length;
  const totalSprites = isYoshView.value ? totalYoshSprites : totalPokemonSprites;
  return `${totalSprites * ratio}s`;
});

function shuffleSprites(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function extractSprites(sprites: IPokemonSpritesUpdated, spritesArray: string[]) {
  for (const key in sprites) {
    if (key in sprites) {
      const value = sprites[key];
      if (typeof value === 'string' && value !== '') {
        spritesArray.push(value);
      } else if (typeof value === 'object') {
        extractSprites(value, spritesArray);
      }
    }
  }
}

watch(
  activePokemon,
  (pokemon) => {
    if (!pokemon?.sprites) return;
    const spritesArray = [];
    extractSprites(pokemon.sprites as IPokemonSpritesUpdated, spritesArray);
    sprites.value = shuffleSprites(spritesArray);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.sprite-collection {
  @include cool-bg;
  overflow: hidden;
  &__container {
    position: relative;
    height: 100%;
  }
  &__sprites {
    position: absolute;
    top: 0;
    height: 50%;
    width: max-content;
    display: flex;
    align-items: center;
    gap: gap(4);
    animation: slide-right v-bind(scrollSpeed) linear infinite;

    &:last-of-type {
      top: unset;
      bottom: 0;
      left: 100%;
      animation: slide-left v-bind(scrollSpeed) linear infinite;
    }
  }
  &__sprite {
    width: 120px;
    height: 120px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  @keyframes slide-right {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes slide-left {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
}
</style>
