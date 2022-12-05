<template>
  <section class="base-details" :class="`base-details--${pokemonTypes[0]}`">
    <p v-if="isLoading">loading....</p>
    <template v-else>
      <div class="base-details__card">
        <section class="base-details__species-num">
          <p>{{ genus }}</p>
          <p class="base-details__national-num">{{ entryNumber }}</p>
        </section>

        <section class="base-details__copy">
          <template v-if="description">
            <span class="base-details__copy-name">
              {{ activePokemon?.name }}
            </span>
            {{ description.toLowerCase() }}.
          </template>
          {{ flavorText }}
        </section>
        <p class="base-details__location">
          Located {{ encounter?.toLowerCase() }} near {{ location }}.
        </p>

        <div class="base-details__types">
          <TypePill v-for="type in pokemonTypes" :key="type" :type="type" />
        </div>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import PokeAPI from 'pokeapi-typescript';
import { computed, ref, watch } from 'vue';
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';

const pokeStore = usePokeStore();

const { activePokemon } = storeToRefs(pokeStore);

const isLoading = ref(false);
const description = ref<string>('');
const flavorText = ref<string>('');
const genus = ref<string>('');
const location = ref<string>('');
const encounter = ref<string>('');

// 1- description, location areas, id

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
  padding: gap(3) gap(4);
  @include cool-bg;

  &__card {
    display: grid;
    grid-template-rows: auto auto 1fr auto;
    padding: $card-padding;
    color: white;
    border-radius: $cool-border-radius;
    @include frost-bg;
  }
  &__species-num {
    margin-bottom: gap(4);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__national-num {
    padding: gap(1) gap(3);
    background-color: $pokemon-grass-light;
    color: $pokemon-grass-dark;
    border-radius: $cool-border-radius;
    font-weight: 500;
  }

  &__copy {
    margin-bottom: gap(3);
  }
  &__copy-name {
    text-transform: capitalize;
    color: $pokemon-grass-light;
    font-size: rem(18);
    font-weight: bold;
    letter-spacing: 1px;
    text-shadow: 2px 2px 8px rgba(black, 0.2);
  }

  &__types {
    display: flex;
    gap: gap(2);
  }

  @mixin type-styles($light, $dark) {
    .base-details__national-num {
      background: $light;
      color: $dark;
    }
    .base-details__copy-name {
      color: $light;
    }
  }

  &--fire {
    @include type-styles($pokemon-fire-light, $pokemon-fire-dark);
  }
  &--grass {
    @include type-styles($pokemon-grass-light, $pokemon-grass-dark);
  }
  &--water {
    @include type-styles($pokemon-water-light, $pokemon-water-dark);
  }
  &--normal {
    @include type-styles($pokemon-normal-light, $pokemon-normal-dark);
  }
  &--poison {
    @include type-styles($pokemon-poison-light, $pokemon-poison-dark);
  }
  &--bug {
    @include type-styles($pokemon-bug-light, $pokemon-bug-dark);
  }
  &--ground {
    @include type-styles($pokemon-ground-light, $pokemon-ground-dark);
  }
  &--fighting {
    @include type-styles($pokemon-fighting-light, $pokemon-fighting-dark);
  }
  &--rock {
    @include type-styles($pokemon-rock-light, $pokemon-rock-dark);
  }
  &--electric {
    @include type-styles($pokemon-electric-light, $pokemon-electric-dark);
  }
  &--fairy {
    @include type-styles($pokemon-fairy-light, $pokemon-fairy-dark);
  }
  &--psychic {
    @include type-styles($pokemon-psychic-light, $pokemon-psychic-dark);
  }
  &--ghost {
    @include type-styles($pokemon-ghost-light, $pokemon-ghost-dark);
  }
  &--ice {
    @include type-styles($pokemon-ice-light, $pokemon-ice-dark);
  }
  &--dragon {
    @include type-styles($pokemon-dragon-light, $pokemon-dragon-dark);
  }
  &--steel {
    @include type-styles($pokemon-steel-light, $pokemon-steel-dark);
  }
  &--flying {
    @include type-styles($pokemon-flying-light, $pokemon-flying-dark);
  }
}
</style>
