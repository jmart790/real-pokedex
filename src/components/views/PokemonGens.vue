<template>
  <section class="gens">
    <div class="gens__options">
      <FrostCard
        v-for="option in menuOptions"
        :key="`gen-option__${option.region}`"
      >
        <div
          class="gens__option"
          :class="{ 'gens__option--active': menuPosition === option.id }"
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
const { menuPosition } = storeToRefs(controlsStore);

const meUrl = new URL(
  '/src/assets/images/bonzaiyoshanime.png',
  import.meta.url
);
const ashUrl = new URL('/src/assets/images/ashketchum.png', import.meta.url);
const brockUrl = new URL('/src/assets/images/brock.png', import.meta.url);
const mistyUrl = new URL('/src/assets/images/misty.png', import.meta.url);

const menuOptions = [
  {
    id: 1,
    region: 'Kanto',
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
    id: 2,
    region: 'Johto',
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
    id: 3,
    region: 'Hoenn',
    sprites: [
      {
        src: meUrl,
        alt: 'Bonzai Yosh'
      }
    ]
  },
  {
    id: 4,
    region: 'Sinnoh',
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
  },
  {
    id: 5,
    region: 'Unova',
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
  },
  {
    id: 6,
    region: 'Kalos',
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
  },
  {
    id: 7,
    region: 'Alola',
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
  },
  {
    id: 8,
    region: 'Galar',
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
  },
  {
    id: 9,
    region: 'Paldea',
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
    padding: 0 gap(1);
    display: flex;
    align-items: center;
    gap: gap(3);
    border-radius: inherit;
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
        transform: translateX(-70px);
      }

      #{$self}__sprites--3 {
        transform: translateX(-95px);
      }
    }
  }
  &__gen-num {
    flex-shrink: 0;
    margin-left: 2px;
    margin-top: 2px;
    height: 90%;
    aspect-ratio: 1/1;
    display: flex;
    @include flex-center;
    border-radius: 50%;
    background-color: rgba(white, 0.4);
    font-weight: 700;
    font-size: rem(20);
    font-family: $secondary-font;
  }

  &__region {
    transition: letter-spacing 300ms ease-in-out, font-weight 300ms ease-in-out;
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
        top: 0px;
        left: 20px;
        height: unset;
        transform: scale(0.9);
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
