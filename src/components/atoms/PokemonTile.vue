<template>
  <article
    class="pokemon-tile"
    :class="[
      {
        'pokemon-tile--active': isActive,
      },
      `pokemon-tile--${pokemonType}`,
    ]"
  >
    <div class="pokemon-tile__sprite">
      <img :src="spriteImage" alt="pokemon sprite" />
    </div>
    {{ name }}
  </article>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import PokeAPI, { type IPokemon } from "pokeapi-typescript";

interface IPokemonTile {
  name: string;
  isActive: boolean;
}
const props = defineProps<IPokemonTile>();
const pokemon = ref<IPokemon>();
const spriteImage = computed(() => pokemon?.value?.sprites?.front_default);
const pokemonType = computed(() => pokemon?.value?.types[0].type.name);

onMounted(async () => {
  await PokeAPI.Pokemon.resolve(props.name).then((res) => {
    pokemon.value = res;
  });
});
</script>

<style scoped lang="scss">
.pokemon-tile {
  border: 4px solid $lightest-grey;
  border-radius: 30px 0 30px 0;
  display: flex;
  align-items: center;
  gap: 12px;
  text-transform: capitalize;
  background: $lightest-grey;
  color: $medium-grey;
  &--active {
    font-weight: 500;
    img {
      filter: drop-shadow(1px 2px 4px rgba(black, 0.4));
      opacity: 1 !important;
    }
  }
  &--active#{&}--fire {
    background: $pokemon-fire-light;
    color: $pokemon-fire-dark;
  }
  &--active#{&}--grass {
    background: $pokemon-grass-light;
    color: $pokemon-grass-dark;
  }
  &--active#{&}--water {
    background: $pokemon-water-light;
    color: $pokemon-water-dark;
  }
  &--active#{&}--normal {
    background: $pokemon-normal-light;
    color: $pokemon-normal-dark;
  }
  &--active#{&}--poison {
    background: $pokemon-poison-light;
    color: $pokemon-poison-dark;
  }
  &--active#{&}--bug {
    background: $pokemon-bug-light;
    color: $pokemon-bug-dark;
  }
  &--active#{&}--ground {
    background: $pokemon-ground-light;
    color: $pokemon-ground-dark;
  }
  &--active#{&}--fighting {
    background: $pokemon-fighting-light;
    color: $pokemon-fighting-dark;
  }
  &--active#{&}--rock {
    background: $pokemon-rock-light;
    color: $pokemon-rock-dark;
  }
  &--active#{&}--electric {
    background: $pokemon-electric-light;
    color: $pokemon-water-dark;
  }
  &--active#{&}--fairy {
    background: $pokemon-fairy-light;
    color: $pokemon-fairy-dark;
  }
  &--active#{&}--psychic {
    background: $pokemon-psychic-light;
    color: $pokemon-psychic-dark;
  }
  &--active#{&}--ghost {
    background: $pokemon-ghost-light;
    color: $pokemon-ghost-dark;
  }
  &--active#{&}--ice {
    background: $pokemon-ice-light;
    color: $pokemon-ice-dark;
  }
  &--active#{&}--dragon {
    background: $pokemon-dragon-light;
    color: $pokemon-dragon-dark;
  }
  &--active#{&}--steel {
    background: $pokemon-steel-light;
    color: $pokemon-steel-dark;
  }
  &--active#{&}--flying {
    background: $pokemon-flying-light;
    color: $pokemon-flying-dark;
  }

  &__sprite {
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50% 50% 50% 0;
    background-color: $off-white;
    img {
      position: absolute;
      height: 150%;
      width: 150%;
      top: -25%;
      left: -25%;
      opacity: 0.5;
    }
  }
}
</style>
