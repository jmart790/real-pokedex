<template>
  <div class="frost-card">
    <div class="frost-card__content">
      <slot />
    </div>
    <div class="frost-card__ui"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.frost-card {
  height: 100%;
  position: relative;
  z-index: 2;
  border-radius: $cool-border-radius;

  &__content {
    height: inherit;
    z-index: 2;
    border-radius: inherit;
  }
  &__ui {
    position: absolute;
    inset: 0 0 0 0;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    z-index: 1;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    &:before {
      content: '';
      position: absolute;
      inset: 0 0 0 0;
      width: 100%;
      height: 100%;
      background: inherit;
      z-index: 0;
      border-radius: inherit;
      background: white;
      background: linear-gradient(
        40deg,
        rgba(255, 255, 255, 0.4) 30%,
        rgba(255, 255, 255, 0.1) 100%
      );
      filter: blur(8px);
    }
  }
}
</style>
