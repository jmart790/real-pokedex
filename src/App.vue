<template>
  <div class="pokedex-container" @keyup="handleKeyDown">
    <Pokedex />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue';
import useMainControls from '@/composables/useMainControls';
const { handleMainControl } = useMainControls();
// eslint-disable-next-line prettier/prettier
const keysToListenTo = ['down', 'up', 'left', 'right', 'x', 'z', 'a', 's', '1', '2', '3', '4', '5', '6', '7', '8'];
const keysToBtnMap = { a: 'y', s: 'x', z: 'b', x: 'a', p: 'power' };


function handleKeyDown(event: KeyboardEvent) {
  event.preventDefault();
  const command = event.key.toLowerCase().replace('arrow', '');
  // console.log({ command });
  if (!keysToListenTo.includes(command));
  handleMainControl(keysToBtnMap[command] || command);
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
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
