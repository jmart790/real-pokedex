<template>
  <div class="radar" :class="{ 'radar--loading': isLoading }">
    <div class="radar__inner" />
  </div>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';

const pokeStore = usePokeStore();

const { isLoading } = storeToRefs(pokeStore);
</script>

<style scoped lang="scss">
.radar {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 0 2px 1px $light-grey inset;
  background-color: rgb(240, 244, 247);
  transform: scale(0.4) translate(-50%, -50%);
  &--loading::after {
    animation: flicker 1.5s linear infinite;
  }

  &::after {
    content: '';
    position: absolute;
    z-index: 0;
    left: 5%;
    top: 5%;
    width: 90%;
    height: 90%;
    background: $blue;
    border-radius: inherit;
    opacity: 0.7;
  }

  &__inner {
    position: relative;
    z-index: 2;
    width: 90%;
    height: 90%;
    border-radius: 128px;
    background: transparent;
    box-shadow: inset 1px 2px 5px 5px #e4e9ec, inset 1px 2px 10px 2px #363635,
      inset 0px -40px 29px #b3b3b3, -5px 17px 48px -28px #b3b3b3,
      -40px -13px 45px -58px #fff, -10px 4px 10px -32px #b3b3b3,
      15px 40px 20px -36px #0c0c0c, -10px 38px 20px -36px #0c0c0c;

    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 37px;
      height: 20%;
      width: 40%;
      border: 20px solid transparent;
      border-top-color: rgba(#fff, 0.7);
      border-radius: 50% 50% 0 0;
      background: transparent;
    }
    &::before {
      left: 4px;
      transform: rotate(305deg);
    }
    &::after {
      right: 4px;
      transform: rotate(59deg);
    }
  }

  @keyframes flicker {
    0% {
      opacity: 0.7;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    75% {
      opacity: 0;
    }
    100% {
      opacity: 0.7;
    }
  }
}
</style>
