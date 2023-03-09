<template>
  <section class="mini-views">
    <section class="mini-views__windows">
      <Window variant="sm">
        <p class="mini-views__copy">
          {{ copy?.left }}
        </p>
      </Window>
      <Window variant="sm">
        <p class="mini-views__copy">
          {{ copy?.right }}
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
const { mainView } = storeToRefs(controlsStore);

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
  if (['OFF', 'INTRO'].includes(mainView.value)) return null;
  const height = decimetersToFeet(activePokemon?.value?.height || 0);
  const weight = hectogramsToPounds(activePokemon?.value?.weight || 0);
  const options = {
    LIST: {
      left: `Generation: ${genNum.value}`,
      right: `Pokemon: ${pokemonListLength.value}`
    },
    POKEMON: {
      left: `Height: ${height} ft`,
      right: `Weight: ${weight} lbs`
    },
    YOSH: {
      left: "Height: 6'1 ft",
      right: 'Weight: Nunya'
    }
  };
  const fallback = { left: 'Version: 1', right: 'Made with Vue 💚' };
  return options[mainView.value] || fallback;
});
</script>

<style scoped lang="scss">
.mini-views {
  margin: 25px 0;
  &__windows {
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
