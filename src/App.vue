<template>
  <div class="pokedex-container" @keyup="handleKeyUp">
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
const keysToListenTo = ['down', 'up', 'left', 'right', 'x', 'z', 'a', 's', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'p'];
const keysToBtnMap = { a: 'y', s: 'x', z: 'b', x: 'a', p: 'power', 0: '10' };
const isShiftedRight = ref(false);
const isHelperOpen = ref(false);

function handleKeyUp(event: KeyboardEvent) {
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
  // background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068161816674451528/BonzaiYosh_beautiful_wide_shot_landscape_with_a_lot_of_wild_pok_a82d51e9-7b84-44b2-8da1-46af65ca794d.png');
  background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1086368422650187909/BonzaiYosh_landscape_of_the_beatiful_world_of_pokemon_with_wild_8d5421e6-faef-45c9-b828-0a5b87aed1dd.png');
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
    bottom: 2.1%;
    left: 0;
    width: 100%;
    @media (min-width: 400px) {
      bottom: 2.5%;
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
