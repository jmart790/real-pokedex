import { useControlsStore } from "@/store/controls";

export default function useMainControls() {
  const controlsStore = useControlsStore();

  function handleMainControl(command: string) {
    const { currentView, navigatePokemonList, togglePower, setMainView } =
      controlsStore;
    switch (command) {
      case "power":
        togglePower();
        break;
      case "up":
      case "down":
      case "left":
      case "right":
        navigatePokemonList(command);
        break;
      case "a":
        // enter/go command
        setMainView("POKEMON");
        break;
      case "b":
        // back comman
        setMainView("LIST");
        break;
      default:
        break;
    }
  }

  return {
    handleMainControl,
  };
}
