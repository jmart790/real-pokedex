<template>
  <div class="type-pill" :class="`type-pill--${type} type-pill--${mode}`">
    <Icon
      v-if="mode !== 'copy'"
      class="type-pill__icon"
      :name="`type-${type}`"
    />
    <span v-if="mode !== 'icon'" class="type-pill__copy">{{ type }} </span>
  </div>
</template>

<script setup lang="ts">
// correct type type
type Mode = 'default' | 'copy' | 'icon';
withDefaults(defineProps<{ type: string; mode: Mode }>(), { mode: 'default' });
</script>

<style scoped lang="scss">
.type-pill {
  $self: &;
  width: fit-content;
  display: flex;
  align-items: center;
  background-color: $pokemon-grass;
  border-radius: 20px;
  &__icon {
    width: 25px;
    height: 25px;
    fill: rgba(white, 0.85);
    filter: drop-shadow(0px 0px 4px rgba(black, 0.5));
  }
  &__copy {
    line-height: 1;
    text-transform: capitalize;
    color: rgba(white, 0.85);
    font-size: rem(14);
    text-shadow: 0px 0px 4px rgba(black, 0.5);
  }

  &--default {
    padding: gap(1) gap(4) gap(1) gap(3);
  }
  &--copy {
    padding: gap(1) gap(3);
  }
  &--icon {
    border-radius: 50%;
    #{$self}__icon {
      width: 35px;
      height: 35px;
    }
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
