<template>
  <div class="pokedex-container">
    <div class="pokedex-container__keyboard-map-wrapper">
      <KeyboardMap />
    </div>
    <div class="pokedex-container__btn-map-wrapper">
      <ButtonMap />
    </div>
    <ThePokedex
      class="pokedex-container__pokedex"
      :class="{ 'pokedex-container__pokedex--shift-right': isShiftedRight }"
      @open="handleOpenHelper"
    />
    <div class="pokedex-container__mobile-btn-wrapper">
      <MobileViewButton
        class="pokedex-container__mobile-btn"
        @click="isShiftedRight = !isShiftedRight"
        :is-shifted-right="isShiftedRight"
      />
    </div>
    <p class="pokedex-container__disclaimer">
      Fan-made project, not affiliated with or endorsed by Nintendo, Game Freak, Creatures Inc. or The Pokémon Company.
      Pokémon and all related names and images are trademarks of their respective owners. Data from PokéAPI.
    </p>
    <div v-if="isHelperOpen" class="pokedex-container__helper-wrapper">
      <PikachuHelper class="pokedex-container__helper" @close="handleCloseHelper" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import useControls from '@/composables/useControls';
const { handleMainControl } = useControls();
// eslint-disable-next-line prettier/prettier
const keysToListenTo = ['down', 'up', 'left', 'right', 'x', 'z', 'a', 's', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'p', '-', '=', '+', '/', 'enter', 'escape'];
// '=' and '+' share a key, so either works for volume up (no Shift needed)
const keysToBtnMap = {
  a: 'y',
  s: 'x',
  z: 'b',
  x: 'a',
  p: 'power',
  0: 'search',
  '/': 'search',
  enter: 'a',
  escape: 'b',
  '-': 'volume-down',
  '=': 'volume-up',
  '+': 'volume-up'
};
const isShiftedRight = ref(false);
const isHelperOpen = ref(false);

function handleKeyUp(event: KeyboardEvent) {
  // Typing in a text field (search): letters/numbers stay in the field; only navigation keys reach the Pokedex.
  const isTyping = (event.target as HTMLElement)?.matches?.('input, textarea');
  const navigationKeys = ['Enter', 'Escape', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
  if (isTyping && !navigationKeys.includes(event.key)) return;
  event.preventDefault();
  const command = event.key.toLowerCase().replace('arrow', '');
  if (keysToListenTo.includes(command)) {
    handleMainControl(keysToBtnMap[command] || command);
  }
}

function handleCloseHelper() {
  isHelperOpen.value = false;
}

function handleOpenHelper() {
  isHelperOpen.value = true;
}

onMounted(() => {
  window.addEventListener('keyup', handleKeyUp);
});

onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeyUp);
});
</script>

<style scoped lang="scss">
.pokedex-container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  background-color: $lightest-blue;
  background-image: url('@/assets/images/bg-main.webp');
  background-position: left;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: $main-font;
  font-size: $font-size-3;
  overflow: hidden;

  &__keyboard-map-wrapper {
    display: none;
    @media (min-width: 666px) {
      display: block;
    }
    @media screen and (max-height: 500px) and (orientation: landscape) {
      display: none;
    }
    position: fixed;
    top: 16px;
    left: 16px;
    width: 256px;
    max-height: 95vh;
    z-index: 100;
  }

  &__btn-map-wrapper {
    right: 50%;
    transform: translateX(50%);
    position: fixed;
    top: rem(16);
    width: 350px;
    max-height: 95vh;
    z-index: 100;
    @media (min-width: 666px) {
      transform: unset;
      right: rem(16);
    }
  }

  &__pokedex {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-32.5%, -50%) scale(0.7);
    transition: transform ease-in-out 200ms;
    &--shift-right {
      transform: translate(-67.5%, -50%) scale(0.7);
    }
    @media (min-width: 666px) {
      transform: translate(-50%, -50%) scale(0.65);
    }
    @media (min-width: 777px) {
      transform: translate(-50%, -50%) scale(0.75);
    }
    @media (min-width: 888px) {
      transform: translate(-50%, -50%) scale(0.85);
    }
    @media screen and (max-height: 500px) and (orientation: landscape) {
      transform: translate(-50%, -50%) scale(0.55);
    }
  }

  &__mobile-btn-wrapper {
    position: fixed;
    bottom: calc(2.1% + 40px); // + room for the disclaimer below it
    left: 0;
    width: 100%;
    @media (min-width: 400px) {
      bottom: calc(2.5% + 40px);
    }
    @media (min-width: 666px) {
      display: none;
    }
  }
  &__mobile-btn {
    display: block;
    margin-inline: auto;
    transform: scale(0.8);
    @media (min-width: 400px) {
      transform: unset;
    }
  }

  &__disclaimer {
    position: fixed;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
    max-width: calc(100% - 32px);
    font-size: 10px;
    line-height: 1.3;
    text-align: center;
    color: rgba(white, 0.85);
    text-shadow: 0 1px 2px rgba(black, 0.8);
    pointer-events: none;
    @media (max-width: 665px) {
      font-size: 9px;
    }
  }

  &__helper-wrapper {
    position: fixed;
    z-index: 100;
    inset: 0 0 0 0;
    height: 100%;
    width: 100%;
    padding: gap(2);
    background-color: rgba(black, 0.5);
    @include flex-center;
  }

  &__helper {
    margin: auto;
  }
}
</style>
