<template>
  <article
    class="pokemon-tile"
    :class="[
      {
        'pokemon-tile--active': isActive
      },
      `pokemon-tile--${pokemonType}`
    ]"
  >
    <div class="pokemon-tile__image-container">
      <img
        v-if="isActive"
        :src="gifImage"
        alt="gif image"
        class="pokemon-tile__gif"
      />
      <img
        v-else
        :src="spriteImage"
        alt="pokemon sprite"
        class="pokemon-tile__sprite"
      />
    </div>
    <span class="pokemon-tile__name">{{ name }}</span>
  </article>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import PokeAPI, { type IPokemon } from 'pokeapi-typescript';

interface IPokemonTile {
  name: string;
  isActive: boolean;
}
const props = defineProps<IPokemonTile>();
const pokemon = ref<IPokemon>();
const spriteImage = computed(() => pokemon?.value?.sprites?.front_default);
const gifImage = computed(
  () =>
    pokemon?.value?.sprites?.versions['generation-v']['black-white'].animated
      .front_default
);
const pokemonType = computed(() => pokemon?.value?.types[0].type.name);

onMounted(async () => {
  await PokeAPI.Pokemon.resolve(props.name).then((res) => {
    pokemon.value = res;
  });
});
</script>

<style scoped lang="scss">
.pokemon-tile {
  @mixin active($light, $dark) {
    background: rgba($light, 0.45);
    color: $dark;
    .pokemon-tile__image-container {
      background-color: rgba($light, 0.75);
    }
  }
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: gap(3);
  text-transform: capitalize;
  border-radius: $cool-border-radius;
  color: white;
  @include frost-bg;

  &__name {
    color: inherit;
  }
  &__image-container {
    flex-shrink: 0;
    position: relative;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: rgba(white, 0.4);
    backdrop-filter: blur(10px);
  }
  &__sprite {
    position: absolute;
    height: 150%;
    width: 150%;
    top: -25%;
    left: -25%;
    opacity: 0.8;
  }

  &__gif {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 1;
  }

  &--active#{&}--fire {
    @include active($pokemon-fire-light, $pokemon-fire-dark);
  }
  &--active#{&}--grass {
    @include active($pokemon-grass-light, $pokemon-grass-dark);
  }
  &--active#{&}--water {
    @include active($pokemon-water-light, $pokemon-water-dark);
  }
  &--active#{&}--normal {
    @include active($pokemon-normal-light, $pokemon-normal-dark);
  }
  &--active#{&}--poison {
    @include active($pokemon-poison-light, $pokemon-poison-dark);
  }
  &--active#{&}--bug {
    @include active($pokemon-bug-light, $pokemon-bug-dark);
  }
  &--active#{&}--ground {
    @include active($pokemon-ground-light, $pokemon-ground-dark);
  }
  &--active#{&}--fighting {
    @include active($pokemon-fighting-light, $pokemon-fighting-dark);
  }
  &--active#{&}--rock {
    @include active($pokemon-rock-light, $pokemon-rock-dark);
  }
  &--active#{&}--electric {
    @include active($pokemon-electric-light, $pokemon-electric-dark);
  }
  &--active#{&}--fairy {
    @include active($pokemon-fairy-light, $pokemon-fairy-dark);
  }
  &--active#{&}--psychic {
    @include active($pokemon-psychic-light, $pokemon-psychic-dark);
  }
  &--active#{&}--ghost {
    @include active($pokemon-ghost-light, $pokemon-ghost-dark);
  }
  &--active#{&}--ice {
    @include active($pokemon-ice-light, $pokemon-ice-dark);
  }
  &--active#{&}--dragon {
    @include active($pokemon-dragon-light, $pokemon-dragon-dark);
  }
  &--active#{&}--steel {
    @include active($pokemon-steel-light, $pokemon-steel-dark);
  }
  &--active#{&}--flying {
    @include active($pokemon-flying-light, $pokemon-flying-dark);
  }
}
</style>
