<template>
  <section class="base-stats">
    <PikachuLoader v-if="isLoading" />
    <ErrorCard v-else-if="hasError && !isYoshView" />
    <div class="base-stats__cards" v-else>
      <FrostCard v-for="stat in stats" :key="`base-stat-${stat.label}`">
        <div class="base-stats__card">
          <CircleRange :label="stat.label" :max="stat.max" :base="stat.base" />
        </div>
      </FrostCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { useControlsStore } from '@/store/controls';

const controlsStore = useControlsStore();
const { isYoshView } = storeToRefs(controlsStore);

const pokeStore = usePokeStore();

const { activePokemon, isLoading, hasError } = storeToRefs(pokeStore);

const yoshStats = [
  { label: 'js', max: 500, base: 305 },
  { label: 'html', max: 1200, base: 786 },
  { label: 'css', max: 1200, base: 808 },
  { label: 'creative', max: 700, base: 444 },
  { label: 'funny', max: 500, base: 200 },
  { label: 'cool', max: 500, base: 250 }
];

const stats = computed(() => {
  const isYosh = isYoshView.value;
  if (isYosh) return yoshStats;
  return activePokemon.value?.stats.map(({ stat, base_stat }) => {
    return {
      label: stat.name,
      base: base_stat,
      max: getMaxStat(base_stat, stat.name === 'hp')
    };
  });
});

/**
 *
 * @param stat is baseStat
 * @param isHp
 * @description trying to calculate the min of maxt stat so the range input looks more or less like pomekemondb.net
 * @resourced from https://pokemondb.net/pokebase/6506/there-formula-for-working-pokemons-highest-possible-stats
 */
function getMaxStat(stat: number, isHp = false) {
  let max = stat;
  if (isHp) max = stat * 2 + 110;
  else max = stat * 2 - 5; // temp. need to find the real formula
  return Math.floor(max);
}
</script>

<style scoped lang="scss">
.base-stats {
  @include cool-bg;
  padding: $medium-window-padding;
  &__cards {
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: gap(2);
  }
  &__card {
    height: 100%;
    padding: gap(2);
    color: white;
  }
}
</style>
