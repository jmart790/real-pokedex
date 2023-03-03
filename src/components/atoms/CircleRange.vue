<template>
  <div class="circle-range">
    <svg viewBox="0 0 36 36" class="circular-chart">
      <path
        class="circular-chart__bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <path
        class="circular-chart__fill"
        :class="`circular-chart__fill--${label}`"
        :stroke-dasharray="`${percent}, 100`"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <linearGradient
        v-for="theType in statTypes"
        :key="`linear-gradient--${theType}`"
        :id="`gradient-${theType}`"
      >
        <stop :class="`stop1-${theType}`" offset="0%" />
        <stop :class="`stop2-${theType}`" offset="100%" />
      </linearGradient>
    </svg>
    <div class="circle-range__values">
      <span class="circle-range__base-val">{{ base }}</span>
      <!-- <span class="circle-range__max-val"> {{ max }}</span> -->
    </div>
    <label>{{ statLabel }}</label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const statTypes = [
  'hp',
  'attack',
  'defense',
  'special-attack',
  'special-defense',
  'speed'
];

const props = defineProps<{ max: number; base: number; label: string }>();

const percent = computed(() => {
  return Math.floor((props.base * 100) / props.max);
});

const statLabel = computed(
  () =>
    ({ 'special-attack': 'sp. atk', 'special-defense': 'sp. def' }[
      props.label
    ] || props.label)
);

const gradientId = computed(() => `#gradient-${props.label}`);
</script>

<style scoped lang="scss">
.circle-range {
  position: relative;
  height: 100%;
  width: 100%;

  &__values {
    position: absolute;
    @include position-center;
    display: flex;
    font-size: 20px;
    text-anchor: middle;
    white-space: nowrap;
    color: rgba(white, 0.6);
  }
  &__max-val {
    font-size: rem(12);
    opacity: 0.6;
    text-align: center;
  }
  label {
    position: absolute;
    width: 100%;
    bottom: 0px;
    left: 0;
    text-align: center;
    font-size: rem(14);
    text-transform: capitalize;
  }
}
.circular-chart {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  max-height: 250px;
  transform: rotate(-124deg);

  &__bg {
    fill: none;
    stroke: rgba($color: #000000, $alpha: 0.2);
    stroke-width: 3.5px;
    stroke-dasharray: 70;
    stroke-linecap: round;
  }
  &__fill {
    fill: none;
    stroke-width: 4;
    stroke-linecap: round;
    animation: progress 1s ease-out forwards;
    &--hp,
    &--js {
      stroke: url(#gradient-hp);
    }
    &--attack,
    &--html {
      stroke: url(#gradient-attack);
    }
    &--defense,
    &--css {
      stroke: url(#gradient-defense);
    }
    &--special-attack,
    &--creative {
      stroke: url(#gradient-special-attack);
    }
    &--special-defense,
    &--funny {
      stroke: url(#gradient-special-defense);
    }
    &--speed,
    &--cool {
      stroke: url(#gradient-speed);
    }
  }
  .stop1-hp {
    stop-color: $pokemon-fire-light;
  }
  .stop2-hp {
    stop-color: $pokemon-fire;
  }
  .stop1-attack {
    stop-color: $pokemon-fighting-light;
  }
  .stop2-attack {
    stop-color: $pokemon-fighting;
  }
  .stop1-defense {
    stop-color: $pokemon-electric-light;
  }
  .stop2-defense {
    stop-color: $pokemon-electric;
  }
  .stop1-special-attack {
    stop-color: $pokemon-water-light;
  }
  .stop2-special-attack {
    stop-color: $pokemon-water;
  }
  .stop1-special-defense {
    stop-color: $pokemon-grass-light;
  }
  .stop2-special-defense {
    stop-color: $pokemon-grass;
  }
  .stop1-speed {
    stop-color: $pokemon-fairy-light;
  }
  .stop2-speed {
    stop-color: $pokemon-fairy;
  }
}
@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}
</style>
