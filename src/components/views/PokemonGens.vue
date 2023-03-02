<template>
  <section class="gens">
    <div class="gens__options">
      <FrostCard
        v-for="option in menuOptions"
        :key="`gen-option__${option.region}`"
      >
        <div
          class="gens__option"
          :class="{ 'gens__option--active': option.id === gensPosition + 1 }"
        >
          <p class="gens__gen-num">{{ option.id }}</p>
          <p class="gens__region">{{ option.region }}</p>
          <div
            v-if="option.sprites.length"
            class="gens__sprites"
            :class="`gens__sprites--${option.id}`"
          >
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
const { gensPosition } = storeToRefs(controlsStore);

const menuOptions = [
  {
    id: 1,
    region: 'Kanto',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
        alt: 'Bulbasaur'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
        alt: 'Charmander'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png',
        alt: 'Squirtle'
      }
    ]
  },
  {
    id: 2,
    region: 'Johto',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/152.png',
        alt: 'Chikorita'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/155.png',
        alt: 'Cyndaquil'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/158.png',
        alt: 'Totodile'
      }
    ]
  },
  {
    id: 3,
    region: 'Hoenn',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/252.png',
        alt: 'Treeko'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/255.png',
        alt: 'Torchic'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/258.png',
        alt: 'Mudkip'
      }
    ]
  },
  {
    id: 4,
    region: 'Sinnoh',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/387.png',
        alt: 'Turtwig'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/390.png',
        alt: 'Chimchar'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/393.png',
        alt: 'Piplup'
      }
    ]
  },
  {
    id: 5,
    region: 'Unova',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/495.png',
        alt: 'Snivy'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/498.png',
        alt: 'Tepig'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/501.png',
        alt: 'Oshawott'
      }
    ]
  },
  {
    id: 6,
    region: 'Kalos',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/650.png',
        alt: 'Chespin'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/653.png',
        alt: 'Fennekin'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/656.png',
        alt: 'Froakie'
      }
    ]
  },
  {
    id: 7,
    region: 'Alola',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/722.png',
        alt: 'Rowlet'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/725.png',
        alt: 'Litten'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/728.png',
        alt: 'Popplio'
      }
    ]
  },
  {
    id: 8,
    region: 'Galar',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/810.png',
        alt: 'Grookey'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/813.png',
        alt: 'Scorbunny'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/816.png',
        alt: 'Sobble'
      }
    ]
  },
  {
    id: 9,
    region: 'Paldea',
    sprites: [
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/906.png',
        alt: 'Sprigatito'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/909.png',
        alt: 'Fuecoco'
      },
      {
        src: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/912.png',
        alt: 'Quaxly'
      }
    ]
  }
];
</script>

<style scoped lang="scss">
.gens {
  $self: &;
  @include cool-bg;
  padding: gap(9) gap(5);

  &__options {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(4);
  }

  &__option {
    position: relative;
    height: 100%;
    padding: gap(3) gap(4);
    display: flex;
    align-items: center;
    gap: gap(3);
    border-radius: inherit;
    color: rgba($off-black, 0.7);
    background-color: rgba($secondary, 0);
    transition: color 300ms ease-in-out, background-color 300ms ease-in-out;
    overflow: hidden;

    &--active {
      color: $primary;
      background-color: rgba($secondary, 0.5);

      #{$self}__region {
        letter-spacing: 2px;
        font-weight: 600;
      }

      #{$self}__sprites {
        transform: translateX(-100px);
      }
      #{$self}__gen-num {
        transform: translateY(-100%);
      }
    }
  }
  &__gen-num {
    position: absolute;
    top: 0px;
    right: 5px;
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    @include flex-center;
    font-weight: 700;
    font-size: rem(40);
    font-family: $secondary-font;
    color: rgba(white, 0.4);
    transition: transform 300ms ease-in-out;
  }

  &__region {
    transition: letter-spacing 300ms ease-in-out, font-weight 300ms ease-in-out;
  }

  &__sprites {
    position: absolute;
    right: -100px;
    top: 0px;
    width: 52%;
    height: 100%;
    transition: transform 300ms ease-in-out;
    // filter: grayscale(1);

    img {
      position: absolute;
      top: 0;
      height: 50px;
      width: 50px;
    }
    &--1 {
      img:first-of-type {
        left: 0;
      }
      img:nth-of-type(2) {
        left: 32px;
      }
      img:last-of-type {
        left: 55px;
      }
    }
    &--2 {
      img {
        transform: scale(1.2);
      }
      img:first-of-type {
        left: -5px;
        top: -5px;
      }
      img:nth-of-type(2) {
        left: 22px;
        transform: scale(-1.2, 1.2);
      }
      img:last-of-type {
        left: 51px;
        top: 5px;
      }
    }
    &--3 {
      img {
        transform: scale(1.1);
      }
      img:first-of-type {
        left: -2px;
      }
      img:nth-of-type(2) {
        left: 22px;
      }
      img:last-of-type {
        left: 52px;
        top: -5px;
      }
    }
    &--4 {
      img:first-of-type {
        left: -5px;
        top: -2px;
        transform: scale(1.1);
      }
      img:nth-of-type(2) {
        left: 21px;
        transform: scale(1.1);
      }
      img:last-of-type {
        left: 50px;
        transform: scaleX(-1);
      }
    }
    &--5 {
      img:first-of-type {
        left: -5px;
      }
      img:nth-of-type(2) {
        left: 23px;
        top: -5px;
        transform: scaleX(-1);
      }
      img:last-of-type {
        left: 50px;
      }
    }
    &--6 {
      img:first-of-type {
        left: -9px;
        transform: scale(1.2);
      }
      img:nth-of-type(2) {
        left: 21px;
        top: -5px;
        transform: scale(-1.2, 1.2);
      }
      img:last-of-type {
        left: 48px;
        transform: scale(-0.9, 0.9);
      }
    }
    &--7 {
      img:first-of-type {
        left: -9px;
      }
      img:nth-of-type(2) {
        left: 22px;
        top: -5px;
        transform: scale(1.4);
      }
      img:last-of-type {
        left: 53px;
        top: -2px;
        transform: scale(-1.2, 1.2);
      }
    }
    &--8 {
      img:first-of-type {
        left: -9px;
        top: -3px;
        transform: scale(-1.1, 1.1);
      }
      img:nth-of-type(2) {
        left: 18px;
        top: -5px;
        transform: scale(1.7);
      }
      img:last-of-type {
        left: 51px;
        top: -12px;
        transform: scale(1.4);
      }
    }
    &--9 {
      img:first-of-type {
        left: -9px;
        top: -3px;
        transform: scale(1.1);
      }
      img:nth-of-type(2) {
        left: 25px;
        top: -2px;
        transform: scale(1);
      }
      img:last-of-type {
        left: 51px;
        top: -4px;
        transform: scale(-1.1, 1.1);
      }
    }
  }
}
</style>
