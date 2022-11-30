<template>
  <section class="base-details">
    <h2>#{{ activePokemon?.id }}</h2>
    <p class="base-details__copy" v-if="currentView === 'POKEMON'">
      {{ description }}. {{ flavorText }}
    </p>
    <p>{{ encounter }}, {{ location }}</p>
  </section>
</template>

<script setup lang="ts">
import PokeAPI from 'pokeapi-typescript';
import { ref, watch } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { useControlsStore } from '@/store/controls';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();

const { activePokemon } = storeToRefs(pokeStore);
const { currentView } = storeToRefs(controlsStore);

const description = ref<string>('');
const flavorText = ref<string>('');
const location = ref<string>('');
const encounter = ref<string>('');

// 1- description, location areas, id
// 2- types/ weak against
// 3- Moves learned by level up
// 4- moves learned by tm
// 4- base stats,
// 5- evolutions
// 6-
// 7-
// 8-
// 9-
// 10-

async function getSpecies(payload: number) {
  await PokeAPI.PokemonSpecies.resolve(payload)
    .then((res) => {
      flavorText.value =
        res?.flavor_text_entries?.find(({ language }) => language.name == 'en')
          ?.flavor_text || '';
    })
    .catch((e) => console.log({ e }));
}

async function getDescription(payload: number) {
  await PokeAPI.Characteristic.resolve(payload)
    .then((res) => {
      description.value = res?.descriptions.find(
        ({ language }) => language.name === 'en'
      )?.description;
    })
    .catch((e) => console.log({ e }));
}

async function getLocation(payload: number) {
  await PokeAPI.LocationArea.resolve(payload)
    .then((res) => {
      location.value = res.location.name.replace('-', ' ');
    })
    .catch((e) => console.log({ e }));
}

async function getEncounter(payload: number) {
  await PokeAPI.EncounterMethod.resolve(payload)
    .then((res) => {
      encounter.value =
        res.names.find(({ language }) => language.name == 'en')?.name || '';
    })
    .catch((e) => console.log({ e }));
}

async function getData(payload: number) {
  if (!payload) return;
  return await Promise.all([
    getDescription(payload),
    getSpecies(payload),
    getLocation(payload),
    getEncounter(payload)
  ]);
}

watch(
  activePokemon,
  (pokemon) => {
    const payload = pokemon?.id || 0;
    getData(payload);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.base-details {
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: $off-white;
  height: 100%;
  width: 100%;

  &__copy {
    padding: gap(2) gap(4);
    background: $pokemon-water-light;
    width: 100%;
  }
}
</style>
