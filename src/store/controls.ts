import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

type CurrentView = 'OFF' | 'INTRO' | 'LIST' | 'POKEMON';
// type SecondaryView = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const useControlsStore = defineStore('controls', () => {
  const currentView = ref<CurrentView>('OFF');
  const secondaryView = ref<string>('1');
  const isPokedexOn = computed(() => currentView.value !== 'OFF');

  function togglePower() {
    if (currentView.value === 'OFF') {
      currentView.value = 'INTRO';
      setTimeout(() => (currentView.value = 'LIST'), 6000);
    } else currentView.value = 'OFF';
  }

  const listPosition = ref(0);
  const listLength = ref(0);

  function resetListPosition() {
    listPosition.value = 0;
  }

  function setListLength(length: number) {
    listLength.value = length;
  }

  function navigatePokemonList(command: string) {
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
    console.log({ position, end, num });
    if (type === 'SUB') return position >= num ? position - num : 0;
    else return position >= end - num ? end : position + num;
  }

  function setMainView(view: CurrentView) {
    currentView.value = view;
  }
  function setSecondaryView(view: string) {
    secondaryView.value = view;
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
    secondaryView
  };
});
