<template>
  <FrostCard class="key-map" :class="{ 'key-map--open': isOpen }">
    <div class="key-map__header" @click="isOpen = !isOpen">
      <h4 class="key-map__title">Keyboard Controls</h4>
      <button class="key-map__toggle">
        {{ isOpen ? '−' : '+' }}
      </button>
    </div>
    <div class="key-map__content">
      <div class="key-map__legend" v-for="(item, index) in buttons" :key="`key-map--${index}`">
        <p class="key-map__key">{{ item.correspondingKey }}</p>
        <p>=</p>
        <component class="key-map__button" :is="item.component" v-bind="item.props" />
      </div>
    </div>
  </FrostCard>
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
// overwrite frostcard
:deep .frost-card__ui::before {
  background: linear-gradient(40deg, rgba($primary, 0.6) 30%, rgba($primary, 0.2) 100%);
  filter: none;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.key-map {
  height: 40px;
  padding: gap(2) gap(3) gap(4) gap(3);
  overflow: hidden;
  color: rgba(black, 0.6);
  border-radius: $rounded-1;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.4), inset 2px 4px 8px rgba(0, 0, 0, 0.4);
  transition: height ease-in-out 300ms;

  &--open {
    width: 100%;
    height: 671px;
  }
  &--open &__content {
    opacity: 1;
    filter: blur(0);
  }
  &__header {
    margin-bottom: gap(4);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: gap(4);
    cursor: pointer;
  }
  &__title {
    font-weight: 600;
    font-family: $secondary-font;
  }
  &__toggle {
    height: 20px;
    width: 20px;
    @include flex-center;
    line-height: 1;
    border-radius: $rounded-circle;
    font-size: $font-size-5;
    cursor: pointer;
    background: linear-gradient(315deg, #ffffd4, #d6d6b2);
    box-shadow: -20px -20px 60px #cacaa8, 20px 20px 60px #ffffe4;
  }
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(4);
    opacity: 0;
    filter: blur(5px);
    transition: opacity ease-in-out 300ms, filter ease-in-out 300ms;
  }

  &__legend {
    display: flex;
    align-items: center;
    gap: gap(2);
    padding: gap(2);
    background-color: rgba($pokemon-ground, 0.4);
    background: linear-gradient(40deg, rgba($pokemon-ground, 0.4) 30%, rgba($pokemon-ground, 0.1) 100%);
    border-radius: $rounded-1;
  }

  &__button {
    width: 25px;
    height: 25px;
    font-size: $font-size-3;
  }

  &__key {
    @include flex-center;
    width: 40px;
    height: 35px;
    padding: gap(1);
    background: $off-white;
    font-size: r$font-size-1;
    color: $medium-grey;
    border-radius: 0.3em;
    text-transform: capitalize;
    box-shadow: 0px 2px 1px 0px $lightest-grey inset, 0px -2px 1px 0px black inset, 0px 0px 2px 0px black,
      0px 0px 2px 0px black, 0px 0px 2px 0px black;
    user-select: none;
    &:hover {
      cursor: pointer;
    }
    &:active {
      transform: translateY(1px);
      box-shadow: 0px 1px 1px 0px $lightest-grey inset, 0px -1px 1px 0px black inset, 0px 0px 2px 0px black,
        0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black;
    }
  }
}
</style>
