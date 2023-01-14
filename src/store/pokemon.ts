import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import PokeAPI, { type IPokemon } from 'pokeapi-typescript';
import type { IGeneration } from 'pokeapi-typescript';

interface IPokemonListItem {
  name: string;
  isLoaded: boolean;
}
export const usePokeStore = defineStore('pokemon', () => {
  const generation = ref<IGeneration>();
  const genNum = computed(() => generation.value?.id || 1);
  const region = computed(() => generation.value?.main_region.name);
  const pokemonList = ref<IPokemonListItem[]>();
  const pokemonListLength = computed(
    () => generation.value?.pokemon_species.length
  );
  const isLoading = ref(false);
  const hasError = ref(false);

  async function getGeneration(genNum = 1) {
    await PokeAPI.Generaition.resolve(genNum)
      .then((res) => {
        generation.value = res;
        pokemonList.value = generation.value?.pokemon_species.map(
          ({ name }, index) => ({ name, isLoaded: index <= 20 })
        );
      })
      .catch((e) => console.log({ e }));
  }

  async function getActivePokemon(payload: string) {
    hasError.value = false;
    if (!payload) return;
    isLoading.value = true;
    await PokeAPI.Pokemon.resolve(payload)
      .then((res) => setActivePokemon(res))
      .catch((e) => {
        console.log({ e });
        hasError.value = true;
      });
    isLoading.value = false;
  }

  const activePokemon = ref<IPokemon>();
  const activePokemonId = computed(() => activePokemon.value?.id);
  const activePokemonName = ref<string>('');
  const activePokemonType = computed(
    () => activePokemon.value?.types[0]?.type?.name || ''
  );
  const activePokemonMoves = computed(() => activePokemon.value?.moves || []);

  function setActivePokemon(pokemon: IPokemon) {
    activePokemon.value = pokemon;
  }

  function setActivePokemonName(name: string) {
    console.log({ name });
    activePokemonName.value = name;
  }

  function setPokemonLoaded(index: number) {
    if (!pokemonList.value?.length) return;
    pokemonList.value[index].isLoaded = true;
  }

  return {
    getGeneration,
    pokemonList,
    pokemonListLength,
    genNum,
    region,
    getActivePokemon,
    isLoading,
    hasError,
    setActivePokemon,
    activePokemon,
    setActivePokemonName,
    activePokemonName,
    activePokemonType,
    activePokemonId,
    setPokemonLoaded,
    activePokemonMoves
  };
});
