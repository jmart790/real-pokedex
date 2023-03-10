<template>
  <FrostCard class="btn-map" :class="{ 'btn-map--open': isOpen }">
    <div class="btn-map__header" @click="isOpen = !isOpen">
      <h4 class="btn-map__title">Buttons Map</h4>
      <button class="btn-map__toggle">
        {{ isOpen ? '−' : '+' }}
      </button>
    </div>
    <div class="btn-map__content">
      <div class="btn-map__legend" v-for="(item, index) in buttons" :key="`btn-map--${index}`">
        <component class="btn-map__button" :is="item.component" v-bind="item.props" />
        <p>=</p>
        <p>{{ item.correspondingAction }}</p>
      </div>
    </div>
  </FrostCard>
</template>

<script setup lang="ts">
import { useControlsStore } from '@/store/controls';
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

const controlsStore = useControlsStore();
const { mainView } = storeToRefs(controlsStore);

const isOpen = ref(false);

const buttons = computed(() => [
  {
    component: 'DpadButton',
    props: { variant: 'up' },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'next 2' : 'move up'
  },
  {
    component: 'DpadButton',
    props: { variant: 'down' },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'prev 2' : 'move down'
  },
  {
    component: 'DpadButton',
    props: { variant: 'left' },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'prev' : 'move left'
  },
  {
    component: 'DpadButton',
    props: { variant: 'right' },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'next' : 'move right'
  },
  {
    component: 'DpadButton',
    props: { variant: 'y' },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'toggle sprite' : 'N/A'
  },
  {
    component: 'DpadButton',
    props: { variant: 'x' },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'toggle orientation' : 'N/A'
  },
  {
    component: 'DpadButton',
    props: { variant: 'b' },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'back' : 'N/A'
  },
  {
    component: 'DpadButton',
    props: { variant: 'a' },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'toggle shiny' : 'select'
  },
  {
    component: 'BlueButton',
    props: { copy: 1 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'details' : 'gen 1'
  },
  {
    component: 'BlueButton',
    props: { copy: 2 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'stats' : 'gen 2'
  },
  {
    component: 'BlueButton',
    props: { copy: 3 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'damage from' : 'gen 3'
  },
  {
    component: 'BlueButton',
    props: { copy: 4 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'damage to' : 'gen 4'
  },
  {
    component: 'BlueButton',
    props: { copy: 5 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'evolutions' : 'gen 5'
  },
  {
    component: 'BlueButton',
    props: { copy: 6 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'learned moves' : 'gen 6'
  },
  {
    component: 'BlueButton',
    props: { copy: 7 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'machine moves' : 'gen 7'
  },
  {
    component: 'BlueButton',
    props: { copy: 8 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'sprites' : 'gen 8'
  },
  {
    component: 'BlueButton',
    props: { copy: 9 },
    correspondingAction: ['POKEMON', 'YOSH'].includes(mainView.value) ? 'N/A' : 'gen 9'
  },
  {
    component: 'VolumeButton',
    props: { isPlus: true },
    correspondingAction: 'N/A'
  },
  {
    component: 'VolumeButton',
    props: { isPlus: false },
    correspondingAction: 'N/A'
  },
  {
    component: 'PowerButton',
    props: null,
    correspondingAction: 'power'
  }
]);
</script>

<style scoped lang="scss">
// overwrite frostcard
:deep(.frost-card__ui:before) {
  background: linear-gradient(40deg, rgba($secondary, 0.6) 30%, rgba($secondary, 0.2) 100%);
  filter: none;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.btn-map {
  height: 40px;
  padding: gap(2) gap(3) gap(4) gap(3);
  overflow: hidden;
  border-radius: $rounded-1;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.4), inset 2px 4px 8px rgba(0, 0, 0, 0.4);
  will-change: height;
  transition: height ease-in-out 300ms;
  color: rgba(white, 0.8);

  &--open {
    height: 630px;

    @media (min-width: 666px) {
      height: 730px;
    }
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
    background: linear-gradient(315deg, #2c7292, #3488ad);
    box-shadow: -20px -20px 60px #2a6c8a, 20px 20px 60px #3892ba;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(3);
    opacity: 0;
    filter: blur(5px);
    backdrop-filter: blur(5px);
    transition: opacity ease-in-out 300ms, filter ease-in-out 300ms;

    @media (min-width: 666px) {
      gap: gap(4);
    }
  }

  &__legend {
    display: flex;
    align-items: center;
    gap: gap(2);
    padding: gap(2);
    background-color: rgba($pokemon-ice, 0.4);
    background: linear-gradient(40deg, rgba($pokemon-ice, 0.4) 30%, rgba($pokemon-ice, 0.1) 100%);
    border-radius: $rounded-1;
    text-transform: capitalize;
    font-size: $font-size-1;

    @media (min-width: 666px) {
      font-size: unset;
    }
  }

  &__button {
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    font-size: $font-size-3;
  }

  :deep(.volume-btn) {
    width: 30px;
    height: 8px;
  }

  :deep(.volume-btn--plus:before) {
    height: 30px;
    width: 8px;
  }
}
</style>
