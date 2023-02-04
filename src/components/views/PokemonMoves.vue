<template>
  <article class="poke-moves">
    <PikachuLoader v-if="isLoading" />
    <ul v-else-if="!isLoading && movesList?.length">
      <li v-for="move in movesList" :key="`pokemon-move--${move.name}`">
        <FrostCard>
          <div class="poke-moves__move">
            <Icon
              class="poke-moves__icon"
              :name="`type-${move.type.name}`"
              :class="`poke-moves__icon--${move.type.name}`"
            />
            <p class="poke-moves__move-name">
              {{ move.name.replace('-', ' ') }}
            </p>
            <p v-if="filterBy === 'level-up'">lvl. {{ move.levelLearnedAt }}</p>
            <p v-else>{{ move.machineLearnedBy }}</p>
            <p>{{ move.damage_class.name }}</p>
            <p style="display: flex; alignitems: center; gap: 4px">
              {{ move.power || 0 }}
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
import { ref, computed, watchEffect } from 'vue';
import PokeAPI, { type IMove, type IPokemonMove } from 'pokeapi-typescript';
import { useLoading } from '@/composables/useLoading';

const { isLoading, executeFn } = useLoading(getMoves);

interface IPokeMove extends IMove {
  levelLearnedAt: number;
  machineLearnedBy: string;
}

const props = defineProps<{
  filterBy: 'level-up' | 'machine';
}>();

const pokeStore = usePokeStore();
const movesList = ref<IPokeMove[]>();
// const isLoading = ref(false);

const { activePokemonMoves, genNum } = storeToRefs(pokeStore);
const genNums = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];
const genName = computed(() => `generation-${genNums[genNum.value - 1]}`);

function filterActivePokemonMoves(moves: IPokemonMove[], filterBy: string) {
  return moves.filter(
    (move) => move.version_group_details[0].move_learn_method.name === filterBy
  );
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

function filterAndSort(moves: IPokeMove[], filterBy: string) {
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

async function getMoves(pokemonMoves: IPokemonMove[], filterBy) {
  if (!pokemonMoves?.length) return;
  try {
    const filteredMoves = filterActivePokemonMoves(pokemonMoves, filterBy);
    const moves = await Promise.all(
      filteredMoves.map(async (move) => await getMove(move))
    );
    movesList.value = filterAndSort(moves as IPokeMove[], filterBy);
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
