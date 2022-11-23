import { defineStore } from "pinia";
import { ref, computed } from "vue";
import PokeAPI from "pokeapi-typescript";
import type { IGeneration } from "pokeapi-typescript";

export const usePokeStore = defineStore("pokemon", () => {
  const generation = ref<IGeneration>();
  const pokemonList = computed(() => generation.value?.pokemon_species);
  const pokemonListLength = computed(() => generation.value?.pokemon_species.length);
  const genNum = computed(() => generation.value?.id);

  async function getGeneration(genNum = 1) {
    await PokeAPI.Generaition.resolve(genNum)
      .then((res) => (generation.value = res))
      .catch((e) => console.log({ e }));
  }

  return { getGeneration, pokemonList, pokemonListLength, genNum };
});
