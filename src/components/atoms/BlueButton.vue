<template>
  <button class="blue-btn" :class="{ 'blue-btn--active': isActive }">
    {{ copy }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ copy: number; isActive?: boolean }>();
</script>

<style scoped lang="scss">
.blue-btn {
  position: relative;
  display: grid;
  place-items: center;
  border-radius: $rounded;
  background-image: linear-gradient(to bottom, $blue, $dark-blue);
  box-shadow: 0px 2px 1px 0px $light-blue inset, 0px -2px 1px 0px black inset, 0px 0px 2px 0px black,
    0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black;
  font-weight: bold;
  font-size: $font-size-7;
  font-family: $secondary-font;
  color: rgba($darker-blue, 0.7);
  text-shadow: 2px 2px 3px rgba($blue, 9);

  &:hover {
    cursor: pointer;
  }

  &:active,
  &--active {
    transform: translateY(1px);
    box-shadow: 0px 1px 1px 0px $light-blue inset, 0px -1px 1px 0px black inset, 0px 0px 2px 0px black,
      0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black;
  }
}
</style>
