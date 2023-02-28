<template>
  <section class="region" :class="`region--${region}`">
    <h2>{{ region }}</h2>
  </section>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';

const pokeStore = usePokeStore();

const { genNum, region } = storeToRefs(pokeStore);
</script>

<style scoped lang="scss">
.region {
  height: 100%;
  width: 100%;
  background-color: $light-grey;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: $medium-window-padding;
  &--kanto {
    background-image: url('@/assets/images/kanto_map.webp');
    h2 {
      bottom: 8px;
      left: 8px;
    }
  }
  &--hoenn {
    background-image: url('@/assets/images/hoenn_map.webp');
    h2 {
      top: 8px;
      right: 8px;
    }
  }
  &--alola {
    background-image: url('@/assets/images/alola_map.webp');
    h2 {
      bottom: 8px;
      left: 8px;
    }
  }
  &--kalos {
    background-image: url('@/assets/images/kalos_map.webp');
    h2 {
      top: 8px;
      left: 8px;
    }
  }
  &--johto {
    background-image: url('@/assets/images/johto_map.webp');
    h2 {
      bottom: 8px;
      right: 8px;
    }
  }
  &--sinnoh {
    background-image: url('@/assets/images/sinnoh_map.webp');
    h2 {
      top: 8px;
      left: 8px;
    }
  }
  &--unova {
    background-image: url('@/assets/images/unova_map.webp');
    h2 {
      top: 8px;
      left: 8px;
    }
  }
  &--galar {
    background-image: url('@/assets/images/galar_map.webp');
  }
  h2 {
    position: absolute;
    width: fit-content;
    color: $light-grey;
    font-size: rem(30);
    font-weight: bold;
    text-transform: capitalize;
    font-family: $secondary-font;
    letter-spacing: gap(1);
    mix-blend-mode: plus-lighter;
  }
}
</style>
