<template>
  <section class="type-defense"></section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';

const pokeStore = usePokeStore();

const { activePokemon } = storeToRefs(pokeStore);
</script>

<style scoped lang="scss">
.type-defense {
  @include cool-bg;
  padding: $medium-window-padding;
}
</style>
