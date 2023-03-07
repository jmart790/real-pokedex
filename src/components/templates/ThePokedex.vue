<template>
  <main class="pokedex">
    <PokedexLeft>
      <Window class="pokedex__left-window">
        <Toast v-if="isToastVisible" v-bind="toastProps.header" />
        <component :is="mainViewComponent" />
        <!-- pokemon list/wild needs to remain alive for now -->
        <PokemonWild v-show="mainView === 'POKEMON'" />
        <PokemonList v-show="mainView === 'LIST'" />
        <Toast v-if="isToastVisible" v-bind="{ ...toastProps.footer }" />
      </Window>
      <LeftControls />
    </PokedexLeft>
    <PokedexRight>
      <Window variant="md" class="pokedex__right-window">
        <component v-if="mainView !== 'INTRO'" :is="secondaryViewComponent" v-bind="secondaryViewProps" />
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
import useAnalytics from '@/composables/useSegment';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();
const { trackNewUser } = useAnalytics();

const { pokemonListLength, activePokemonName } = storeToRefs(pokeStore);
const { mainView, secondaryView } = storeToRefs(controlsStore);
const { togglePower } = controlsStore;

const isToastVisible = computed(() => {
  const viewsWithToast = ['LIST', 'POKEMON', 'GENERATIONS'];
  return viewsWithToast.includes(mainView.value);
});

const mainViewComponent = computed(() => {
  const options = {
    INTRO: 'PokemonIntro',
    MENU: 'MainMenu',
    GENERATIONS: 'PokemonGens',
    YOSH: 'ProfYosh',
    CREDITS: 'CreditThanks'
  };
  return options[mainView.value] || null;
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
  if (['POKEMON', 'YOSH'].includes(mainView.value)) {
    return secondaryOptions[secondaryView.value];
  }
  return null;
});

const secondaryViewProps = computed(() => {
  const options = {
    3: { relation: 'from' },
    4: { relation: 'to' },
    6: { filterBy: 'level-up' },
    7: { filterBy: 'machine' }
  };
  return options[secondaryView.value] || null;
});

const toastProps = computed(() => {
  const options = {
    LIST: {
      header: {
        isHeader: true,
        copy: `Pokemon`
      },
      footer: {
        isHeader: false,
        copy: `Select`,
        btnCopy: 'A'
      }
    },
    POKEMON: {
      header: {
        isHeader: true,
        copy: activePokemonName.value
      },
      footer: {
        isHeader: false,
        copy: 'Back',
        btnCopy: 'B'
      }
    },
    GENERATIONS: {
      header: {
        isHeader: true,
        copy: 'Generations'
      },
      footer: {
        isHeader: false,
        copy: `Select`,
        btnCopy: 'A'
      }
    }
  };
  return options[mainView.value] || null;
});

async function initPokedex() {
  await pokeStore.getGeneration();
  togglePower();
}

onMounted(async () => {
  await initPokedex();
  trackNewUser(window);
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
