<template>
  <article class="pokemon-list">
    <Transition name="screen-fade" mode="out-in">
      <div v-if="isGenLoading" class="pokemon-list__loader-wrapper">
        <PikachuLoader />
      </div>
      <PokemonGrid v-else :pokemon="pokemonList || []" :activeIndex="listPosition" />
    </Transition>
  </article>
</template>

<script setup lang="ts">
import { watchEffect, watch } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { useControlsStore } from '@/store/controls';
import { storeToRefs } from 'pinia';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();
const { setActivePokemonPayload } = pokeStore;
const { pokemonList, isGenLoading, genNum } = storeToRefs(pokeStore);
const { listPosition } = storeToRefs(controlsStore);
const { resetListPosition } = controlsStore;

function handlePokemonHighlighted(pos = 0) {
  if (!pokemonList?.value?.length) return;
  const id = String(pokemonList.value[pos]?.id) || '0';
  setActivePokemonPayload(id);
}

watch(genNum, (newVal, oldVal) => {
  if (newVal !== oldVal) resetListPosition();
});

// Images load themselves via loading="lazy" as tiles scroll into view.
watchEffect(() => handlePokemonHighlighted(listPosition.value));
</script>

<style scoped lang="scss">
.pokemon-list {
  @include cool-bg;
  &__loader-wrapper {
    height: 100%;
    padding: gap(3) gap(4);
  }
}
</style>
