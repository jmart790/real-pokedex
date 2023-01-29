<template>
  <article class="damage-group">
    <h4>{{ groupLabel }} {{ relation }}</h4>
    <div class="damage-group__groups">
      <TransitionGroup name="special">
        <TypePill
          class="damage-group__item"
          v-for="item in types"
          :key="`damage-group--${item}`"
          mode="default"
          :type="item"
        />
      </TransitionGroup>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  group: string;
  types: string[];
  relation: string;
}>();

const groupLabel = computed(() =>
  props.group === 'double' ? '2x DMG' : '1/2 DMG'
);
</script>

<style scoped lang="scss">
.damage-group {
  $self: &;

  h4 {
    margin-bottom: gap(1);
    color: $off-white;
    letter-spacing: 1px;
    text-align: center;
    font-family: $secondary-font;
    font-weight: 600;
    text-transform: capitalize;
  }

  &__groups {
    height: min-content;
    width: fit-content;
    padding: gap(2);
    display: flex;
    flex-wrap: wrap;
    gap: gap(2);
  }
}
// .special-enter-from {
//   // opacity: 0;
//   transform: scale(0.6);
// }
// .special-enter-to {
//   // opacity: 1;
//   transform: scale(1);
// }
// .special-enter-active {
//   transition: transform 1s ease;
// }
</style>
