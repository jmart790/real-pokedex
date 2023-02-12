<template>
  <section class="right-controls">
    <div class="blue-btns">
      <BlueButton
        v-for="i in 8"
        :key="`blue-btn-${i}`"
        @click="handleBtnClick(i)"
        :copy="i"
      >
        {{ i }}
      </BlueButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import useControls from '@/composables/useControls';
const { handleMainControl } = useControls();

function handleBtnClick(command: number) {
  handleMainControl(String(command));
}
</script>

<style scoped lang="scss">
.right-controls {
  .blue-btns {
    width: 90%;
    margin-inline: auto;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 50px 50px;
    gap: gap(4);
  }
}
</style>
