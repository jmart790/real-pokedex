<template>
  <main class="pokedex">
    <PokedexLeft>
      <Window class="pokedex__left-window" @click="handleOpenHelper">
        <Toast v-if="isToastVisible" v-bind="toastProps.header" />
        <KeepAlive>
          <component :is="mainViewComponent" />
        </KeepAlive>
        <Toast v-if="isToastVisible" v-bind="toastProps.footer" />
      </Window>
      <LeftControls />
    </PokedexLeft>
    <PokedexRight>
      <Window variant="md" class="pokedex__right-window" @click="handleOpenHelper">
        <component :is="secondaryViewComponent" v-bind="secondaryViewProps" />
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

const emit = defineEmits(['open']);
const pokeStore = usePokeStore();
const controlsStore = useControlsStore();
const { trackNewUser } = useAnalytics();

const { activePokemonName } = storeToRefs(pokeStore);
const { mainView, secondaryView } = storeToRefs(controlsStore);
const { togglePower } = controlsStore;

const isToastVisible = computed(() => {
  const viewsWithToast = ['LIST', 'POKEMON', 'GENERATIONS', 'YOSH'];
  return viewsWithToast.includes(mainView.value);
});

const mainViewComponent = computed(() => {
  const options = {
    INTRO: 'PokemonIntro',
    MENU: 'MainMenu',
    LIST: 'PokemonList',
    POKEMON: 'PokemonWild',
    GENERATIONS: 'PokemonGens',
    YOSH: 'ProfYosh',
    CREDITS: 'CreditThanks'
  };
  return options[mainView.value] || null;
});

const secondaryViewComponent = computed(() => {
  const view = mainView.value;
  if (['OFF', 'INTRO'].includes(view)) return 'null';
  if (view === 'LIST') return 'Region';
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
  const pokeView = secondaryOptions[secondaryView.value];
  if (['POKEMON', 'YOSH'].includes(view)) return pokeView;
  return 'PlaceHolder';
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
    },
    YOSH: {
      header: {
        isHeader: true,
        copy: 'Prof. Yosh'
      },
      footer: {
        isHeader: false,
        copy: 'Back',
        btnCopy: 'B'
      }
    }
  };
  return options[mainView.value] || null;
});

function handleOpenHelper() {
  emit('open');
}

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
