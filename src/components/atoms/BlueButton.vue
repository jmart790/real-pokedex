<template>
  <button class="blue-btn">
    {{ copy }}
  </button>
</template>

<script setup lang="ts">
defineProps<{ copy: number }>();
</script>

<style scoped lang="scss">
.blue-btn {
  position: relative;
  display: grid;
  place-items: center;
  border-radius: 5px;
  background-image: linear-gradient(to bottom, $blue, $dark-blue);
  box-shadow: 0px 2px 1px 0px $light-blue inset, 0px -2px 1px 0px black inset,
    0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black,
    0px 0px 2px 0px black;
  font-weight: bold;
  font-size: 35px;
  font-family: Arial, Helvetica, sans-serif;
  color: $dark-blue;
  text-shadow: 2px 2px 3px rgba($blue, 0.5);

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0px 1px 1px 0px $light-blue inset, 0px -1px 1px 0px black inset,
      0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black,
      0px 0px 2px 0px black;
  }
}
</style>
