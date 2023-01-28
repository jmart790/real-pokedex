<template>
  <section class="sprite-collection">
    <PikachuLoader v-if="isLoading" />
    <div v-else class="sprite-collection__container">
      <div
        class="sprite-collection__sprite"
        v-for="sprite in sprites"
        :key="sprite"
      >
        <img :src="sprite" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import type { IPokemonSpritesUpdated } from '@/types';

const pokeStore = usePokeStore();
const { activePokemon } = storeToRefs(pokeStore);

const isLoading = ref(false);
const sprites = ref([]);

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
  &__container {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: gap(2);
    overflow: auto;
  }
  &__sprite {
    max-width: 120px;
    img {
      width: 100%;
    }
  }
}
</style>
