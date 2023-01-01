<template>
  <section class="base-stats">
    <FrostCard
      class="base-stats__card"
      v-for="(stat, key) in stats"
      :key="`base-stat-${key}`"
    >
      <CircleRange :label="key" :max="stat.max" :base="stat.base" />
    </FrostCard>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';

const pokeStore = usePokeStore();

const { activePokemon } = storeToRefs(pokeStore);

const stats = computed(() => {
  return activePokemon.value?.stats.reduce(
    (acc, { stat, base_stat }) => {
      return {
        ...acc,
        [stat.name]: {
          base: base_stat,
          max: getMaxStat(base_stat, stat.name === 'hp')
        }
      };
    },
    { hp: { base: 50, max: 100 } }
  );
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
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: gap(2);

  &__card {
    padding: gap(2);
    color: white;
  }
}
</style>
