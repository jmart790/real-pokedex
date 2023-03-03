<template>
  <article class="poke-moves">
    <PikachuLoader v-if="isLoading" />
    <ul v-else-if="!isLoading && movesList?.length">
      <li v-for="move in movesList" :key="`pokemon-move--${move.name}`">
        <FrostCard>
          <div class="poke-moves__move">
            <Icon class="poke-moves__icon" :name="`type-${move.type}`" :class="`poke-moves__icon--${move.type}`" />
            <p class="poke-moves__move-name">
              {{ move.name }}
            </p>
            <p v-if="filterBy === 'level-up'">lvl. {{ move.levelLearnedAt }}</p>
            <p v-else style="text-transform: uppercase">{{ move.machineLearnedBy }}</p>
            <p>{{ move.damageClass }}</p>
            <p style="display: flex; alignitems: center; gap: 4px">
              {{ move.power }}
              <Icon name="swords-icon" class="poke-moves__sword-icon" />
            </p>
          </div>
        </FrostCard>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';
import PokeAPI, { type IMove, type IPokemonMove } from 'pokeapi-typescript';
import { useLoading } from '@/composables/useLoading';

import { useControlsStore } from '@/store/controls';

const controlsStore = useControlsStore();
const { isYoshView } = storeToRefs(controlsStore);

const { isLoading, executeFn } = useLoading(getMoves);

const yoshMoves = {
  'level-up': [
    {
      name: 'Make Coffee',
      type: 'ground',
      levelLearnedAt: 20,
      damageClass: 'status',
      machineLearnedBy: '',
      power: 0
    },
    {
      name: 'Workout',
      type: 'fighting',
      levelLearnedAt: 21,
      damageClass: 'physical',
      machineLearnedBy: '',
      power: 60
    },
    {
      name: 'Pay bills',
      type: 'dark',
      levelLearnedAt: 18,
      damageClass: 'status',
      machineLearnedBy: '',
      power: 0
    },
    {
      name: 'Repot Plant',
      type: 'grass',
      levelLearnedAt: 27,
      damageClass: 'physical',
      machineLearnedBy: '',
      power: 75
    },
    {
      name: 'Inner Chi',
      type: 'dragon',
      levelLearnedAt: 29,
      damageClass: 'status',
      machineLearnedBy: '',
      power: 0
    },
    {
      name: 'Reset Desk',
      type: 'psychic',
      levelLearnedAt: 30,
      damageClass: 'physical',
      machineLearnedBy: '',
      power: 60
    },
    {
      name: 'daddy time',
      type: 'dragon',
      levelLearnedAt: 34,
      damageClass: 'physical',
      machineLearnedBy: '',
      power: 100
    }
  ],
  machine: [
    {
      name: 'readable code',
      type: 'fairy',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'js01',
      power: 90
    },
    {
      name: 'organized sass',
      type: 'electric',
      levelLearnedAt: 0,
      damageClass: 'status',
      machineLearnedBy: 'scss',
      power: 0
    },
    {
      name: 'Semantic html',
      type: 'dragon',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'html',
      power: 100
    },
    {
      name: 'script setup',
      type: 'dragon',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'vue3',
      power: 100
    },
    {
      name: 'cool app',
      type: 'dragon',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'js02',
      power: 100
    },
    {
      name: 'mentor',
      type: 'fairy',
      levelLearnedAt: 0,
      damageClass: 'status',
      machineLearnedBy: 'dm01',
      power: 0
    },
    {
      name: 'documentation',
      type: 'dragon',
      levelLearnedAt: 0,
      damageClass: 'physical',
      machineLearnedBy: 'js04',
      power: 100
    },
  ]
};

interface IPokeMove extends IMove {
  levelLearnedAt: number;
  machineLearnedBy: string;
}

interface IMoveListItem {
  name: string;
  type: string;
  levelLearnedAt: number;
  damageClass: string;
  machineLearnedBy: string;
  power: number;
}

const props = defineProps<{
  filterBy: 'level-up' | 'machine';
}>();

const pokeStore = usePokeStore();
const movesList = ref<IMoveListItem[]>();

const { activePokemonMoves } = storeToRefs(pokeStore);

function filterActivePokemonMoves(moves: IPokemonMove[], filterBy: string) {
  return moves.filter((move) => move.version_group_details[0].move_learn_method.name === filterBy);
}

async function getMachineLearnedBy({ machines }: IMove): Promise<string> {
  if (!machines.length) return '';
  // todo: filter by current generation
  const urlSplit = machines[0].machine.url.split('/');
  // we know the id is in this position because the url is always structured the same
  const payload = Number(urlSplit[6]);
  let machine = '';
  try {
    machine = (await PokeAPI.Machine.resolve(payload)).item.name;
  } catch (e) {
    console.log({ e });
  }
  return machine;
}

