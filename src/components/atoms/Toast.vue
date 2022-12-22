<template>
  <component
    :class="`toast--${isHeader ? 'title' : 'instructions'}`"
    :is="isHeader ? 'h1' : 'p'"
    class="toast"
  >
    <span v-if="btnCopy && !isHeader">{{ btnCopy }}</span>
    {{ copy }}
  </component>
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
  padding: 4px 16px;
  background: black;
  font-size: 16px;
  color: $off-white;
  text-transform: capitalize;

  &::before {
    position: absolute;
    background-color: inherit;
    z-index: -1;

    content: ' ';
    width: 65px;
    height: 30px;
  }

  &--title {
    top: 0;
    left: 0;
    border-bottom-right-radius: 10px;
    font-weight: 700;
    &::before {
      top: 0px;
      right: -30px;
      transform: skew(-40deg);
      border-bottom-right-radius: 5px;
    }
  }
  &--instructions {
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 8px;
    bottom: 0;
    right: 0;
    border-top-left-radius: 10px;

    &::before {
      height: 100%;
      bottom: 0px;
      left: -30px;
      transform: skew(-40deg);
      border-top-left-radius: 5px;
    }
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
