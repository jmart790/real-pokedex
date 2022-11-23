<template>
  <section class="mini-views">
    <section class="mini-views__windows">
      <Window variant="sm"></Window>
      <Window variant="sm"></Window>
    </section>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.mini-views {
  margin: 25px 0;
  &__windows {
    margin-top: 120px;
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }
}
</style>
