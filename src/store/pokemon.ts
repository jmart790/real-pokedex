import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import PokeAPI from 'pokeapi-typescript';
import type { IGeneration, IPokemon } from 'pokeapi-typescript';
import type { IPokemonSpritesUpdated } from '@/types/index';
import { useLoading } from '@/composables/useLoading';

interface IPokemonListItem {
  name: string;
  id: number;
  isLoaded: boolean;
}

function transformSprites(sprites: IPokemonSpritesUpdated) {
  if (!sprites) return null;
  const { versions, other } = sprites;
  const gifs = versions['generation-v']['black-white'].animated;
  const animated = { front: gifs?.front_default, back: gifs?.back_default };
  const animatedShiny = { front: gifs?.front_shiny, back: gifs?.back_shiny };
  const artwork = {
    front: other['official-artwork']?.front_default,
    back: null
  };
  const artworkShiny = {
    front: other['official-artwork']?.front_shiny,
    back: null
  };
  return { animated, animatedShiny, artwork, artworkShiny };
}

export const usePokeStore = defineStore('pokemon', () => {
  const generation = ref<IGeneration>();
  const genNum = computed(() => generation.value?.id || 1);
  const region = computed(() => generation.value?.main_region.name);
  const pokemonList = ref<IPokemonListItem[]>();
  const pokemonListLength = computed(
    () => generation.value?.pokemon_species.length
  );
  const hasError = ref(false);
  const isGenLoading = ref(false);

  function createPokemonList(generation: IGeneration) {
    const preSortedList = generation?.pokemon_species.map(({ name, url }) => {
      const id = Number(url.split('/')[6]);
      return { name, id, isLoaded: false };
    });
    const sortedList = preSortedList.sort((a, b) => a.id - b.id);
    return sortedList.map((pokemon, index) => ({
      ...pokemon,
      isLoaded: index < 20
    }));
  }

  async function getGeneration(genNum = 1) {
    isGenLoading.value = true;
    await PokeAPI.Generaition.resolve(genNum)
      .then((res) => {
        generation.value = res;
        pokemonList.value = createPokemonList(res);
      })
      .catch((e) => console.log({ e }));
    isGenLoading.value = false;
  }

  async function getActivePokemon(payload: string) {
    hasError.value = false;
    if (!payload) return;
    await PokeAPI.Pokemon.resolve(payload)
      .then((res) => setActivePokemon(res))
      .catch((e) => {
        console.log({ e });
        hasError.value = true;
      });
  }

  const { isLoading, executeFn } = useLoading(getActivePokemon);

  const activePokemon = ref<IPokemon>();
  const activePokemonId = computed(() => activePokemon.value?.id);
  const activePokemonName = computed(() => activePokemon.value?.name);
  const activePokemonPayload = ref<string>('');
  const activePokemonType = computed(
    () => activePokemon.value?.types[0]?.type?.name || ''
  );
  const activePokemonMoves = computed(() => activePokemon.value?.moves || []);
  const activePokemonSprites = computed(() =>
    transformSprites(activePokemon.value?.sprites as IPokemonSpritesUpdated)
  );
  const activePokemonHeight = computed(() => activePokemon.value?.height || 0);

  function setActivePokemon(pokemon: IPokemon) {
    activePokemon.value = pokemon;
  }

  function setActivePokemonPayload(payload: string) {
    activePokemonPayload.value = payload;
  }

  function setPokemonLoaded(index: number) {
    if (!pokemonList.value?.length || index >= pokemonList.value?.length)
      return;
    pokemonList.value[index].isLoaded = true;
  }

  return {
    isGenLoading,
    getGeneration,
    pokemonList,
    pokemonListLength,
    genNum,
    region,
    getActivePokemon: executeFn,
    isLoading,
    hasError,
    setActivePokemon,
    activePokemon,
    setActivePokemonPayload,
    activePokemonName,
    activePokemonPayload,
    activePokemonType,
    activePokemonId,
    setPokemonLoaded,
    activePokemonMoves,
    activePokemonSprites,
    activePokemonHeight
  };
});
