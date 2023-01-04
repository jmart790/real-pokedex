<template>
  <FrostCard>
    <div class="type-pill" :class="`type-pill--${type} type-pill--${mode}`">
      <Icon
        v-if="mode !== 'copy'"
        class="type-pill__icon"
        :name="`type-${type}`"
      />
      <span v-if="mode !== 'icon'" class="type-pill__copy">{{ type }} </span>
    </div>
  </FrostCard>
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
  border-radius: inherit;
  &__icon {
    width: 25px;
    height: 25px;
    fill: rgba(white, 0.85);
    filter: drop-shadow(1px 1px 4px rgba(black, 0.3));
  }
  &__copy {
    line-height: 1;
    text-transform: capitalize;
    color: rgba(white, 0.85);
    text-shadow: 1px 1px 4px rgba(black, 0.3);
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
  }

  @mixin gradient-bg($color-1, $color-2) {
    #{$self}__copy {
      color: $color-2;
    }
    #{$self}__icon {
      fill: $color-2;
    }
    // background: linear-gradient(40deg, $color-2 30%, $color-2 100%);
    background: linear-gradient(
      40deg,
      rgba($color-1, 0.4) 30%,
      rgba(255, 255, 255, 0.1) 100%
    );
  }
  &--fire {
    @include gradient-bg($pokemon-fire, $pokemon-fire-light);
  }
  &--grass {
    @include gradient-bg($pokemon-grass, $pokemon-grass-light);
  }
  &--water {
    @include gradient-bg($pokemon-water, $pokemon-water-light);
  }
  &--normal {
    @include gradient-bg($pokemon-normal, $pokemon-normal-light);
  }
  &--poison {
    @include gradient-bg($pokemon-poison, $pokemon-poison-light);
  }
  &--bug {
    @include gradient-bg($pokemon-bug, $pokemon-bug-light);
  }
  &--ground {
    @include gradient-bg($pokemon-ground, $pokemon-ground-light);
  }
  &--fighting {
    @include gradient-bg($pokemon-fighting, $pokemon-fighting-light);
  }
  &--rock {
    @include gradient-bg($pokemon-rock, $pokemon-rock-light);
  }
  &--electric {
    @include gradient-bg($pokemon-electric, $pokemon-electric-light);
  }
  &--fairy {
    @include gradient-bg($pokemon-fairy, $pokemon-fairy-light);
  }
  &--psychic {
    @include gradient-bg($pokemon-psychic, $pokemon-psychic-light);
  }
  &--ghost {
    @include gradient-bg($pokemon-ghost, $pokemon-ghost-light);
  }
  &--ice {
    @include gradient-bg($pokemon-ice, $pokemon-ice-light);
  }
  &--dragon {
    @include gradient-bg($pokemon-dragon, $pokemon-dragon-light);
  }
  &--steel {
    @include gradient-bg($pokemon-steel, $pokemon-steel-light);
  }
  &--flying {
    @include gradient-bg($pokemon-flying, $pokemon-flying-light);
  }
}
</style>
