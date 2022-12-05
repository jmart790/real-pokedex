<template>
  <div class="type-pill" :class="`type-pill--${type}`">
    <Icon class="type-pill__icon" :name="`type-${type}`" />
    <span class="type-pill__copy">{{ type }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ type: string }>();
</script>

<style scoped lang="scss">
.type-pill {
  display: flex;
  align-items: center;
  background-color: $pokemon-grass;
  border-radius: 20px;
  padding: gap(1) gap(3);
  &__icon {
    width: 25px;
    height: 25px;
    fill: rgba(white, 0.85);
  }
  &__copy {
    line-height: 1.2;
    text-transform: capitalize;
    color: rgba(white, 0.85);
    font-size: rem(14);
  }

  &--fire {
    background: $pokemon-fire;
  }
  &--grass {
    background: $pokemon-grass;
  }
  &--water {
    background: $pokemon-water;
  }
  &--normal {
    background: $pokemon-normal;
  }
  &--poison {
    background: $pokemon-poison;
  }
  &--bug {
    background: $pokemon-bug;
  }
  &--ground {
    background: $pokemon-ground;
  }
  &--fighting {
    background: $pokemon-fighting;
  }
  &--rock {
    background: $pokemon-rock;
  }
  &--electric {
    background: $pokemon-electric;
  }
  &--fairy {
    background: $pokemon-fairy;
  }
  &--psychic {
    background: $pokemon-psychic;
  }
  &--ghost {
    background: $pokemon-ghost;
  }
  &--ice {
    background: $pokemon-ice;
  }
  &--dragon {
    background: $pokemon-dragon;
  }
  &--steel {
    background: $pokemon-steel;
  }
  &--flying {
    background: $pokemon-flying;
  }
}
</style>
