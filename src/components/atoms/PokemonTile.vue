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
    <div
      class="pokemon-tile__image-container"
      :class="{ 'pokemon-tile__image-container--loading': isLoading }"
    >
      <img
        v-if="isActive && gifImage"
        :src="gifImage"
        alt="gif image"
        class="pokemon-tile__gif"
        @load="handleLoadedImage"
        loading="lazy"
      />
      <img
        v-else
        :src="spriteImage"
        alt="pokemon sprite"
        class="pokemon-tile__sprite"
        :class="{
          'pokemon-tile__sprite--backup-active': isActive && !gifImage
        }"
        height="64px"
        width="64px"
        @load="handleLoadedImage"
        loading="lazy"
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
  genNum: number;
  id: string;
}

const props = defineProps<IPokemonTile>();
const pokemon = ref<IPokemon>();
const isLoading = ref(false);

const spriteImage = computed(() => pokemon?.value?.sprites?.front_default);
const gifImage = computed(
  () =>
    pokemon?.value?.sprites?.versions['generation-v']['black-white']?.animated
      ?.front_default
);
const pokemonType = computed(() => pokemon?.value?.types[0].type.name);

const handleLoadedImage = () => {
  isLoading.value = false;
};

onMounted(async () => {
  isLoading.value = true;
  await PokeAPI.Pokemon.resolve(props.id).then((res) => {
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
    &--loading {
      overflow: hidden;
      img {
        opacity: 0;
      }
    }
  }
  &__sprite {
    position: absolute;
    height: 150%;
    width: 150%;
    @include position-center;
    opacity: 0.9;
    transform-origin: center;
    &--backup-active {
      opacity: 1;
      height: 160%;
      width: 160%;
      animation-duration: 2s;
      animation-iteration-count: infinite;
      animation-name: bounce;
      animation-timing-function: ease;
      @keyframes bounce {
        0% {
          transform: scale(1, 1) translate(-50%, -50%) translateY(0);
        }
        10% {
          transform: scale(1.05, 0.9) translate(-50%, -50%) translateX(2.5%);
        }
        30% {
          transform: scale(0.95, 1.1) translate(-50%, -50%) translateY(-3px) translateX(-2.5%);
        }
        50% {
          transform: scale(1, 1) translate(-50%, -50%) translateY(0);
        }
        57% {
          transform: scale(1, 1) translate(-50%, -50%) translateY(-1px);
        }
        64% {
          transform: scale(1, 1) translate(-50%, -50%) translateY(0);
        }
        100% {
          transform: scale(1, 1) translate(-50%, -50%) translateY(0);
        }
      }
    }
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
