<template>
  <section class="right-controls">
    <div class="blue-btns">
      <BlueButton v-for="i in 10" :key="`blue-btn-${i}`">{{ i }}</BlueButton>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.right-controls {
  .blue-btns {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 50px 50px;
    gap: 8px;
  }
}
</style>
