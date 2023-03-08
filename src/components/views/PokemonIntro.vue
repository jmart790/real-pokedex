<template>
  <div class="pokemon-icon">
    <div class="pokemon-icon__top" />
    <div class="pokemon-icon__bottom" />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.pokemon-icon {
  position: relative;
  width: 120px;
  height: 120px;
  opacity: 0;
  animation: powerup 5s linear;
  animation-delay: 2s;

  &:before {
    content: '';
    position: absolute;
    z-index: 5;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 8px solid $console-grey;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: 4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 150%;
    height: 10px;
    background-color: $console-grey;
  }

  &__top {
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 4;
    width: 100%;
    height: 50%;
    border-radius: 150px 150px 0 0;
    background-color: $pokemon-fire;
    box-sizing: border-box;
    box-shadow: 0px -15px 25px 5px rgba($pokemon-fire, 0.3);
  }

  &__bottom {
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 0 0 150px 150px;
    background-color: white;
    overflow: hidden;
    width: 100%;
    height: 50%;
    box-shadow: 0px 15px 25px 5px rgba(white, 0.3);
  }

  @keyframes powerup {
    0% {
      opacity: 0;
    }

    10% {
      opacity: 1;
    }

    45% {
      opacity: 1;
    }

    70% {
      opacity: 0;
    }
  }
}
</style>
