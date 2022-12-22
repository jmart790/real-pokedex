<template>
  <article class="damage-group" :class="`damage-group--${group}`">
    <Icon
      class="damage-group__icon"
      v-if="group === 'double_damage_from'"
      name="shield-icon"
    />
    <Toast
      class="damage-group__label"
      :copy="groupLabel"
      :is-header="group.includes('half')"
    />
    <div
      class="damage-group__groups"
      :class="`damage-group__groups--${types.length}`"
    >
      <TypePill
        class="damage-group__item"
        :type="type"
        mode="icon"
        v-for="type in types"
        :key="`damage-group--${type}`"
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
</script>

<style scoped lang="scss">
.damage-group {
  $self: &;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: gap(2);
  transform: skew(-30deg);
  padding: gap(2);
  &::before {
    content: '';
    position: absolute;
    height: 50%;
    width: 75px;
    background: inherit;
  }

  &__label {
    background: $off-black;
    transform: skew(30deg);
    font-weight: bold;
  }

  &__groups {
    height: min-content;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: gap(2);
    transform: skew(30deg);

    &--3,
    &--4 {
      width: 60%;
    }
    &--5,
    &--6 {
      width: 80%;
    }
  }
  &__item {
    height: min-content;
  }
  &__icon {
    position: absolute;
    left: -30px;
    transform: skew(30deg);
    width: 60px;
    height: 60px;
    fill: #cddeda;
    stroke: $off-black;
    stroke-width: 14px;
  }

  &--half_damage_from {
    background: rgba($pokemon-fire, 60%);
    &::before {
      top: 0;
      left: -75px;
    }
    #{$self}__label {
      padding-left: 25px;
      left: -60px;
    }
    #{$self}__groups {
      margin-right: 20px;
    }
  }
  &--double_damage_from {
    background: rgba(white, 60%);
    border-left: 8px solid $off-black;
    &::before {
      bottom: 0;
      right: -75px;
    }
    #{$self}__label {
      right: -60px;
      padding-right: 25px;
    }
    #{$self}__groups {
      margin-left: 20px;
    }
  }
}
</style>
