<template>
  <article class="poke-moves">
    <h1 v-if="isLoading">loading...</h1>
    <ul v-else-if="!isLoading && movesList?.length">
      <li v-for="move in movesList" :key="`pokemon-move--${move.name}`">
        <FrostCard>
          <div class="poke-moves__move">
            <Icon
              class="poke-moves__icon"
              :name="`type-${move.type.name}`"
              :class="`poke-moves__icon--${move.type.name}`"
            />
            <!-- <TypePill mode="icon" :type="move.type.name" /> -->
            <p class="poke-moves__move-name">
              {{ move.name.replace('-', ' ') }}
            </p>
            <p style="display: flex; alignitems: center; gap: 4px">
              {{ move.power || 0 }}
              <Icon name="swords-icon" class="poke-moves__sword-icon" />
            </p>
            <p>{{ move.damage_class.name }}</p>
          </div>
        </FrostCard>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { watch, ref } from 'vue';
import PokeAPI, { type IMove } from 'pokeapi-typescript';

const pokeStore = usePokeStore();
const movesList = ref<IMove[]>();
const isLoading = ref(false);

const { activePokemon, genNum } = storeToRefs(pokeStore);

async function getMoves() {
  isLoading.value = true;
  const activePokemonMoves = activePokemon.value?.moves;
  if (!activePokemonMoves) return;
  const levelUpMoves = activePokemonMoves.filter((move) => {
    return move.version_group_details[0].move_learn_method.name === 'level-up';
  });
  if (!levelUpMoves) return;
  const moves: IMove[] = [];
  for (const { move } of levelUpMoves) {
    const response = await PokeAPI.Move.resolve(move.name);
    moves.push(response);
  }
  const genNums = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'];
  const genName = `generation-${genNums[genNum.value - 1]}`;
  console.log(genNum.value);
  console.log({ genName });
  movesList.value = moves
    .filter(({ generation }) => generation.name === genName)
    .slice(0, 8);
  isLoading.value = false;
}

watch(() => activePokemon.value?.id, getMoves, { immediate: true });
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
    padding: 1px gap(4);
    display: grid;
    grid-template-columns: auto 2fr 1fr 1fr;
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
