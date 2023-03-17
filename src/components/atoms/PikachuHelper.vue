<template>
  <div class="p-helper" v-on-click-outside="handleClose">
    <div class="p-helper__copy">
      <button class="p-helper__close" @click.stop="handleClose">
        <span>+</span>
      </button>
      <p>Pika pika. Hi there, I'm Pikachu!</p>
      <br />
      <p>
        I'm here to help you navigate this Pokédex. Just so you know, you can only use these buttons on the pokedex or
        your keyboard to move around.
      </p>
      <br />
      <p>
        So, let's get started! Use the arrow buttons to navigate and press (A) to select. And if you need need any help,
        just give me a shout - I'm always here to lend a paw! Pika pika!
      </p>
    </div>
    <img src="@/assets/images/pikachu.png" alt="pikachu" class="p-helper__pikachu" />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { vOnClickOutside } from '@vueuse/components';

const emit = defineEmits(['close']);

function handleClose() {
  emit('close');
}
</script>

<style scoped lang="scss">
.p-helper {
  position: relative;
  display: block;
  @include flex-center;
  z-index: 10;
  max-width: 400px;

  &__copy {
    padding: gap(4);
    background-color: $off-white;
    border: 4px solid $off-black;
    color: $off-black;
    border-radius: $rounded-2;
    background-color: $pokemon-electric-light;
    p:first-of-type {
      font-weight: bold;
    }
  }

  &__close {
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 10px;
    @include flex-center;
    line-height: 2;
    height: 30px;
    width: 30px;
    border-radius: $rounded-circle;
    background-color: $secondary;
    color: $off-white;
    box-shadow: 2px 2px 8px rgba(black, 0.2);
    cursor: pointer;
    &:hover {
      background-color: darken($secondary, 10%);
    }
    span {
      transform: rotate(45deg);
      font-size: rem(25);
    }
  }

  &__pikachu {
    position: absolute;
    z-index: -1;
    top: -65px;
    width: 75px;
  }
}
</style>
