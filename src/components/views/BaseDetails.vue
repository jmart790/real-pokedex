<template>
  <section class="base-details" :class="`base-details--${pokemonTypes[0]}`">
    <PikachuLoader v-if="isLoading" />

    <div v-else class="base-details__card">
      <section class="base-details__species-num">
        <p>{{ genus }}</p>
        <FrostCard>
          <p class="base-details__national-num">
            <span>#</span>{{ entryNumber }}
          </p>
        </FrostCard>
      </section>

      <section class="base-details__copy">
        <span class="base-details__copy-name">
          {{ activePokemon?.name }}
        </span>
        <template v-if="description">
          {{ description.toLowerCase() }}.
        </template>
        {{ flavorText }}
      </section>
      <p class="base-details__location">
        <span v-if="encounter && location">
          Located {{ encounter?.toLowerCase() }} near {{ location }}.
        </span>
      </p>

      <div class="base-details__types">
        <TypePill v-for="type in pokemonTypes" :key="type" :type="type" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PokeAPI from 'pokeapi-typescript';
import { computed, ref, watchEffect } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { useLoading } from '@/composables/useLoading';

const pokeStore = usePokeStore();
const { activePokemon } = storeToRefs(pokeStore);

const description = ref<string>('');
const flavorText = ref<string>('');
const genus = ref<string>('');
const location = ref<string>('');
const encounter = ref<string>('');

const { isLoading, executeFn } = useLoading(getData);

const entryNumber = computed(() => {
  let num = String(activePokemon.value?.id || 0);
  while (num.length < 3) num = '0' + num;
  return num;
});

const pokemonTypes = computed(() => {
  return activePokemon.value?.types.map(({ type }) => type.name) || ['normal'];
});

async function getSpecies(payload: number) {
  await PokeAPI.PokemonSpecies.resolve(payload)
    .then((res) => {
      flavorText.value =
        res?.flavor_text_entries?.find(({ language }) => language.name == 'en')
          ?.flavor_text || '';
      genus.value =
        res?.genera?.find(({ language }) => language.name == 'en')?.genus || '';
    })
    .catch((e) => console.log({ e }));
}

async function getDescription(payload: number) {
  await PokeAPI.Characteristic.resolve(payload)
    .then((res: any) => {
      description.value = res?.descriptions.find(
        ({ language }) => language.name === 'en'
      )?.description;
    })
    .catch(async (e) => console.log({ e }));
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
  await Promise.all([
    getDescription(payload),
    getSpecies(payload),
    getLocation(payload),
    getEncounter(payload)
  ]);
}

watchEffect(() => {
  const payload = activePokemon.value?.id || 0;
  executeFn(payload);
});
</script>

<style scoped lang="scss">
.base-details {
  display: grid;
  padding: gap(3) gap(4);
  @include cool-bg;

  &__card {
    height: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    color: white;
  }
  &__species-num {
    margin-bottom: gap(3);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__national-num {
    padding-inline: gap(4);
    display: flex;
    align-items: center;
    gap: gap(1);
    font-weight: 500;
    letter-spacing: 1px;
    span {
      font-size: rem(20);
    }
  }

  &__copy {
    margin-bottom: gap(3);
  }
  &__copy-name {
    text-transform: capitalize;
    font-size: rem(20);
    letter-spacing: 4px;
    line-height: 1;
    color: $primary;
    font-family: $secondary-font;
    font-weight: 400;
    text-shadow: 1px 1px 0px $secondary;
  }

  &__types {
    display: flex;
    gap: gap(2);
  }
}
</style>
