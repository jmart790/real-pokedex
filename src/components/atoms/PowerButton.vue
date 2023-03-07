<template>
  <button class="power-btn" :class="{ 'power-btn--on': isPokedexOn }" v-bind="$attrs">
    <div class="power-btn__icon" />
  </button>
</template>

<script setup lang="ts">
defineProps<{ isPokedexOn?: boolean }>();
</script>

<style scoped lang="scss">
.power-btn {
  position: relative;
  width: 34px;
  height: 34px;
  background-color: $light-grey;
  border-radius: 50%;
  box-shadow: 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black,
    0px 0px 2px 0px $off-black;

  &:hover {
    cursor: pointer;
  }

  &:active,
  &--on {
    background-color: rgba($off-white, 0.5);
    box-shadow: 0px 0px 2px 2px rgba($off-white, 0.25), 0px 0px 2px 2px rgba($off-white, 0.25),
      0px 0px 2px 2px rgba($off-white, 0.25), 0px 0px 2px 2px rgba($off-white, 0.25),
      0px 0px 1px 1px rgba($off-white, 0.4) inset, 0px 0px 1px 1px rgba($off-white, 0.4) inset,
      0px 0px 1px 1px rgba($off-white, 0.4) inset, 0px 0px 1px 1px rgba($off-white, 0.4) inset;
  }

  &:before {
    content: '';
    position: absolute;
    @include position-center;
    width: 80%;
    height: 80%;
    background-color: rgb(65, 65, 65);
    border-radius: 50%;
    box-shadow: 0px 0px 1px 0px $off-black inset, 0px 0px 1px 0px $off-black inset, 0px 0px 1px 0px $off-black inset,
      0px 0px 1px 0px $off-black inset;
  }

  &__icon {
    position: relative;
    margin-inline: auto;
    width: 55%;
    height: 55%;
    border-radius: 50%;
    border: 4px solid black;

    &:after {
      content: '';
      position: absolute;
      @include position-center;
      top: -5%;
      width: 30%;
      height: 70%;
      background: black;
      outline: 2px solid rgb(65, 65, 65);
      border-radius: 25px;
    }
  }
}
</style>
