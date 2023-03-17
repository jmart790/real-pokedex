<template>
  <section class="pokedex-left">
    <div class="pokedex-left__top">
      <Radar />
    </div>
    <div class="pokedex-left__top-small" />

    <section class="pokedex-left__body">
      <div class="pokedex-left__depth-seperation" />
      <div class="pokedex-left__depth-seperation" />
      <div class="pokedex-left__depth-seperation" />

      <section class="pokedex-left__main">
        <slot />
      </section>
    </section>
  </section>
</template>

<style scoped lang="scss">
.pokedex-left {
  position: relative;

  &__top {
    position: absolute;
    top: 0;
    z-index: 1;
    left: -5px;
    height: 115px;
    width: calc(50% + 10px);
    background-color: $red;
    border-bottom-right-radius: 0;
    border-top-left-radius: $outside-corner;
    border-bottom-left-radius: 2px;
    box-shadow: 10px 10px 10px 0px $light-red inset;
  }

  &__top-small {
    position: absolute;
    top: 0;
    right: -5px;
    z-index: 2;
    height: 65px;
    width: calc(50% + 10px);
    background-color: $red;
    border-top-right-radius: $outside-corner;
    border-bottom-right-radius: 2px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    box-shadow: -5px 10px 10px 0px $light-red inset;
  }

  &__body {
    width: 100%;
    height: 100%;
    background-color: $red;
    border-top-right-radius: $outside-corner;
    border-bottom-right-radius: 2px;
    border-top-left-radius: $outside-corner;
    border-bottom-left-radius: $outside-corner;
    box-shadow: 2px -10px 10px 0px $dark-red inset, 10px -2px 10px 0px $dark-red inset,
      10px 10px 10px 0px $light-red inset;
    filter: drop-shadow(2px 4px 12px rgba(black, 0.7));
  }

  &__depth-seperation {
    position: absolute;
    z-index: 5;
    height: 25px;
    background-image: linear-gradient(to top, transparent 15%, $dark-red);
    filter: blur(1px);

    &:nth-child(1) {
      top: 115px;
      left: 0;
      width: 50%;
    }

    &:nth-child(2) {
      top: 91px;
      left: calc(50% - 6px);
      width: 113px;
      transform: rotate(-26deg) skewX(-25deg);
    }

    &:nth-child(3) {
      z-index: 10;
      top: 65px;
      left: 70%;
      width: 30%;
    }
  }

  &__main {
    padding: 25px;
    position: absolute;
    left: 0;
    top: 110px;
    bottom: 0;
    width: 100%;
  }
}
</style>
