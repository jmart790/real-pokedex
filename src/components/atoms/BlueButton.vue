<template>
  <button
    class="blue-btn"
    :class="{ 'blue-btn--active': isActive }"
    :aria-label="copy === 'search' ? 'Search' : undefined"
  >
    <svg
      v-if="copy === 'search'"
      class="blue-btn__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3.5"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="6.5" />
      <path d="M15 15l6 6" />
    </svg>
    <template v-else>{{ copy }}</template>
  </button>
</template>

<script setup lang="ts">
defineProps<{ copy: number | string; isActive?: boolean }>(); // a number, or 'search' for the magnifier
</script>

<style scoped lang="scss">
.blue-btn {
  position: relative;
  display: grid;
  place-items: center;
  border-radius: $rounded;
  background-image: linear-gradient(to bottom, $blue, $dark-blue);
  box-shadow: 0px 2px 1px 0px $light-blue inset, 0px -2px 1px 0px black inset, 0px 0px 2px 0px black,
    0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black;
  font-weight: bold;
  font-size: $font-size-7;
  font-family: $secondary-font;
  color: rgba($darker-blue, 0.7);
  text-shadow: 2px 2px 3px rgba($blue, 9);

  // stamped into the button like the numbers: same color, same drop shadow as their text-shadow
  &__icon {
    width: 1em;
    height: 1em;
    filter: drop-shadow(2px 2px 3px $blue);
  }

  &:hover {
    cursor: pointer;
  }

  &:active,
  &--active {
    transform: translateY(1px);
    box-shadow: 0px 1px 1px 0px $light-blue inset, 0px -1px 1px 0px black inset, 0px 0px 2px 0px black,
      0px 0px 2px 0px black, 0px 0px 2px 0px black, 0px 0px 2px 0px black;
  }
}
</style>
