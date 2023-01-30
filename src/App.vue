<template>
  <div class="pokedex-container" @keyup="handleKeyUp">
    <div class="pokedex-container__keyboard-map-wrapper">
      <KeyboardMap class="pokedex-container__keyboard-map" />
    </div>
    <Pokedex
      class="pokedex-container__pokedex"
      :class="{ 'pokedex-container__pokedex--shift-right': isShiftedRight }"
    />
    <MobileViewButton
      class="pokedex-container__mobile-btn"
      @click="isShiftedRight = !isShiftedRight"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import useMainControls from '@/composables/useMainControls';
const { handleMainControl } = useMainControls();
// eslint-disable-next-line prettier/prettier
const keysToListenTo = ['down', 'up', 'left', 'right', 'x', 'z', 'a', 's', '1', '2', '3', '4', '5', '6', '7', '8', 'p'];
const keysToBtnMap = { a: 'y', s: 'x', z: 'b', x: 'a', p: 'power' };
const isShiftedRight = ref(false);

function handleKeyUp(event: KeyboardEvent) {
  event.preventDefault();
  const command = event.key.toLowerCase().replace('arrow', '');
  // console.log({ command });
  if (keysToListenTo.includes(command)) {
    handleMainControl(keysToBtnMap[command] || command);
  }
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
  // background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068160018207232040/BonzaiYosh_beautiful_wide_shot_landscape_with_lots_of_wild_poke_58122789-6ade-4abd-930d-2631424bc635.png');
  // background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068158009676660807/BonzaiYosh_beautiful_wide_shot_landscape_with_wild_pokemon_in_t_08dbaee3-5715-4342-bb74-c9cc4f3b8005.png');
  // background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068156988871163914/BonzaiYosh_beautiful_wide_shot_landscape_with_wild_pokemon_in_t_14a21066-2b24-45f6-b78c-f4153ae87ea9.png');
  // background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068155848599289876/BonzaiYosh_beautiful_wide_shot_landscape_with_wild_pokemon_in_t_7666631d-57e7-4150-ab6d-8a4019d88196.png');
  // background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068155840797868092/BonzaiYosh_beautiful_wide_shot_landscape_with_wild_pokemon_in_t_7102239f-96ce-4d63-8ef5-90ecee719596.png');
  // background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068161765428445254/BonzaiYosh_beautiful_wide_shot_landscape_with_a_lot_of_wild_pok_2852908a-7204-4b0a-be9a-71db58f46e89.png');
  // background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068161767651426355/BonzaiYosh_beautiful_wide_shot_landscape_with_a_lot_of_wild_pok_65768eab-4ab3-4424-b564-c1ae271faa39.png');
  background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1068161816674451528/BonzaiYosh_beautiful_wide_shot_landscape_with_a_lot_of_wild_pok_a82d51e9-7b84-44b2-8da1-46af65ca794d.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  font-family: $main-font;
  font-size: rem(16);

  &__keyboard-map-wrapper {
    display: none;
    @media (min-width: 666px) {
      display: block;
    }
    position: absolute;
    top: rem(16);
    left: rem(16);
    width: 256px;
    max-height: 90vh;
    height: 660px;
    z-index: 100;
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
      transform: translate(-50%, -50%) scale(0.75);
    }
    @media (min-width: 888px) {
      transform: translate(-50%, -50%) scale(0.85);
    }
  }

  &__mobile-btn {
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    @media (min-width: 666px) {
      display: none;
    }
  }
}
</style>
