import { defineStore, storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import type { INavigateOptions, TMainView, TSecondaryView } from '@/types/index';

export const useControlsStore = defineStore('controls', () => {
  const pokeStore = usePokeStore();
  const { pokemonListLength } = storeToRefs(pokeStore);
  const mainView = ref<TMainView>('OFF');
  const secondaryView = ref<TSecondaryView>(1);
  const isPokedexOn = computed(() => mainView.value !== 'OFF');
  const isActiveSpriteFront = ref(true);
  const isActiveSpriteAnimated = ref(true);
  const isActiveSpriteShiny = ref(false);
  const listPosition = ref(0);
  const lastDirection = ref('');
  const menuPosition = ref(0);
  const gensPosition = ref(0);
  const activeBtn = ref('');
  const searchPosition = ref(0);
  const viewBeforeSearch = ref<TMainView>('MENU');
  const isPokemonFromSearch = ref(false); // B on that Pokemon returns to search instead of the list

  const activeSpriteSetting = computed(() => {
    return {
      isAnimated: isActiveSpriteAnimated.value,
      isShiny: isActiveSpriteShiny.value,
      isFront: isActiveSpriteFront.value
    };
  });

  const isYoshView = computed(() => mainView.value === 'YOSH');

  function togglePower() {
    if (mainView.value === 'OFF') {
      mainView.value = 'INTRO';
      setTimeout(() => (mainView.value = 'MENU'), 6000);
    } else mainView.value = 'OFF';
  }

  function resetListPosition() {
    listPosition.value = 0;
  }

  // Shared 2-column grid move: up/down jump a row (2), left/right move 1, clamped to 0..end.
  function getGridMove(position: number, command: string, end: number) {
    const options = { position, end, type: 'ADD', num: 1 };
    if (command === 'up') return getNextMove({ ...options, type: 'SUB', num: 2 });
    if (command === 'down') return getNextMove({ ...options, num: 2 });
    if (command === 'left') return getNextMove({ ...options, type: 'SUB' });
    if (command === 'right') return getNextMove(options);
    return position;
  }

  function navigatePokemonList(command: string) {
    lastDirection.value = command;
    listPosition.value = getGridMove(listPosition.value, command, Number(pokemonListLength.value) - 1);
  }

  // 0-3 = 2x2 grid; 4 = search button in the top-left corner: up from the top row, down/right back to the grid
  function navigateMainMenu(command: string) {
    const position = menuPosition.value;
    if (position === 4) {
      if (command === 'down' || command === 'right') menuPosition.value = 0;
    } else if (command === 'up' && position < 2) {
      menuPosition.value = 4;
    } else {
      menuPosition.value = getGridMove(position, command, 3);
    }
  }

  function navigateGensMenu(command: string) {
    gensPosition.value = getGridMove(gensPosition.value, command, 8);
  }

  function navigateSearchResults(command: string, resultsLength: number) {
    searchPosition.value = getGridMove(searchPosition.value, command, Math.max(resultsLength - 1, 0));
  }

  function getNextMove(options: INavigateOptions) {
    const { type, num, position, end } = options;
    if (type === 'SUB') return position >= num ? position - num : 0;
    else return position >= end - num ? end : position + num;
  }

  function openSearch() {
    if (mainView.value === 'SEARCH') return;
    viewBeforeSearch.value = mainView.value;
    setMainView('SEARCH');
  }

  function closeSearch() {
    setMainView(viewBeforeSearch.value);
  }

  function openPokemonFromSearch() {
    setMainView('POKEMON');
    isPokemonFromSearch.value = true;
  }

  function setListPosition(position: number) {
    listPosition.value = position;
  }

  function setSearchPosition(position: number) {
    searchPosition.value = position;
  }

  function setMainView(view: TMainView) {
    isPokemonFromSearch.value = false; // any other route to a Pokemon (e.g. the list) goes back normally
    mainView.value = view;
  }
  function setSecondaryView(view: TSecondaryView) {
    secondaryView.value = view;
  }
  function toggleActiveSpriteType() {
    isActiveSpriteAnimated.value = !isActiveSpriteAnimated.value;
  }
  function toggleActiveSpriteOrientation() {
    isActiveSpriteFront.value = !isActiveSpriteFront.value;
  }
  function toggleActiveSpriteShiny() {
    isActiveSpriteShiny.value = !isActiveSpriteShiny.value;
  }
  function setActiveBtn(value: string) {
    activeBtn.value = value;
  }

  return {
    navigatePokemonList,
    listPosition,
    togglePower,
    isPokedexOn,
    resetListPosition,
    mainView,
    setMainView,
    setSecondaryView,
    secondaryView,
    toggleActiveSpriteType,
    toggleActiveSpriteOrientation,
    toggleActiveSpriteShiny,
    activeSpriteSetting,
    lastDirection,
    menuPosition,
    navigateMainMenu,
    gensPosition,
    navigateGensMenu,
    isYoshView,
    activeBtn,
    setActiveBtn,
    searchPosition,
    navigateSearchResults,
    openSearch,
    closeSearch,
    setListPosition,
    setSearchPosition,
    isPokemonFromSearch,
    openPokemonFromSearch
  };
});
