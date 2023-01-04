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
  @mixin active($color) {
    letter-spacing: 1px;
    color: rgba($off-black, 0.8);
    background: rgba($color, 0.3);
    .pokemon-tile__image-container {
      background-color: rgba($color, 0.75);
    }
  }
  display: flex;
  align-items: center;
  gap: gap(3);
  text-transform: capitalize;
  border-radius: inherit;
  color: rgba($off-white, 0.9);

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
    @include active($pokemon-fire-light);
  }
  &--active#{&}--grass {
    @include active($pokemon-grass-light);
  }
  &--active#{&}--water {
    @include active($pokemon-water-light);
  }
  &--active#{&}--normal {
    @include active($pokemon-normal-light);
  }
  &--active#{&}--poison {
    @include active($pokemon-poison-light);
  }
  &--active#{&}--bug {
    @include active($pokemon-bug-light);
  }
  &--active#{&}--ground {
    @include active($pokemon-ground-light);
  }
  &--active#{&}--fighting {
    @include active($pokemon-fighting-light);
  }
  &--active#{&}--rock {
    @include active($pokemon-rock-light);
  }
  &--active#{&}--electric {
    @include active($pokemon-electric-light);
  }
  &--active#{&}--fairy {
    @include active($pokemon-fairy-light);
  }
  &--active#{&}--psychic {
    @include active($pokemon-psychic-light);
  }
  &--active#{&}--ghost {
    @include active($pokemon-ghost-light);
  }
  &--active#{&}--ice {
    @include active($pokemon-ice-light);
  }
  &--active#{&}--dragon {
    @include active($pokemon-dragon-light);
  }
  &--active#{&}--steel {
    @include active($pokemon-steel-light);
  }
  &--active#{&}--flying {
    @include active($pokemon-flying-light);
  }
}
</style>
