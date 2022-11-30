<template>
  <section class="window" :class="`window--${variant}`">
    <div class="window__screen">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'sm' | 'md' | 'lg';
}
withDefaults(defineProps<Props>(), {
  variant: 'lg'
});
</script>

<style scoped lang="scss">
.window {
  height: 385px;
  width: 100%;
  background: $off-black;
  padding: gap(4);
  border-radius: 15px;

  &--md {
    height: 285px;
  }

  &--sm {
    height: 50px;
    padding: gap(1) gap(2);
    border-radius: 5px;
  }

  &__screen {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $console-grey;
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    box-shadow: 0px -10px 10px -5px $off-black inset;
    overflow: hidden;

    &:before {
      height: 20px;
      background-color: inherit;
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
    }

    &:after {
      height: 20px;
      background-image: linear-gradient(
        transparent,
        $light-grey 40%,
        transparent 90%
      );
      opacity: 0.6;
    }
  }
}
</style>
