import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  INavigateOptions,
  TMainView,
  TSecondaryView
} from '@/types/index';

export const useControlsStore = defineStore('controls', () => {
  const mainView = ref<TMainView>('OFF');
  const secondaryView = ref<TSecondaryView>(1);
  const isPokedexOn = computed(() => mainView.value !== 'OFF');
  const isActiveSpriteFront = ref(true);
  const isActiveSpriteAnimated = ref(true);
  const isActiveSpriteShiny = ref(false);
  const listPosition = ref(0);
  const listLength = ref(0);
  const lastDirection = ref('');
  const menuPosition = ref(0);

  const activeSpriteSetting = computed(() => {
    return {
      isAnimated: isActiveSpriteAnimated.value,
      isShiny: isActiveSpriteShiny.value,
      isFront: isActiveSpriteFront.value
    };
  });

  function togglePower() {
    if (mainView.value === 'OFF') {
      mainView.value = 'INTRO';
      setTimeout(() => (mainView.value = 'LIST'), 6000);
    } else mainView.value = 'OFF';
  }

  function resetListPosition() {
    listPosition.value = 0;
  }

  function setListLength(length: number) {
    listLength.value = length;
  }

  function navigatePokemonList(command: string) {
    lastDirection.value = command;
    const position = listPosition.value;
    const end = listLength.value - 1;
    const options = { position, end, type: 'ADD', num: 1 };
    switch (command) {
      case 'up':
        listPosition.value = getNextMove({ ...options, type: 'SUB', num: 2 });
        break;
      case 'down':
        listPosition.value = getNextMove({ ...options, num: 2 });
        break;
      case 'left':
        listPosition.value = getNextMove({ ...options, type: 'SUB' });
        break;
      case 'right':
        listPosition.value = getNextMove({ ...options });
        break;
      default:
        break;
    }
  }

  function navigateMainMenu(command: string) {
    const position = menuPosition.value;
    const end = 3;
    const options = { position, end, type: 'ADD', num: 1 };
    switch (command) {
      case 'up':
        menuPosition.value = getNextMove({ ...options, type: 'SUB', num: 2 });
        break;
      case 'down':
        menuPosition.value = getNextMove({ ...options, num: 2 });
        break;
      case 'left':
        menuPosition.value = getNextMove({ ...options, type: 'SUB' });
        break;
      case 'right':
        menuPosition.value = getNextMove({ ...options });
        break;
      default:
        break;
    }
  }

  function getNextMove(options: INavigateOptions) {
    const { type, num, position, end } = options;
    if (type === 'SUB') return position >= num ? position - num : 0;
    else return position >= end - num ? end : position + num;
  }

  function setMainView(view: TMainView) {
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

  return {
    navigatePokemonList,
    listPosition,
    togglePower,
    isPokedexOn,
    resetListPosition,
    mainView,
    setListLength,
    setMainView,
    setSecondaryView,
    secondaryView,
    toggleActiveSpriteType,
    toggleActiveSpriteOrientation,
    toggleActiveSpriteShiny,
    activeSpriteSetting,
    lastDirection,
    menuPosition,
    navigateMainMenu
  };
});
