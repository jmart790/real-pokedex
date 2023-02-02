<template>
  <FrostCard class="btn-map" :class="{ 'btn-map--open': isOpen }">
    <div class="btn-map__header" @click="isOpen = !isOpen">
      <h4 class="btn-map__title">Buttons Map</h4>
      <button class="btn-map__toggle">
        {{ isOpen ? '−' : '+' }}
      </button>
    </div>
    <div class="btn-map__content">
      <div
        class="btn-map__legend"
        v-for="(item, index) in buttons"
        :key="`btn-map--${index}`"
      >
        <component
          class="btn-map__button"
          :is="item.component"
          v-bind="item.props"
        />
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
const { currentView } = storeToRefs(controlsStore);

const isOpen = ref(false);

const buttons = computed(() => [
  {
    component: 'DpadButton',
    props: { variant: 'up' },
    correspondingAction: currentView.value === 'POKEMON' ? 'next 2 pokemon' : 'move up'
  },
  {
    component: 'DpadButton',
    props: { variant: 'down' },
    correspondingAction: currentView.value === 'POKEMON' ? 'previous 2 pokemon' : 'move down'
  },
  {
    component: 'DpadButton',
    props: { variant: 'left' },
    correspondingAction: currentView.value === 'POKEMON' ? 'previous pokemon' : 'move left'
  },
  {
    component: 'DpadButton',
    props: { variant: 'right' },
    correspondingAction: currentView.value === 'POKEMON' ? 'next pokemon' : 'move right'
  },
  {
    component: 'DpadButton',
    props: { variant: 'y' },
    correspondingAction: currentView.value === 'POKEMON' ? 'change sprite' : 'N/A'
  },
  {
    component: 'DpadButton',
    props: { variant: 'x' },
    correspondingAction: currentView.value === 'POKEMON' ? 'flip pokemon' : 'N/A'
  },
  {
    component: 'DpadButton',
    props: { variant: 'b' },
    correspondingAction: currentView.value === 'POKEMON' ? 'N/A' : 'back to list'
  },
  {
    component: 'DpadButton',
    props: { variant: 'a' },
    correspondingAction: currentView.value === 'POKEMON' ? 'N/A' : 'select pokemon'
  },
  {
    component: 'BlueButton',
    props: { copy: 1 },
    correspondingAction: currentView.value === 'POKEMON' ? 'details' : 'generation 1'
  },
  {
    component: 'BlueButton',
    props: { copy: 2 },
    correspondingAction: currentView.value === 'POKEMON' ? 'stats' : 'generation 2'
  },
  {
    component: 'BlueButton',
    props: { copy: 3 },
    correspondingAction: currentView.value === 'POKEMON' ? 'damage from' : 'generation 3'
  },
  {
    component: 'BlueButton',
    props: { copy: 4 },
    correspondingAction: currentView.value === 'POKEMON' ? 'damage to' : 'generation 4'
  },
  {
    component: 'BlueButton',
    props: { copy: 5 },
    correspondingAction: currentView.value === 'POKEMON' ? 'evolutions' : 'generation 5'
  },
  {
    component: 'BlueButton',
    props: { copy: 6 },
    correspondingAction: currentView.value === 'POKEMON' ? 'learned moves' : 'generation 6'
  },
  {
    component: 'BlueButton',
    props: { copy: 7 },
    correspondingAction: currentView.value === 'POKEMON' ? 'machine moves' : 'generation 7'
  },
  {
    component: 'BlueButton',
    props: { copy: 8 },
    correspondingAction: currentView.value === 'POKEMON' ? 'sprites' : 'generation 8'
  },
  {
    component: 'PowerButton',
    props: null,
    correspondingAction: 'toggle power'
  }
]);
</script>

<style scoped lang="scss">
// overwrite frostcard
:deep .frost-card__ui::before {
  background: linear-gradient(
    40deg,
    rgba($secondary, 0.6) 30%,
    rgba($secondary, 0.2) 100%
  );
  filter: none;
  backdrop-filter: blur(8px);
}
.btn-map {
  height: 40px;
  padding: gap(2) gap(3) gap(4) gap(3);
  overflow: hidden;
  border-radius: $rounded-1;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.4),
    inset 2px 4px 8px rgba(0, 0, 0, 0.4);
  transition: height ease-in-out 300ms;
  color: rgba(white, 0.8);

  &--open {
    height: 700px;
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
    font-size: rem(24);
    cursor: pointer;
    background: linear-gradient(315deg, #2c7292, #3488ad);
    box-shadow:  -20px -20px 60px #2a6c8a, 20px 20px 60px #3892ba;
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
    background-color: rgba($pokemon-ice, 0.4);
    background: linear-gradient(
      40deg,
      rgba($pokemon-ice, 0.4) 30%,
      rgba($pokemon-ice, 0.1) 100%
    );
    border-radius: $rounded-1;
    text-transform: capitalize;
  }

  &__button {
    flex-shrink: 0;
    width: 25px;
    height: 25px;
    font-size: rem(16);
  }
}
</style>
