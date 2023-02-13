<template>
  <main class="pokedex">
    <PokedexLeft>
      <Window class="pokedex__left-window">
        <Toast v-if="isToastVisible" v-bind="toastProps.header[mainView]" />
        <PokemonIntro v-if="mainView === 'INTRO'" />
        <MainMenu v-else-if="mainView === 'MENU'" />
        <template v-else>
          <PokemonList v-show="mainView === 'LIST'" />
          <PokemonWild v-show="mainView === 'POKEMON'" />
        </template>
        <Toast
          v-if="isToastVisible"
          v-bind="{ ...toastProps.footer[mainView] }"
        />
      </Window>
      <LeftControls />
    </PokedexLeft>
    <PokedexRight>
      <Window variant="md" class="pokedex__right-window">
        <component
          v-if="mainView !== 'INTRO'"
          :is="secondaryViewComponent"
          v-bind="secondaryViewProps"
        />
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
import { computed } from 'vue';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();

const { pokemonListLength, activePokemonName } = storeToRefs(pokeStore);
const { mainView, secondaryView } = storeToRefs(controlsStore);
const { setListLength, togglePower } = controlsStore;

const isToastVisible = computed(() => {
  const allowedViews = ['LIST', 'POKEMON'];
  return allowedViews.includes(mainView.value);
});

const secondaryViewComponent = computed(() => {
  if (mainView.value === 'LIST') return 'Region';
  const secondaryOptions = {
    1: 'BaseDetails',
    2: 'BaseStats',
    3: 'DamageRelations',
    4: 'DamageRelations',
    5: 'EvolutionChain',
    6: 'PokemonMoves',
    7: 'PokemonMoves',
    8: 'SpriteCollection'
  };
  if (mainView.value === 'POKEMON') {
    return secondaryOptions[secondaryView.value];
  }
  return null;
});

const secondaryViewProps = computed(() => {
  const { value } = secondaryView;
  if (value == 3) return { relation: 'from' };
  else if (value == 4) return { relation: 'to' };
  else if (value == 6) return { filterBy: 'level-up' };
  else if (value == 7) return { filterBy: 'machine' };
  else return null;
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

async function initPokedex() {
  console.log('init pokedex');
  await pokeStore.getGeneration();
  setListLength(pokemonListLength.value || 1);
  togglePower();
}

onMounted(async () => {
  await initPokedex();
});
</script>

<style scoped lang="scss">
.pokedex {
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
