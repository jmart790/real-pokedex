import { useControlsStore } from "@/store/controls";

export default function useMainControls() {
  const controlsStore = useControlsStore();

  function handleMainControl(value: string) {
    const command = value.toLocaleLowerCase().replace("arrow", "");

    switch (command) {
      case "power":
      case "p":
        controlsStore.togglePower();
        break;
      case "up":
      case "down":
      case "left":
      case "right":
        controlsStore.navigatePokemonList(command);
        break;
      default:
        break;
    }
  }

  return {
    handleMainControl
  }
}