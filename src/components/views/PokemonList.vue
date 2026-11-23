<template>
  <article class="pokemon-list">
    <div v-if="isGenLoading" class="pokemon-list__loader-wrapper">
      <PikachuLoader />
    </div>
    <ul v-else ref="listElement" @wheel.prevent>
      <li
        v-for="({ name, id, type, height }, index) in pokemonList"
        :key="`pokemon-${name}`"
        :class="{ 'pokemon-list__active-tile': listPosition === index }"
      >
        <FrostCard>
          <PokemonTile
            v-bind="{
              name,
              id,
              type,
              height,
              isActive: listPosition === index
            }"
          />
        </FrostCard>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { watchEffect, watch, ref } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { useControlsStore } from '@/store/controls';
import { storeToRefs } from 'pinia';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();
const { setActivePokemonPayload } = pokeStore;
const { pokemonList, isGenLoading, genNum } = storeToRefs(pokeStore);
const { listPosition } = storeToRefs(controlsStore);
const { resetListPosition } = controlsStore;
const listElement = ref<HTMLUListElement | null>(null);

// Keeps the active tile at least `threshold` px from the top/bottom edge, whatever the direction.
function handleScrollInto(parent: HTMLUListElement | null, pos: number) {
  const activeChild = parent?.children[pos] as HTMLElement | undefined;
  if (!parent || !activeChild) return;

  const threshold = 100;
  const top = activeChild.offsetTop;
  const bottom = top + activeChild.offsetHeight;

  if (top < parent.scrollTop + threshold) {
    parent.scrollTop = top - threshold;
  } else if (bottom > parent.scrollTop + parent.clientHeight - threshold) {
    parent.scrollTop = bottom - parent.clientHeight + threshold;
  }
}

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

// flush: 'post' measures after Vue re-renders, otherwise the scroll uses the previous tile's position
watch([listPosition, listElement], () => handleScrollInto(listElement.value, listPosition.value), {
  flush: 'post',
  immediate: true
});
</script>

<style scoped lang="scss">
.pokemon-list {
  @include cool-bg;
  &__loader-wrapper {
    height: 100%;
    padding: gap(3) gap(4);
  }
  ul {
    padding: gap(9) gap(5);
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(3) gap(4);
    overflow: hidden;
  }
  li {
    // Browser skips layout/paint for off-screen tiles but keeps them in the DOM (no flicker, scroll math intact)
    content-visibility: auto;
    contain-intrinsic-size: auto 50px;
  }
}
</style>
