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
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
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

  @mixin radiant-bg($color-1, $color-2) {
    background: $color-1;
    background: radial-gradient(ellipse at center, $color-1 0%, $color-2 150%);
  }
  &--fire {
    @include radiant-bg($pokemon-fire, $pokemon-fire-light);
  }
  &--grass {
    @include radiant-bg($pokemon-grass, $pokemon-grass-light);
  }
  &--water {
    @include radiant-bg($pokemon-water, $pokemon-water-light);
  }
  &--normal {
    @include radiant-bg($pokemon-normal, $pokemon-normal-light);
  }
  &--poison {
    @include radiant-bg($pokemon-poison, $pokemon-poison-light);
  }
  &--bug {
    @include radiant-bg($pokemon-bug, $pokemon-bug-light);
  }
  &--ground {
    @include radiant-bg($pokemon-ground, $pokemon-ground-light);
  }
  &--fighting {
    @include radiant-bg($pokemon-fighting, $pokemon-fighting-light);
  }
  &--rock {
    @include radiant-bg($pokemon-rock, $pokemon-rock-light);
  }
  &--electric {
    @include radiant-bg($pokemon-electric, $pokemon-electric-light);
  }
  &--fairy {
    @include radiant-bg($pokemon-fairy, $pokemon-fairy-light);
  }
  &--psychic {
    @include radiant-bg($pokemon-psychic, $pokemon-psychic-light);
  }
  &--ghost {
    @include radiant-bg($pokemon-ghost, $pokemon-ghost-light);
  }
  &--ice {
    @include radiant-bg($pokemon-ice, $pokemon-ice-light);
  }
  &--dragon {
    @include radiant-bg($pokemon-dragon, $pokemon-dragon-light);
  }
  &--steel {
    @include radiant-bg($pokemon-steel, $pokemon-steel-light);
  }
  &--flying {
    @include radiant-bg($pokemon-flying, $pokemon-flying-light);
  }
}
</style>
