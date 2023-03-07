<template>
  <button class="volume-btn" :class="{ 'volume-btn--plus': isPlus }" />
</template>

<script setup lang="ts">
withDefaults(defineProps<{ isPlus?: boolean }>(), {
  isPlus: false
});
</script>

<style scoped lang="scss">
.volume-btn {
  position: relative;
  width: 22px;
  height: 6px;
  background-color: $dark-grey;
  box-shadow: 0px -1px 0px 0px black inset, 0px 1px 0px 0px $medium-grey inset, 1px 0px 0px 0px $darker-grey inset,
    0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: translateY(1px);
    box-shadow: 0px 0px 0px 0px black inset, 0px 0px 0px 0px $medium-grey inset, 0px 0px 0px 0px $darker-grey inset,
      0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black;
  }

  &--plus {
    &:before,
    &:after {
      content: '';
      position: absolute;
      background-color: $dark-grey;
    }

    &:before {
      @include position-center;
      width: 6px;
      height: 22px;
      box-shadow: 0px -1px 0px 0px black inset, 1px 0px 0px 0px $darker-grey inset, 0px 1px 0px 0px $medium-grey inset,
        0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black;
    }

    &:after {
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      width: 10px;
      height: 5px;
      border-radius: 4px;
    }

    &:active:before {
      box-shadow: 0px 0px 0px 0px black inset, 0px 0px 0px 0px $darker-grey inset, 0px 0px 0px 0px $medium-grey inset,
        0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black, 0px 0px 2px 0px $off-black;
    }
  }
}
</style>
