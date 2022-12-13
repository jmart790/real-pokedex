<template>
  <article class="defense-type" :class="`defense-type--${groupClass}`">
    <h4>{{ group }}</h4>
    <div class="defense-type__group">
      <TypePill
        class="defense-type__item"
        :type="type"
        mode="icon"
        v-for="type in types"
        :key="`defense-type--${type}`"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{ group: string; types: string[] }>();

const groupClass = computed(() => props.group.replace(' ', '-'));
</script>

<style scoped lang="scss">
.defense-type {
  @include frost-bg;
  border-radius: $cool-border-radius;
  display: flex;
  align-items: center;
  h4 {
    height: 100%;
    width: fit-content;
    background-color: rgba(white, 0.6);
    padding: gap(2) gap(3);
    width: 130px;
    border-top-left-radius: inherit;
    border-bottom-right-radius: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;
    color: rgba(white, 0.9);
  }
  &__group {
    padding: gap(2);
    display: flex;
    gap: gap(3);
  }
  &--very-weak {
    h4 {
      background: rgba($pokemon-fire, 0.7);
    }
  }
  &--weak {
    h4 {
      background: rgba($pokemon-electric, 0.7);
    }
  }
  &--resistant {
    h4 {
      background: rgba($pokemon-grass, 0.7);
    }
  }
  &--very-resistant {
    h4 {
      background: rgba($pokemon-water, 0.7);
    }
  }
}
</style>
