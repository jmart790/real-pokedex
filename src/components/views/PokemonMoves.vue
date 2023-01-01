<template>
  <article class="poke-moves">
    <h1 v-if="isLoading">loading...</h1>
    <ul v-else-if="!isLoading && movesList?.length">
      <li v-for="move in movesList" :key="`pokemon-move--${move.name}`">
        <FrostCard>
          <p class="poke-moves__move-name">
            {{ move.name }}
          </p>
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

const { activePokemon } = storeToRefs(pokeStore);

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
  movesList.value = moves;
  isLoading.value = false;
}

watch(() => activePokemon.value?.id, getMoves, { immediate: true });
</script>

<style scoped lang="scss">
.poke-moves {
  @include cool-bg;
  padding: $medium-window-padding;
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: gap(2);
  }
  &__move-name {
    padding: gap(1) gap(5);
    text-transform: capitalize;
    color: $off-white;
  }
}
</style>
