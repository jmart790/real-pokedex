<template>
  <div class="frost-card">
    <slot />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.frost-card {
  background: white;
  background: linear-gradient(
    40deg,
    rgba(255, 255, 255, 0.3) 30%,
    rgba(255, 255, 255, 0.1) 100%
  );
  backdrop-filter: blur(4px);
  border-radius: $cool-border-radius;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}
</style>
