<template>
  <section class="pokemon-details">
    {{ pokemon?.name }}
    <img :src="spriteImage" :alt="`${pokemon?.name} sprite`" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import PokeAPI, { type IPokemon } from 'pokeapi-typescript';
import { usePokeStore } from '@/store/pokemon';
const pokeStore = usePokeStore();
const { activePokemonName } = storeToRefs(pokeStore);

const pokemon = ref<IPokemon>();
const spriteImage = computed(
  () =>
    pokemon?.value?.sprites?.versions['generation-v']['black-white'].animated
      .front_default
);

onMounted(async () => {
  const payload = activePokemonName.value;
  if (!payload) return;
  await PokeAPI.Pokemon.resolve(payload).then((res) => {
    pokemon.value = res;
  });
});
</script>

<style scoped lang="scss">
.pokemon-details {
  position: relative;
  height: 100%;
  width: 100%;
  background-repeat: round;
  background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83m36e-3b58ca48-fe8a-456e-9ffc-a5a84eca6613.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDgzbTM2ZS0zYjU4Y2E0OC1mZThhLTQ1NmUtOWZmYy1hNWE4NGVjYTY2MTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.jOpoPaOypPatcb4k7flznTP9YiwUEX2q2BKoeWUPU74');
  img {
    position: absolute;
    bottom: 20%;
    right: 10%;
    height: 150px;
    width: 150px;
  }
}
</style>
