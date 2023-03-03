<template>
  <section class="main-menu">
    <img class="main-menu__logo" src="../../assets/images/Pokedex_logo.png" alt="Pokedex logo" />
    <div class="main-menu__options">
      <FrostCard v-for="option in menuOptions" :key="`menu-option__${option.label}`">
        <div class="main-menu__option" :class="{ 'main-menu__option--active': menuPosition === option.id }">
          <p>{{ option.label }}</p>
          <div v-if="option.sprites.length" class="main-menu__sprites" :class="`main-menu__sprites--${option.id}`">
            <img
              v-for="{ src, alt } in option.sprites"
              :key="`menu-sprite__${alt}`"
              height="50px"
              width="50px"
              :src="(src as string)"
              :alt="alt"
            />
          </div>
        </div>
      </FrostCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useControlsStore } from '@/store/controls';
import { storeToRefs } from 'pinia';

const controlsStore = useControlsStore();
const { menuPosition } = storeToRefs(controlsStore);

const meUrl = new URL('/src/assets/images/BonzaiYoshProfessor.png', import.meta.url);
const ashUrl = new URL('/src/assets/images/ashketchum.png', import.meta.url);
const brockUrl = new URL('/src/assets/images/brock.png', import.meta.url);
const mistyUrl = new URL('/src/assets/images/misty.png', import.meta.url);

const menuOptions = [
  {
    id: 0,
    label: 'Pokémon',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/25.png',
        alt: 'pikachu'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/216.png',
        alt: 'Teddiursa'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png',
        alt: 'Piplup'
      }
    ]
  },
  {
    id: 1,
    label: 'Generations',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/1.png',
        alt: 'Bulbasaur'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/4.png',
        alt: 'Charmander'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-iii/firered-leafgreen/7.png',
        alt: 'Squirtle'
      }
    ]
  },
  {
    id: 2,
    label: 'Prof. Yosh',
    sprites: [
      {
        src: meUrl,
        alt: 'Bonzai Yosh'
      }
    ]
  },
  {
    id: 3,
    label: 'Credits',
    sprites: [
      {
        src: ashUrl,
        alt: 'Ask Ketchum'
      },
      {
        src: mistyUrl,
        alt: 'Misty'
      },
      {
        src: brockUrl,
        alt: 'Brock'
      }
    ]
  }
];
</script>

<style scoped lang="scss">
.main-menu {
  $self: &;
  @include cool-bg;
  padding: gap(9) gap(5);
  &__logo {
    height: 110px;
    width: 330px;
    display: block;
    margin-inline: auto;
    margin-block: gap(6) gap(10);
  }
  &__options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(4);
  }
  &__option {
    position: relative;
    padding: gap(3) gap(4);
    overflow: hidden;
    border-radius: inherit;
    background-color: rgba($secondary, 0);
    color: rgba($off-black, 0.8);
    transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
    p {
      font-weight: 600;
      transition: letter-spacing 300ms ease-in-out;
    }
    &--active {
      color: $primary;
      background-color: rgba($secondary, 0.5);
      p {
        letter-spacing: 2px;
      }
      #{$self}__sprites {
        transform: translateX(-70px);
      }
      #{$self}__sprites--3 {
        transform: translateX(-95px);
      }
    }
  }
  &__sprites {
    position: absolute;
    right: -70px;
    top: 0px;
    width: 70px;
    height: 100%;
    transition: transform 300ms ease-in-out;
    img {
      position: absolute;
      height: 50px;
      width: 50px;
    }

    &--0 {
      img {
        top: 0px;
        left: -10px;
      }
      img:nth-of-type(2) {
        left: 10px;
      }
      img:last-of-type {
        top: -2px;
        left: 30px;
        transform: scale(-1.1, 1.1);
      }
    }

    &--1 {
      img:first-of-type {
        top: 10px;
        left: 19px;
        z-index: 1;
        transform: scale(1.1);
      }
      img:nth-of-type(2) {
        top: -5px;
        left: 38px;
        transform: scale(1.1);
      }
      img:last-of-type {
        top: -8px;
        left: 6px;
        transform: scale(1.1);
      }
    }

    &--2 {
      img {
        top: 30px;
        left: 10px;
        height: unset;
        transform: scale(1.7);
      }
    }

    &--3 {
      right: -95px;
      img {
        height: unset;
      }
      img:first-of-type {
        top: 0px;
        left: -30px;
        z-index: 1;
      }
      img:nth-of-type(2) {
        top: 0px;
        left: -2px;
      }
      img:nth-of-type(3) {
        top: 18px;
        left: 30px;
        transform: scale(2);
      }
    }
  }
}
</style>
