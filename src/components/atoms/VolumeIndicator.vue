<template>
  <Transition name="volume-indicator">
    <div v-if="isVisible" class="volume-indicator" role="status" :aria-label="`Volume ${volume} of ${MAX_VOLUME}`">
      <p class="volume-indicator__content">
        <span>vol</span>
        <span
          v-for="bar in MAX_VOLUME"
          :key="bar"
          class="volume-indicator__bar"
          :class="{ 'volume-indicator__bar--on': bar <= volume }"
        />
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { MAX_VOLUME, volume, volumeAdjustedAt } from '@/composables/useSound';

const isVisible = ref(false);
let hideTimer: ReturnType<typeof setTimeout>;

// Every press restarts the 1s countdown, so it fades 1s after the last adjustment.
watch(volumeAdjustedAt, () => {
  isVisible.value = true;
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => (isVisible.value = false), 1000);
});
</script>

<style scoped lang="scss">
// Mirrors the header Toast's skewed black tab, anchored bottom-left.
.volume-indicator {
  position: absolute;
  z-index: 3;
  bottom: 0;
  left: -28px;
  padding: 4px 24px 4px 44px;
  color: $off-white;
  background: black;
  transform: skew(60deg); // right edge slants out: longer at the bottom
  border-top-right-radius: 5px;

  &__content {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: $font-size-3;
    font-weight: 700;
    text-transform: uppercase;
    transform: skew(-60deg);

    span:first-child {
      margin-right: 4px;
    }
  }

  &__bar {
    width: 8px;
    height: 14px;
    border-radius: 2px;
    background: $medium-grey;

    &--on {
      background: $off-white;
    }
  }
}

.volume-indicator-enter-active {
  transition: opacity 300ms ease-in-out;
}
.volume-indicator-leave-active {
  transition: opacity 2000ms ease-in-out;
}
.volume-indicator-enter-from,
.volume-indicator-leave-to {
  opacity: 0;
}
</style>
