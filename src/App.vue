<template>
  <div class="pokedex-container">
    <Pokedex />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import useMainControls from "@/composables/useMainControls";
const { handleMainControl } = useMainControls();

function handleKeyDown(event: KeyboardEvent) {
  event.preventDefault();
  handleMainControl(event.key);
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped lang="scss">
.pokedex-container {
  height: 100vh;
  width: 100vw;
  margin: 0;
  background-color: $lightest-blue;
  font-family: $main-font;
  font-size: 16px;
}
</style>
