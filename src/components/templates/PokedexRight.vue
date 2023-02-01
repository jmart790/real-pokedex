<template>
  <section class="pokedex-right">
    <div class="pokedex-right__wrapper">
      <div class="pokedex-right__top">
        <div class="pokedex-right__top-fill"></div>
      </div>

      <section class="pokedex-right__body">
        <section class="pokedex-right__main">
          <slot />
        </section>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.pokedex-right {
  position: relative;
  width: 100%;
  height: 100%;
  
  
  &__wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 5;
    height: 82.8%;
    width: 100%;
  }

  &__top {
    position: absolute;
    top: -52px;
    left: 105px;
    z-index: 1;
    transform: skew(64deg);
    height: 100px;
    width: 140px;
    background-color: $red;
    border-top-right-radius: 2px;
    box-shadow: -45px 0px 12px -32px $light-red inset;
  }

  &__top-fill {
    position: absolute;
    top: 0;
    left: -105px;
    transform: skew(-64deg);
    height: inherit;
    width: 140px;
    border-top-left-radius: 2px;
    background-color: $red;
    box-shadow: 10px 2px 12px -9px $dark-red inset,
      0px 17px 10px -10px $light-red inset;

    &:after {
      content: "";
      position: absolute;
      top: 62px;
      left: 200px;
      height: 50%;
      width: 210px;
      background-image: linear-gradient(to top, $red 93%, transparent);
    }
  }

  &__body {
    width: 100%;
    height: 580px;
    background-color: $red;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 2px;
    border-top-right-radius: $outside-corner;
    border-bottom-right-radius: $outside-corner;
    box-shadow: 2px -12px 10px 0px $dark-red inset,
      -7px 5px 20px 0px $light-red inset;

    &:after {
      content: "";
      position: absolute;
      @include position-center;
      border-top-right-radius: $outside-corner;
      border-bottom-right-radius: $outside-corner;
      height: 100%;
      width: 100%;
      background-image: linear-gradient(to right, transparent 85%, $dark-red);
    }
  }
  &__main {
    position: absolute;
    z-index: 6;
    left: 0;
    top: 20px;
    bottom: 0;
    width: 100%;
    padding: 25px;
    box-shadow: 0px 20px 16px rgba(0, 0, 0, 0.4);
  }
}
</style>
