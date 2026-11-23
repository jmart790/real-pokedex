import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import PokeAPI from 'pokeapi-typescript';
import type { IGeneration, IPokemon } from 'pokeapi-typescript';
import type { IPokemonSpritesUpdated } from '@/types/index';
import { useLoading } from '@/composables/useLoading';

interface IPokemonListItem {
  name: string;
  id: number;
  type?: string;
  height?: number;
}

type TTileInfo = Map<number, { type?: string; height: number }>;

const GRAPHQL_URL = 'https://graphql.pokeapi.co/v1beta2';
const TILE_INFO_QUERY = `query ($gen: Int!) {
  pokemon(where: { pokemonspecy: { generation_id: { _eq: $gen } }, is_default: { _eq: true } }) {
    id
    height
    pokemontypes(where: { slot: { _eq: 1 } }) { type { name } }
  }
}`;

// One ~10KB request for the whole generation, instead of a ~400KB /pokemon/{id} request per tile.
// ponytail: GraphQL API is beta; if it fails, tiles still render (sprite + name) without type color.
async function getGenTileInfo(gen: number): Promise<TTileInfo> {
  try {
    const res = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: TILE_INFO_QUERY, variables: { gen } })
    });
    const { data } = await res.json();
    return new Map(
      data.pokemon.map((p: { id: number; height: number; pokemontypes: { type: { name: string } }[] }) => [
        p.id,
        { type: p.pokemontypes[0]?.type.name, height: p.height }
      ])
    );
  } catch (e) {
    console.log({ e });
    return new Map();
  }
}

function transformSprites(sprites: IPokemonSpritesUpdated) {
  if (!sprites) return null;
  const { versions, other } = sprites;
  const gifs = versions['generation-v']['black-white'].animated;

  const animated = {
    front: gifs?.front_default,
    back: gifs?.back_default
  };
  const animatedShiny = {
    front: gifs?.front_shiny,
    back: gifs?.back_shiny
  };
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
  const pokemonListLength = computed(() => generation.value?.pokemon_species.length);
  const hasError = ref(false);

  function createPokemonList(generation: IGeneration, tileInfo: TTileInfo) {
    return generation.pokemon_species
      .map(({ name, url }) => {
        const id = Number(url.split('/')[6]);
        return { name, id, ...tileInfo.get(id) };
      })
      .sort((a, b) => a.id - b.id);
  }

  async function getGen(genNum = 1) {
    await Promise.all([PokeAPI.Generaition.resolve(genNum), getGenTileInfo(genNum)])
      .then(([res, tileInfo]) => {
        generation.value = res;
        pokemonList.value = createPokemonList(res, tileInfo);
      })
      .catch((e) => console.log({ e }));
  }

  async function getPokemon(payload: string) {
    hasError.value = false;
    if (!payload) return;
    // Library caches by numeric id, so a string id ("6") would always miss the cache and refetch
    await PokeAPI.Pokemon.resolve(Number(payload) || payload)
      .then((res) => setActivePokemon(res))
      .catch((e) => {
        console.log({ e });
        hasError.value = true;
      });
  }

  const { isLoading, executeFn: getActivePokemon } = useLoading(getPokemon);
  const { isLoading: isGenLoading, executeFn: getGeneration } = useLoading(getGen);

  const activePokemon = ref<IPokemon>();
  const activePokemonId = computed(() => activePokemon.value?.id);
  const activePokemonName = computed(() => activePokemon.value?.name);
  const activePokemonPayload = ref<string>('');
  const activePokemonType = computed(() => activePokemon.value?.types[0]?.type?.name || '');
  const activePokemonMoves = computed(() => activePokemon.value?.moves || []);
  const activePokemonSprites = computed(() => transformSprites(activePokemon.value?.sprites as IPokemonSpritesUpdated));
  const activePokemonHeight = computed(() => activePokemon.value?.height || 0);

  function setActivePokemon(pokemon: IPokemon) {
    activePokemon.value = pokemon;
  }

  function setActivePokemonPayload(payload: string) {
    activePokemonPayload.value = payload;
  }

  return {
    isGenLoading,
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
    setActivePokemonPayload,
    activePokemonName,
    activePokemonPayload,
    activePokemonType,
    activePokemonId,
    activePokemonMoves,
    activePokemonSprites,
    activePokemonHeight
  };
});
