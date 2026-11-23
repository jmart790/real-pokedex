import { useControlsStore } from '@/store/controls';
import { usePokeStore } from '@/store/pokemon';
import type { TMainView } from '@/types';
import { storeToRefs } from 'pinia';
import { nextTick } from 'vue';
import { changeVolume, playSound } from '@/composables/useSound';

export default function useControls() {
  const pokeStore = usePokeStore();
  const controlsStore = useControlsStore();

  const { getGeneration, setActivePokemonPayload } = pokeStore;
  const { searchResults, genNum, pokemonList } = storeToRefs(pokeStore);
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
    setActiveBtn,
    navigateSearchResults,
    openSearch,
    closeSearch,
    setListPosition,
    openPokemonFromSearch,
    setSearchPosition
  } = controlsStore;

  const { mainView, menuPosition, gensPosition, searchPosition, isPokemonFromSearch } = storeToRefs(controlsStore);

  function handleMainControl(command: string) {
    handleActiveBtn(command);
    handleSound(command);
    if (mainView.value === 'OFF' && command === 'power') togglePower();
    else if (command === 'search' && !['OFF', 'INTRO'].includes(mainView.value)) openSearch();
    else if (mainView.value === 'SEARCH') searchControls(command);
    else if (mainView.value === 'MENU') MenuViewControls(command);
    else if (mainView.value === 'LIST') listViewControls(command);
    else if (mainView.value === 'POKEMON') pokemonViewControls(command);
    else if (mainView.value === 'GENERATIONS') gensViewControls(command);
    else if (mainView.value === 'YOSH') profYoshControls(command);
    else if (mainView.value === 'CREDITS') creditsControls(command);
  }

  // Every button (keyboard or on-screen) routes through here, so sounds live in one place.
  function handleSound(command: string) {
    if (command === 'volume-up' || command === 'volume-down') {
      changeVolume(command === 'volume-up' ? 1 : -1);
    } else if (command === 'power') {
      playSound(mainView.value === 'OFF' ? 'powerOn' : 'powerOff');
    } else if (mainView.value === 'OFF') {
      return; // screen off: only power and volume make sound
    } else if (['up', 'down', 'left', 'right'].includes(command)) {
      playSound('move');
    } else if (command === 'a') {
      playSound('select');
    } else if (command === 'b') {
      playSound('back');
    } else if (command === 'x' || command === 'y') {
      playSound('toggle');
    } else {
      playSound('tab'); // number buttons 1-10
    }
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
        if (menuPosition.value === 4) openSearch();
        else setMainView(newView);
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
        setMainView(isPokemonFromSearch.value ? 'SEARCH' : 'LIST');
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

  function searchControls(command: string) {
    switch (command) {
      case 'power':
        togglePower();
        break;
      case 'up':
      case 'down':
      case 'left':
      case 'right':
        searchArrowControls(command);
        break;
      case 'a':
        selectSearchResult();
        break;
      case 'b':
        closeSearch();
        break;
      default:
        break;
    }
  }

  // In the field: left/right move the text cursor, down drops onto the first result.
  // In the results: up from the first row goes back to the field. Out of the field, letter keys are Pokedex buttons.
  function searchArrowControls(command: string) {
    // ponytail: DOM lookup instead of a focus-request store flag; there is only ever one search field
    const input = document.querySelector<HTMLInputElement>('.pokemon-search__input');
    const isInField = !!input && document.activeElement === input;
    if (isInField) {
      if (command === 'down' && searchResults.value.length) {
        input.blur();
        setSearchPosition(0); // always land on the first result
      }
      return;
    }
    if (command === 'up' && searchPosition.value < 2) {
      input?.focus();
      return;
    }
    navigateSearchResults(command, searchResults.value.length);
  }

  // Opens the picked Pokemon inside its generation's list, so B, the D-pad and the detail screens work as usual.
  async function selectSearchResult() {
    const result = searchResults.value[searchPosition.value];
    if (!result) return;
    if (result.gen !== genNum.value) {
      setMainView('LIST'); // shows the list loader while the generation loads
      await getGeneration(result.gen);
      await nextTick(); // let the list's gen-change reset run before setting the position
    }
    setListPosition(Math.max(pokemonList.value?.findIndex(({ id }) => id === result.id) ?? 0, 0));
    setActivePokemonPayload(String(result.id));
    openPokemonFromSearch();
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
