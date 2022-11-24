import { defineStore } from "pinia";
import { ref, computed } from "vue";
import PokeAPI, { type IPokemon } from "pokeapi-typescript";
import type { IGeneration } from "pokeapi-typescript";

export const usePokeStore = defineStore("pokemon", () => {
  const generation = ref<IGeneration>();
  const genNum = computed(() => generation.value?.id);
  const pokemonList = computed(() => generation.value?.pokemon_species);
  const pokemonListLength = computed(
    () => generation.value?.pokemon_species.length
  );

  async function getGeneration(genNum = 1) {
    await PokeAPI.Generaition.resolve(genNum)
      .then((res) => (generation.value = res))
      .catch((e) => console.log({ e }));
  }

  const activePokemon = ref<IPokemon>();
  const activePokemonName = ref<string>("");

  function setActivePokemon(pokemon: IPokemon) {
    activePokemon.value = pokemon;
  }

  function setActivePokemonName(name: string) {
    console.log({ name });
    activePokemonName.value = name;
  }

  return {
    getGeneration,
    pokemonList,
    pokemonListLength,
    genNum,
    setActivePokemon,
    activePokemon,
    setActivePokemonName,
    activePokemonName,
  };
});
