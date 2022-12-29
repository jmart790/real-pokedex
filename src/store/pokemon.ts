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
  const genNum = computed(() => generation.value?.id);
  const region = computed(() => generation.value?.main_region.name);
  const pokemonList = ref<IPokemonListItem[]>();
  const pokemonListLength = computed(
    () => generation.value?.pokemon_species.length
  );

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

  const activePokemon = ref<IPokemon>();
  const activePokemonId = computed(() => activePokemon.value?.id);
  const activePokemonName = ref<string>('');

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
    setActivePokemon,
    activePokemon,
    setActivePokemonName,
    activePokemonName,
    activePokemonId,
    setPokemonLoaded
  };
});
