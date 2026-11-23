<template>
  <ul ref="listElement" class="pokemon-grid" @wheel.prevent>
    <li v-for="({ name, id, type, height }, index) in pokemon" :key="`pokemon-${name}`">
      <FrostCard>
        <PokemonTile v-bind="{ name, id, type, height, isActive: activeIndex === index }" />
      </FrostCard>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { IPokemonListItem } from '@/store/pokemon';

// Shared by the Pokemon list and search results so both look and scroll the same.
const props = defineProps<{ pokemon: IPokemonListItem[]; activeIndex: number }>();
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

// flush: 'post' measures after Vue re-renders, otherwise the scroll uses the previous tile's position
watch(
  [() => props.activeIndex, () => props.pokemon, listElement],
  () => handleScrollInto(listElement.value, props.activeIndex),
  { flush: 'post', immediate: true }
);
</script>

<style scoped lang="scss">
.pokemon-grid {
  padding: gap(9) gap(5);
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: max-content;
  gap: gap(3) gap(4);
  overflow: hidden;
}
</style>
