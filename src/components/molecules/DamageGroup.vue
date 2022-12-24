<template>
  <article class="damage-group" :class="`damage-group--${groupClass}`">
    <Icon
      class="damage-group__icon"
      v-if="groupClass === 'double'"
      :name="group.includes('from') ? 'shield-icon' : 'swords-icon'"
    />
    <Toast
      class="damage-group__label"
      :copy="groupLabel"
      :is-header="group.includes('half')"
    />
    <div
      class="damage-group__groups"
      :class="{ 'damage-group__groups--lg': types.length >= 5 }"
    >
      <TypePill
        class="damage-group__item"
        v-for="item in types"
        :key="`damage-group--${item}`"
        mode="icon"
        :type="item"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  group: string;
  types: string[];
}>();

const groupLabel = computed(
  () =>
    ({
      double_damage_from: '2x DMG',
      double_damage_to: '2x DMG',
      half_damage_from: '1/2 DMG',
      half_damage_to: '1/2 DMG'
    }[props.group])
);

const groupClass = computed(() => {
  return props.group.includes('double') ? 'double' : 'half';
});
</script>

<style scoped lang="scss">
.damage-group {
  $self: &;
  $body-skew: -30deg;
  $label-skew: -8deg;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: gap(2);
  transform: skew($body-skew);
  padding: gap(2);
  &::before {
    content: '';
    position: absolute;
    height: 50%;
    width: 75px;
    background: inherit;
  }

  &__label {
    background: rgba(black, 0.5);
    transform: skew($label-skew);
    font-weight: bold;
    ::v-deep .toast__content {
      transform: skew(-1 * ($body-skew + $label-skew));
    }
  }

  &__groups {
    height: min-content;
    max-width: 100px;
    @include flex-center;
    flex-wrap: wrap;
    gap: gap(2);
    transform: skew(-1 * $body-skew);
    &--lg {
      max-width: 150px;
    }
  }
  &__item {
    height: min-content;
  }
  &__icon {
    position: absolute;
    left: -30px;
    transform: skew(-1 * $body-skew);
    width: 60px;
    height: 60px;
    fill: $off-white;
    stroke: rgba(black, 0.5);
    stroke-width: 8px;
  }

  &--half {
    &::before {
      top: 0;
      left: -75px;
    }
    #{$self}__label {
      left: -60px;
      padding-left: 25px;
      background-color: rgba(white, 0.6);
      color: $off-black;
    }
  }
  &--double {
    border-left: 4px solid rgba(black, 0.5);
    &::before {
      bottom: 0;
      right: -75px;
    }
    #{$self}__label {
      right: -60px;
      padding-right: 25px;
      background-color: rgba($pokemon-fire, 0.6);
    }
  }
}
</style>
