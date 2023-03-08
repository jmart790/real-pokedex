<template>
  <button class="dpad-btn" :class="{ 'dpad-btn--active': isActive }">
    <p :class="`dpad-btn__${variant}`" />
  </button>
</template>

<script setup lang="ts">
type Variant = 'a' | 'b' | 'x' | 'y' | 'up' | 'down' | 'left' | 'right';
defineProps<{ variant: Variant; isActive?: boolean }>();
</script>

<style scoped lang="scss">
.dpad-btn {
  position: relative;
  border-radius: 50%;
  background-image: linear-gradient(to bottom, $dark-grey, #333333);
  box-shadow: 0px 2px 1px 0px $light-grey inset, 0px -2px 1px 0px black inset, 0px 0px 2px 0px black,
    0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
  &:active,
  &--active {
    transform: translateY(1px);
    box-shadow: 0px 1px 1px 0px $light-grey inset, 0px -1px 1px 0px black inset, 0px 0px 2px 0px black,
      0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black;
  }

  &:before {
    /* evens out the look of the button shading */
    content: '';
    position: absolute;
    border-radius: 50%;
    box-shadow: 2px 0px 1px 0px black inset, -2px 0px 1px 0px $light-grey inset;
    opacity: 0.3;
  }

  p {
    color: $off-white;
    font-family: Arial, Helvetica, sans-serif;
  }

  &__up,
  &__down,
  &__left,
  &__right {
    border: 5px solid transparent;
  }

  &__up {
    border-bottom: 9px solid $arrow-grey;
    top: -4px;
  }

  &__down {
    border-top: 9px solid $arrow-grey;
    top: 4px;
  }

  &__left {
    border-right: 9px solid $arrow-grey;
    left: -4px;
  }

  &__right {
    border-left: 9px solid $arrow-grey;
    left: 4px;
  }

  &__a::before {
    content: 'A';
  }

  &__b::before {
    content: 'B';
  }

  &__x::before {
    content: 'X';
  }

  &__y::before {
    content: 'Y';
  }
}
</style>
