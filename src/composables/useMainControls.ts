import { useControlsStore } from '@/store/controls';

export default function useMainControls() {
  const controlsStore = useControlsStore();

  const {
    currentView,
    navigatePokemonList,
    togglePower,
    setMainView,
    setSecondaryView
  } = controlsStore;

  function handleMainControl(command: string) {
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
        // enter/go command
        setMainView('POKEMON');
        break;
      case 'b':
        // back comman
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
