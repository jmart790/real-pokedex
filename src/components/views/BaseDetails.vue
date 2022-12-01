<template>
  <section class="base-details">
    <p v-if="isLoading">loading....</p>
    <template v-else>
      <h2>#{{ entryNumber }}</h2>
      <div class="base-details__card">
        <p class="base-details__copy" v-if="currentView === 'POKEMON'">
          <span v-if="description"> {{ description }}. </span> {{ flavorText }}
        </p>
        <p>Located {{ encounter?.toLowerCase() }} near {{ location }}</p>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import PokeAPI from 'pokeapi-typescript';
import { computed, ref, watch } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { useControlsStore } from '@/store/controls';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();

const { activePokemon } = storeToRefs(pokeStore);
const { currentView } = storeToRefs(controlsStore);

const isLoading = ref(false);
const description = ref<string>('');
const flavorText = ref<string>('');
const location = ref<string>('');
const encounter = ref<string>('');

// 1- description, location areas, id

const entryNumber = computed(() => {
  let num = String(activePokemon.value?.id || 0);
  while (num.length < 3) num = '0' + num;
  return num;
});

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
    .then(({ names }) => {
      const data = names?.find(({ language }) => language.name == 'en');
      encounter.value = data?.name || '';
    })
    .catch((e) => console.log({ e }));
}

async function getData(payload: number) {
  if (!payload) return;
  isLoading.value = true;
  await Promise.all([
    getDescription(payload),
    getSpecies(payload),
    getLocation(payload),
    getEncounter(payload)
  ]);
  isLoading.value = false;
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
  padding: gap(2) gap(4);
  // grid-template-rows: 1fr auto;
  @include cool-bg;

  &__card {
    padding: gap(1) gap(2);
    color: $dark-grey;
    border-radius: 5px;
    @include frost-bg;
  }

  h2 {
    justify-self: end;
    display: flex;
    align-items: center;
    border-radius: 50%;
    text-align: right;
    margin-bottom: gap(2);
    padding: gap(2);
    color: $dark-grey;
    font-weight: 700;
    font-size: rem(24);
    width: fit-content;
    aspect-ratio: 1 / 1;
    background-color: rgba($pokemon-grass-light, 0.75);
  }
  &__copy {
    margin-bottom: gap(4);
  }
}
</style>
