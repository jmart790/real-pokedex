<template>
  <section class="key-map" :class="{ 'key-map--open': isOpen }">
    <div class="key-map__header">
      <h4 class="key-map__title">Keyboard Controls</h4>
      <button class="key-map__toggle" @click="isOpen = !isOpen">
        {{ isOpen ? 'close' : 'open' }}
      </button>
    </div>
    <div class="key-map__content">
      <div
        class="key-map__legend"
        v-for="(item, index) in buttons"
        :key="`key-map--${index}`"
      >
        <p class="key-map__key">{{ item.correspondingKey }}</p>
        <p>=</p>
        <component
          class="key-map__button"
          :is="item.component"
          v-bind="item.props"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const isOpen = ref(false);

const buttons = [
  {
    component: 'DpadButton',
    props: { variant: 'up' },
    correspondingKey: 'up'
  },
  {
    component: 'DpadButton',
    props: { variant: 'down' },
    correspondingKey: 'down'
  },
  {
    component: 'DpadButton',
    props: { variant: 'left' },
    correspondingKey: 'left'
  },
  {
    component: 'DpadButton',
    props: { variant: 'right' },
    correspondingKey: 'right'
  },
  {
    component: 'DpadButton',
    props: { variant: 'y' },
    correspondingKey: 'a'
  },
  {
    component: 'DpadButton',
    props: { variant: 'x' },
    correspondingKey: 's'
  },
  {
    component: 'DpadButton',
    props: { variant: 'b' },
    correspondingKey: 'z'
  },
  {
    component: 'DpadButton',
    props: { variant: 'a' },
    correspondingKey: 'x'
  },
  {
    component: 'BlueButton',
    props: { copy: 1 },
    correspondingKey: 1
  },
  {
    component: 'BlueButton',
    props: { copy: 2 },
    correspondingKey: 2
  },
  {
    component: 'BlueButton',
    props: { copy: 3 },
    correspondingKey: 3
  },
  {
    component: 'BlueButton',
    props: { copy: 4 },
    correspondingKey: 4
  },
  {
    component: 'BlueButton',
    props: { copy: 5 },
    correspondingKey: 5
  },
  {
    component: 'BlueButton',
    props: { copy: 6 },
    correspondingKey: 6
  },
  {
    component: 'BlueButton',
    props: { copy: 7 },
    correspondingKey: 7
  },
  {
    component: 'BlueButton',
    props: { copy: 8 },
    correspondingKey: 8
  },
  {
    component: 'PowerButton',
    props: null,
    correspondingKey: 'p'
  }
];
</script>

<style scoped lang="scss">
.key-map {
  border: 6px solid $off-black;
  padding: gap(1) gap(2) gap(4) gap(2);
  background: rgba($primary, 0.8);
  border-radius: 2px;
  overflow: hidden;
  transition: all ease-in-out 300ms;

  height: 45px;

  &--open {
    width: 100%;
    height: 100%;
  }
  &__header {
    margin-bottom: gap(4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: gap(4);
  }
  &__title {
    font-weight: 500;
    font-family: $secondary-font;
  }
  &__toggle {
    width: 40px;
    text-align: center;
    background-color: white;
    padding: gap(1);
    border-radius: 5px;
    font-size: rem(12);
    cursor: pointer;
    box-shadow: 2px 2px 8px rgba(black, 0.3);
    &:hover {
      background-color: darken(white, 5%);
    }
    &:active {
      background-color: darken(white, 10%);
    }
  }
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(4);
  }

  &__legend {
    display: flex;
    align-items: center;
    gap: gap(2);
    background-color: rgba($pokemon-ground, 0.4);
    padding: gap(2);
    border-radius: 2px;
  }

  &__button {
    width: 25px;
    height: 25px;
    font-size: rem(16);
  }

  &__key {
    @include flex-center;
    width: 40px;
    height: 35px;
    padding: gap(1);
    background: $off-white;
    font-size: rem(12);
    color: $medium-grey;
    border-radius: 0.3em;
    text-transform: capitalize;
    box-shadow: 0px 2px 1px 0px $lightest-grey inset,
      0px -2px 1px 0px black inset, 0px 0px 2px 0px black, 0px 0px 2px 0px black,
      0px 0px 2px 0px black;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
    &:active {
      transform: translateY(1px);
      box-shadow: 0px 1px 1px 0px $lightest-grey inset,
        0px -1px 1px 0px black inset, 0px 0px 2px 0px black,
        0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black;
    }
  }
}
</style>
