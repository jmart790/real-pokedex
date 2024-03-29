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
    navigateMainMenu,
    navigateGensMenu,
    setActiveBtn
  } = controlsStore;

  const { mainView, menuPosition, gensPosition } = storeToRefs(controlsStore);

  function handleMainControl(command: string) {
    handleActiveBtn(command);
    if (mainView.value === 'OFF' && command === 'power') togglePower();
    else if (mainView.value === 'MENU') MenuViewControls(command);
    else if (mainView.value === 'LIST') listViewControls(command);
    else if (mainView.value === 'POKEMON') pokemonViewControls(command);
    else if (mainView.value === 'GENERATIONS') gensViewControls(command);
    else if (mainView.value === 'YOSH') profYoshControls(command);
    else if (mainView.value === 'CREDITS') creditsControls(command);
  }

  function MenuViewControls(command: string) {
    const menuOptions = ['LIST', 'GENERATIONS', 'YOSH', 'CREDITS'];
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

  function gensViewControls(command: string) {
    const gen = gensPosition.value + 1;
    switch (command) {
      case 'power':
        togglePower();
        break;
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        navigateGensMenu(command);
        break;
      case 'a':
        getGeneration(gen);
        setMainView('LIST');
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
      case '9':
        getGeneration(Number(command));
        setMainView('LIST');
        break;
      default:
        break;
    }
  }

  function profYoshControls(command: string) {
    switch (command) {
      case 'power':
        togglePower();
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
        setSecondaryView(command as any);
        break;
      default:
        break;
    }
  }

  function creditsControls(command: string) {
    switch (command) {
      case 'power':
        togglePower();
        break;
      case 'b':
        setMainView('MENU');
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
      case '9':
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

  function handleActiveBtn(command: string) {
    const timeToLeaveActive = 200;
    setActiveBtn(command);
    setTimeout(() => setActiveBtn(''), timeToLeaveActive);
  }

  return {
    handleMainControl
  };
}