async function getMove({ move, version_group_details }: IPokemonMove) {
  const levelLearnedAt = version_group_details[0]?.level_learned_at || 0;
  return await PokeAPI.Move.resolve(move.name)
    .then(async (res) => {
      const machineLearnedBy = await getMachineLearnedBy(res);
      return { ...res, levelLearnedAt, machineLearnedBy };
    })
    .catch((e) => {
      console.log({ e });
      return null;
    });
}

function transformMoves(moves: IPokeMove[]) {
  return moves.map((move) => ({
    name: move.name.replace('-', ' '),
    type: move.type.name,
    levelLearnedAt: move.levelLearnedAt,
    damageClass: move.damage_class.name,
    machineLearnedBy: move.machineLearnedBy,
    power: move?.power || 0
  }));
}

function sortMoves(moves: IPokeMove[], filterBy: string) {
  return moves
    .filter(Boolean)
    .sort((a, b) => {
      if (filterBy === 'machine') {
        return a.machineLearnedBy > b.machineLearnedBy ? 1 : -1;
      } else {
        return a.levelLearnedAt - b.levelLearnedAt;
      }
    })
    .slice(0, 7);
}

async function getMoves(pokemonMoves: IPokemonMove[], filterBy: string) {
  if (isYoshView.value) movesList.value = yoshMoves[filterBy];
  else if (!pokemonMoves?.length) return;
  else
    try {
      const filteredMoves = filterActivePokemonMoves(pokemonMoves, filterBy);
      const moves = await Promise.all(filteredMoves.map(async (move) => await getMove(move)));
      const sortedMoves = sortMoves(moves as IPokeMove[], filterBy);
      const transformedMoves = transformMoves(sortedMoves);
      movesList.value = transformedMoves;
    } catch (e) {
      console.log({ e });
    }
}

watchEffect(() => executeFn(activePokemonMoves.value, props.filterBy));
</script>

<style scoped lang="scss">
.poke-moves {
  @include cool-bg;
  padding: $medium-window-padding;
  ul {
    display: grid;
    gap: gap(2);
  }
  &__move {
    height: min-content;
    padding: 1px gap(4);
    display: grid;
    grid-template-columns: 7% 35% 18% 20% 15%;
    align-items: center;
    gap: gap(2);
    color: $off-white;
    text-transform: capitalize;
    line-height: 1;
  }
  &__move-name {
  }
  &__sword-icon {
    height: 14px;
    fill: $off-white;
  }
  &__icon {
    height: 22px;
    background-color: $off-white;
    border-radius: $rounded-circle;
    &--fire {
      fill: $pokemon-fire;
      background: $pokemon-fire-light;
    }
    &--grass {
      fill: $pokemon-grass;
      background: $pokemon-grass-light;
    }
    &--water {
      fill: $pokemon-water;
      background: $pokemon-water-light;
    }
    &--normal {
      fill: $pokemon-normal;
      background: $pokemon-normal-light;
    }
    &--poison {
      fill: $pokemon-poison;
      background: $pokemon-poison-light;
    }
    &--bug {
      fill: $pokemon-bug;
      background: $pokemon-bug-light;
    }
    &--ground {
      fill: $pokemon-ground;
      background: $pokemon-ground-light;
    }
    &--fighting {
      fill: $pokemon-fighting;
      background: $pokemon-fighting-light;
    }
    &--rock {
      fill: $pokemon-rock;
      background: $pokemon-rock-light;
    }
    &--electric {
      fill: $pokemon-electric;
      background: $pokemon-electric-light;
    }
    &--fairy {
      fill: $pokemon-fairy;
      background: $pokemon-fairy-light;
    }
    &--psychic {
      fill: $pokemon-psychic;
      background: $pokemon-psychic-light;
    }
    &--ghost {
      fill: $pokemon-ghost;
      background: $pokemon-ghost-light;
    }
    &--ice {
      fill: $pokemon-ice;
      background: $pokemon-ice-light;
    }
    &--dragon {
      fill: $pokemon-dragon;
      background: $pokemon-dragon-light;
    }
    &--steel {
      fill: $pokemon-steel;
      background: $pokemon-steel-light;
    }
    &--flying {
      fill: $pokemon-flying;
      background: $pokemon-flying-light;
    }
    &--dark {
      fill: $pokemon-dark;
      background: $pokemon-dark-light;
    }
  }
}
</style>
