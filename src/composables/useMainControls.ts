import { useControlsStore } from '@/store/controls';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';

export default function useMainControls() {
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
    toggleActiveSpriteShiny
  } = controlsStore;

  const { mainView } = storeToRefs(controlsStore);

  function handleMainControl(command: string) {
    if (mainView.value === 'OFF' && command === 'power') togglePower();
    else if (mainView.value === 'LIST') listViewControls(command);
    else if (mainView.value === 'POKEMON') pokemonViewControls(command);
  }

  function listViewControls(command) {
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
        // back command
        // eventually menu cmd
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

  function pokemonViewControls(command) {
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
        setSecondaryView(command);
        break;
      default:
        break;
    }
  }

  return {
    handleMainControl
  };
}
