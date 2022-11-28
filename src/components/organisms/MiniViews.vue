<template>
  <section class="mini-views">
    <section class="mini-views__windows">
      <Window variant="sm">
        <p class="mini-views__copy">
          {{ copy[currentView]?.left }}
        </p>
      </Window>
      <Window variant="sm">
        <p class="mini-views__copy">
          {{ copy[currentView]?.right }}
        </p>
      </Window>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { useControlsStore } from '@/store/controls';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();

const { genNum, activePokemon, pokemonListLength } = storeToRefs(pokeStore);
const { currentView } = storeToRefs(controlsStore);

function hectogramsToPounds(num: number) {
  const hectoToPound = 0.220462;
  return (num * hectoToPound).toFixed(1);
}

function decimetersToFeet(num: number) {
  const decimeterToFeet = 0.328084;
  const [feet, inches] = (num * decimeterToFeet).toFixed(2).split('.');
  const trueInches = ((12 / Number(inches)) * 10).toFixed(0);
  return `${feet}' ${trueInches}"`;
}

const copy = computed(() => {
  const height = decimetersToFeet(activePokemon?.value?.height || 0);
  const weight = hectogramsToPounds(activePokemon?.value?.weight || 0);
  return {
    LIST: {
      left: `Generation: ${genNum.value}`,
      right: `Pokemon: ${pokemonListLength.value}`
    },
    POKEMON: {
      left: `Height: ${height} ft`,
      right: `Weight: ${weight} lbs`
    }
  };
});
</script>

<style scoped lang="scss">
.mini-views {
  margin: 25px 0;
  &__windows {
    margin-top: 120px;
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }
  &__copy {
    width: 100%;
    padding-left: gap(4);
    color: $off-white;
  }
}
</style>
