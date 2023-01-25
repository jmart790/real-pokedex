import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { TMainView, TSecondaryView } from '@/types/index';

export const useControlsStore = defineStore('controls', () => {
  const currentView = ref<TMainView>('OFF');
  const secondaryView = ref<TSecondaryView>(1);
  const isPokedexOn = computed(() => currentView.value !== 'OFF');
  const isActiveSpriteFront = ref(true);
  const activeSpriteType = ref(0);
  const listPosition = ref(0);
  const listLength = ref(0);
  const lastDirection = ref('');

  const spriteTypeOptions = ['animated', 'animatedShiny', 'artwork', 'artworkShiny'];
  const activeSpriteSetting = computed(() => {
    return {
      type: spriteTypeOptions[activeSpriteType.value],
      isFront: isActiveSpriteFront.value
    };
  });

  function togglePower() {
    if (currentView.value === 'OFF') {
      currentView.value = 'INTRO';
      setTimeout(() => (currentView.value = 'LIST'), 6000);
    } else currentView.value = 'OFF';
  }

  function resetListPosition() {
    listPosition.value = 0;
  }

  function setListLength(length: number) {
    listLength.value = length;
  }

  function navigatePokemonList(command: string) {
    lastDirection.value = command;
    switch (command) {
      case 'up':
        listPosition.value = getNextMove('SUB', 2);
        break;
      case 'down':
        listPosition.value = getNextMove('ADD', 2);
        break;
      case 'left':
        listPosition.value = getNextMove('SUB');
        break;
      case 'right':
        listPosition.value = getNextMove('ADD');
        break;
      default:
        break;
    }
  }

  function getNextMove(type: 'ADD' | 'SUB', num = 1) {
    const position = listPosition.value;
    const end = listLength.value - 1;

    if (type === 'SUB') return position >= num ? position - num : 0;
    else return position >= end - num ? end : position + num;
  }

  function setMainView(view: TMainView) {
    currentView.value = view;
  }
  function setSecondaryView(view: TSecondaryView) {
    secondaryView.value = view;
  }
  function toggleActiveSpriteType() {
    activeSpriteType.value =
      activeSpriteType.value >= spriteTypeOptions.length - 1
        ? 0
        : activeSpriteType.value + 1;
  }
  function toggleActiveSpriteOrientation() {
    isActiveSpriteFront.value = !isActiveSpriteFront.value;
  }

  return {
    navigatePokemonList,
    listPosition,
    togglePower,
    isPokedexOn,
    resetListPosition,
    currentView,
    setListLength,
    setMainView,
    setSecondaryView,
    secondaryView,
    toggleActiveSpriteType,
    toggleActiveSpriteOrientation,
    activeSpriteSetting,
    lastDirection
  };
});
