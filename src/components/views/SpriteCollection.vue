<template>
  <section class="sprite-collection">
    <PikachuLoader v-if="isLoading" />
    <div v-else class="sprite-collection__container">
      <div class="sprite-collection__sprites">
        <div
          class="sprite-collection__sprite"
          v-for="sprite in spritesSplit.firstHalf"
          :key="sprite"
        >
          <img :src="sprite" />
        </div>
      </div>
      <div class="sprite-collection__sprites">
        <div
          class="sprite-collection__sprite"
          v-for="sprite in spritesSplit.secondHalf"
          :key="sprite"
        >
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

const pokeStore = usePokeStore();
const { activePokemon } = storeToRefs(pokeStore);

const isLoading = ref(false);
const sprites = ref([]);

const spritesSplit = computed(() => {
  if (!sprites.value) return { firstHalf: [], secondHalf: [] };
  const middleIndex = Math.ceil(sprites.value.length / 2);
  const firstHalf = sprites.value.slice(0, middleIndex);
  const secondHalf = sprites.value.slice(-middleIndex);
  return { firstHalf, secondHalf };
});

const scrollSpeed = computed(() => {
  const ratio = 1.558;
  return `${sprites.value.length * ratio}s`;
});

function extractSprites(
  sprites: IPokemonSpritesUpdated,
  spritesArray: string[]
) {
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
    sprites.value = spritesArray;
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
