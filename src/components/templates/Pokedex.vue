<template>
  <main class="pokedex">
    <PokedexLeft>
      <template #radar>
        <Radar />
      </template>
      <Window class="pokedex__left-window">
        <Toast v-if="isToastVisible" v-bind="toastProps.header[currentView]" />
        <PokemonIntro v-if="currentView === 'INTRO'" />
        <template v-else>
          <PokemonList v-show="currentView === 'LIST'" />
          <PokemonDetails v-show="currentView === 'POKEMON'" />
        </template>
        <Toast
          v-if="isToastVisible"
          v-bind="{ ...toastProps.footer[currentView] }"
        />
      </Window>
      <LeftControls />
    </PokedexLeft>
    <PokedexRight>
      <Window variant="md" class="pokedex__right-window">
        <component v-if="currentView !== 'INTRO'" :is="secondaryView" />
      </Window>
      <RightControls />
      <MiniViews />
    </PokedexRight>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { useControlsStore } from '@/store/controls';
import { storeToRefs } from 'pinia';
import { computed } from '@vue/reactivity';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();

const { pokemonListLength, genNum, activePokemonName, region } =
  storeToRefs(pokeStore);
const { currentView } = storeToRefs(controlsStore);
const { setListLength, togglePower } = controlsStore;

const isToastVisible = computed(() => {
  // will need to compute future store value so user can hide toasts
  const allowedViews = ['LIST', 'POKEMON'];
  return allowedViews.includes(currentView.value);
});

const secondaryView = computed(() => {
  const options = {
    LIST: 'Region',
    // POKEMON: 'BaseDetails'
    POKEMON: 'BaseStats'
  };
  return options[currentView.value];
});

const toastProps = computed(() => {
  return {
    header: {
      LIST: {
        isHeader: true,
        copy: `Pokemon`
      },
      POKEMON: {
        isHeader: true,
        copy: activePokemonName.value
      }
    },
    footer: {
      LIST: {
        isHeader: false,
        copy: `Select`,
        btnCopy: 'A'
      },
      POKEMON: {
        isHeader: false,
        copy: 'Back',
        btnCopy: 'B'
      }
    }
  };
});

onMounted(async () => {
  await pokeStore.getGeneration();
  setListLength(pokemonListLength.value || 1);
  togglePower();
});
</script>

<style scoped lang="scss">
.pokedex {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.85);
  width: 1000px;
  height: 700px;
  display: grid;
  grid-template-columns: 500px 500px;

  &__left-window,
  &__right-window {
    margin-bottom: 25px;
  }
}
</style>
