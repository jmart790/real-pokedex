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
  &--kanto {
    background-image: url('@/assets/images/kanto_map.webp');
  }
  &--hoenn {
    background-image: url('@/assets/images/hoenn_map.webp');
  }
  &--alola {
    background-image: url('@/assets/images/alola_map.webp');
  }
  &--johto {
    background-image: url('@/assets/images/johto_map.webp');
  }
  &--kalos {
    background-image: url('@/assets/images/kalos_map.webp');
  }
  &--johto {
    background-image: url('@/assets/images/johto_map.webp');
  }
  &--sinnoh {
    background-image: url('@/assets/images/sinnoh_map.webp');
  }
  &--unova {
    background-image: url('@/assets/images/unova_map.webp');
  }
  h2 {
    margin-left: gap(2);
    color: $dark-grey;
    font-size: rem(24);
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: gap(1);
  }
}
</style>
