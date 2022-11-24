<template>
  <section class="pokemon-details">
    {{ pokemon?.name }}
    <img :src="spriteImage" :alt="`${pokemon?.name} sprite`" />
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import PokeAPI, { type IPokemon } from "pokeapi-typescript";
import { usePokeStore } from "@/store/pokemon";
const pokeStore = usePokeStore();
const { activePokemonName } = storeToRefs(pokeStore);

const pokemon = ref<IPokemon>();
const spriteImage = computed(
  () =>
    pokemon?.value?.sprites?.versions["generation-v"]["black-white"].animated
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
  img {
    height: 200px;
    width: 200px;
  }
}
</style>
