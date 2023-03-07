<template>
  <section class="credits">
    <div class="credits__wrapper">
      <h1>Credit & Thanks</h1>
      <ul>
        <li v-for="(credit, index) in credits" :key="`credits--${index}`">
          <p>{{ credit }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const credits = [
  'The Pokemon company for making IP beautiful',
  'Midjourney for creating the tools to create such beautiful landscapes and character assets',
  'Daniel Gasson for creating a realistic nintendo switch which the pokedex is heavily inspired by',
  'channylim24 for creating a cute pikachu loader that I had to borrow',
  'The creators and maintainers of PokeAPI where most of this is data is coming from',
  'The creators and maintainers of Pokeapi-typescript who made consuming the api so much easier and typed',
  'Kevin Powell for creating such awesome and digestible content surrounding CSS',
  'Jhey, Ricardo Oliva Alonso, Eric Varela, Geoffroy Luchez, and Pauliigs for creating such awesome pokedexes in the past which really inspired me to go a bit further and lose a lot of sleep lol',
  'Evan, and the rest of the Vue team for creating such an intuitive and enjoyable framework',
  'Erik Hanchett for creating great short vue content that help me get started a few years ago',
  'Sarah Drasner for so many online lessons, super helpful packages and extensions for vue, css, performance',
  'My friend Klajdi for pushing me to release this and not let it die on my machine',
  'Lastly and most important, my daughter Luna who inspires me everyday with her smile, wanting to leave the world a tad better for her. ❤️'
];
</script>

<style scoped lang="scss">
.credits {
  position: relative;
  @include cool-bg;
  color: $off-white;
  &__wrapper {
    position: absolute;
    width: 100%;
    inset: 0 0 0 0;
    padding: gap(9) gap(5);
    animation: 60s credits-scroll linear infinite;
  }
  h1 {
    margin-top: gap(30);
    margin-bottom: gap(40);
    text-align: center;
    font-size: $font-size-7;
    font-family: $pokemon-font;
    color: $primary;
    letter-spacing: 4px;
    text-shadow: 4px 4px 0px rgba($secondary, 1), -4px -4px 0px rgba($secondary, 1), 4px -4px 0px rgba($secondary, 1),
    -4px 4px 0px rgba($secondary, 1);
  }
  ul {
    display: grid;
    gap: gap(4);
    text-align: center;
  }
  li p {
    font-weight: 600;
    padding: gap(2) gap(4);
  }

  @keyframes credits-scroll {
    0% {
      top: 0;
    }
    100% {
      top: -500%;
    }
  }
}
</style>
