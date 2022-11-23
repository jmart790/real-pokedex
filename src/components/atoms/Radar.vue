<template>
  <div class="radar">
    <div class="radar__inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

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

  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    left: 5%;
    top: 5%;
    width: 90%;
    height: 90%;
    background: $blue;
    border-radius: inherit;
    opacity: 0.5;
  }

  &__inner {
    position: relative;
    z-index: 2;
    width: 90%;
    height: 90%;
    border-radius: 128px;
    background: transparen;
    box-shadow: inset 1px 2px 5px 5px #e4e9ec, inset 1px 2px 10px 2px #363635,
      inset 0px -40px 29px #b3b3b3, -5px 17px 48px -28px #b3b3b3,
      -40px -13px 45px -58px #fff, -10px 4px 10px -32px #b3b3b3,
      15px 40px 20px -36px #0c0c0c, -10px 38px 20px -36px #0c0c0c;

    &::before,
    &::after {
      content: "";
      position: absolute;
      top: 37px;
      height: 20%;
      width: 40%;
      border: 20px solid transparent;
      border-top-color: #fff;
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
}
</style>
