<template>
  <div class="toast" :class="`toast--${isHeader ? 'title' : 'instructions'}`">
    <component class="toast__content" :is="isHeader ? 'h1' : 'p'">
      <span v-if="btnCopy">{{ btnCopy }}</span>
      {{ copy }}
    </component>
  </div>
</template>

<script setup lang="ts">
interface Props {
  isHeader?: Boolean;
  copy: string;
  btnCopy?: string;
}
defineProps<Props>();
</script>

<style scoped lang="scss">
.toast {
  position: absolute;
  z-index: 1;
  width: auto;
  transform: skew(-60deg);
  padding: 4px 32px;
  color: $off-white;
  background: black;

  &__content {
    font-size: 16px;
    text-transform: capitalize;
    transform: skew(60deg);
  }

  &--title {
    top: 0;
    left: -28px;
    padding-left: 44px;
    border-bottom-right-radius: 5px;
    font-weight: 700;
  }
  &--instructions {
    bottom: 0;
    right: -28px;
    padding-right: 44px;
    display: flex;
    align-items: center;
    gap: 8px;
    border-top-left-radius: 5px;

    span {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1/1;
      width: 24px;
      border-radius: 50%;
      font-size: 14px;
      background: $light-grey;
      line-height: 1;
    }
  }
}
</style>
