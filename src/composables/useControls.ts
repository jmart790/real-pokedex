import { useControlsStore } from '@/store/controls';
import { usePokeStore } from '@/store/pokemon';
import type { TMainView } from '@/types';
import { storeToRefs } from 'pinia';

export default function useControls() {
  const pokeStore = usePokeStore();
  const controlsStore = useControlsStore();

  const { getGeneration } = pokeStore;
  const {
    navigatePokemonList,
    togglePower,
    setMainView,
    setSecondaryView,
    toggleActiveSpriteOrientation,
    toggleActiveSpriteType,
    toggleActiveSpriteShiny,
    navigateMainMenu
  } = controlsStore;

  const { mainView, menuPosition } = storeToRefs(controlsStore);

  function handleMainControl(command: string) {
    if (mainView.value === 'OFF' && command === 'power') togglePower();
    else if (mainView.value === 'MENU') MenuViewControls(command);
    else if (mainView.value === 'LIST') listViewControls(command);
    else if (mainView.value === 'POKEMON') pokemonViewControls(command);
  }

  function MenuViewControls(command: string) {
    const menuOptions = ['LIST', 'GENERATIONS', 'ME', 'CREDITS'];
    const newView = menuOptions[menuPosition.value] as TMainView;

    switch (command) {
      case 'power':
        togglePower();
        break;
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        navigateMainMenu(command);
        break;
      case 'a':
        setMainView(newView);
        break;
      default:
        break;
    }
  }

  function listViewControls(command: string) {
    switch (command) {
      case 'power':
        togglePower();
        break;
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        navigatePokemonList(command);
        break;
      case 'a':
        setMainView('POKEMON');
        break;
      case 'b':
        setMainView('MENU');
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
        getGeneration(Number(command));
        break;
      default:
        break;
    }
  }

  function pokemonViewControls(command: string) {
    switch (command) {
      case 'power':
        togglePower();
        break;
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        navigatePokemonList(command);
        break;
      case 'x':
        toggleActiveSpriteOrientation();
        break;
      case 'y':
        toggleActiveSpriteType();
        break;
      case 'a':
        toggleActiveSpriteShiny();
        break;
      case 'b':
        setMainView('LIST');
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
        setSecondaryView(command as any);
        break;
      default:
        break;
    }
  }

  return {
    handleMainControl
  };
}
