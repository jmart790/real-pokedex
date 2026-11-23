<template>
  <section class="right-controls">
    <div class="blue-btns">
      <BlueButton
        v-for="i in 9"
        :key="`blue-btn-${i}`"
        @click="handleMainControl(String(i))"
        :copy="i"
        :isActive="activeBtn === String(i)"
      />
      <BlueButton copy="search" @click="handleMainControl('search')" :isActive="activeBtn === 'search'" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useControlsStore } from '@/store/controls';
import useControls from '@/composables/useControls';
import { storeToRefs } from 'pinia';

const { handleMainControl } = useControls();
const controlsStore = useControlsStore();
const { activeBtn } = storeToRefs(controlsStore);
</script>

<style scoped lang="scss">
.right-controls {
  .blue-btns {
    width: 90%;
    margin-inline: auto;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 50px 50px;
    gap: gap(4);
  }
}
</style>
