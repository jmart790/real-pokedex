<template>
  <button class="mobile-btn" v-bind="$attrs">
    <p class="mobile-btn__pokeball">
      <span class="mobile-btn__pokeball-center" />
    </p>
    <img src="https://svgshare.com/i/aat.svg" alt="pikachu" class="pikachu" />
  </button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.mobile-btn {
  position: relative;

  &__pokeball {
    position: relative;
    z-index: 1;
    height: 75px;
    width: 75px;
    display: grid;
    place-items: center;
    background-color: $red;
    color: $off-white;
    border-radius: $rounded-circle;
    border: 4px solid $off-black;
    box-shadow: 2px 4px 8px rgba(black, 0.2);
    &::before {
      position: absolute;
      z-index: -1;
      content: '';
      bottom: 0;
      height: 50%;
      width: 100%;
      border-radius: 0 0 150px 150px;
      background-color: $off-white;
    }
    &::after {
      position: absolute;
      z-index: -1;
      content: '';
      @include position-center;
      width: 105%;
      height: 5px;
      background-color: $off-black;
    }
  }
  &__pokeball-center {
    content: '';
    height: 25px;
    width: 25px;
    border-radius: $rounded-circle;
    background: $off-white;
    border: 4px solid $off-black;
  }
  .pikachu {
    position: absolute;
    top: 0;
    z-index: -2;
    width: 75px;
    transition: all ease-in-out 300ms;
    opacity: 0.1;
  }
  &:active .pikachu {
    transform: translateY(-60px);
    opacity: 1;
  }
}
</style>
