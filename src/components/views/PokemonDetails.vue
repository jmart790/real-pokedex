<template>
  <section class="pokemon-details">
    <div
      class="pokemon-details__bg"
      :class="`pokemon-details__bg--${pokemonType}`"
    />
    {{ activePokemonName }}
    <img :src="spriteImage" :alt="`${activePokemonName} sprite`" />
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokeStore } from '@/store/pokemon';

const pokeStore = usePokeStore();
const { activePokemonName, activePokemon } = storeToRefs(pokeStore);
const { getActivePokemon } = pokeStore;

const pokemonType = computed(() => activePokemon?.value?.types[0].type.name);
const spriteImage = computed(
  () =>
    activePokemon?.value?.sprites?.versions['generation-v']['black-white']
      .animated.front_default
);

watch(
  activePokemonName,
  (name) => {
    getActivePokemon(name);
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.pokemon-details {
  position: relative;
  height: 100%;
  width: 100%;
  background: $off-white;
  img {
    position: absolute;
    bottom: 10%;
    right: 10%;
    height: 150px;
    width: 150px;
  }
  &__bg {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 120%;
    width: 120%;
    content: '';
    background-position: right bottom;
    background-size: cover;
    opacity: 0.9;
    &--fire {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064393756616445952/BonzaiYosh_in-game_non-active_volcano_background_landscape_in_t_78fe356a-06e2-42a5-a9e1-16b0f3329239.png');
      transform: scaleX(-1);
    }
    &--grass {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064387454741790781/BonzaiYosh_in-game_forest_background_landscape_in_the_style_of__12a91c82-c63a-4349-8a95-827ddf720f5e.png');
    }
    &--water {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064385414586175548/BonzaiYosh_in-game_beach_background_landscape_in_the_style_of_p_24cc6554-928c-490f-9a14-8c7ab7bbb499.png');
    }
    &--normal {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064380641770229820/BonzaiYosh_in-game_grassy_fields_background_landscape_in_the_st_05fad0d0-0bfa-4c93-a07e-6fe62df900c7.png');
    }
    &--poison {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064382992325300284/BonzaiYosh_in-game_grassy_fields_background_landscape_durring_s_935c7eb5-c7ef-48f4-b19f-2c25e3c0da5e.png');
    }
    &--bug {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064396496113508392/BonzaiYosh_in-game_forests_background_landscape_in_the_style_of_620a8115-2f53-4bac-99a7-89f46cb90864.png');
      transform: scaleX(-1);
    }
    &--ground {
      background: $pokemon-ground-light;
      background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d843fov-5ad2d436-789b-48f4-91ac-7a553ca26306.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg0M2Zvdi01YWQyZDQzNi03ODliLTQ4ZjQtOTFhYy03YTU1M2NhMjYzMDYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.4WU23QrSu_7CD6c4MJIYPEeIvE5o8maEEkqYM40mwus');
    }
    &--fighting {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064533387538341898/BonzaiYosh_in-game_path_leading_to_dojo_surounded_by_mountains__736edb0a-913a-4614-a2d7-ac06a84e26c4.png');
    }
    &--rock {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064404167940124682/BonzaiYosh_in-game_rocky_terrain_background_landscape_in_the_st_3253cfc9-3cf9-4068-85c1-634ad3b1fe56.png');
      transform: scaleX(-1);
    }
    &--electric {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064373519309361283/BonzaiYosh_in-game_street_background_landscape_in_the_style_of__2c568057-8088-4617-92e8-2dd8a4e5a258.png');
    }
    &--fairy {
      background: $pokemon-fairy-light;
      background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d844s2l-3cc75658-1ce0-4e90-9013-7569cd4fdc8a.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg0NHMybC0zY2M3NTY1OC0xY2UwLTRlOTAtOTAxMy03NTY5Y2Q0ZmRjOGEucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.6blMWA6UJ5JGyUSgjBY3W8PNKcQE0zo7-ouenqM7zZ4');
    }
    &--psychic {
      background: $pokemon-psychic-light;
      background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83th12-efc3afd1-2ea6-43dd-a4aa-0ce6fba311f6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDgzdGgxMi1lZmMzYWZkMS0yZWE2LTQzZGQtYTRhYS0wY2U2ZmJhMzExZjYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.5IqcIuqVP5f9WQEQoc3ZGTDYrhV28dQLhzzspOcqhpU');
    }
    &--ghost {
      background: $pokemon-ghost-light;
      background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d88q0oq-116ad0a3-00ae-442c-ae87-850715098286.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg4cTBvcS0xMTZhZDBhMy0wMGFlLTQ0MmMtYWU4Ny04NTA3MTUwOTgyODYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.X97ycmkYidcj48jArAZ_4Yw3S2YUy_k1g-HI6L8GxgI');
    }
    &--ice {
      background: $pokemon-ice-light;
      background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83u6dm-ebaee268-2149-4d70-abad-2b9d19e4806d.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDgzdTZkbS1lYmFlZTI2OC0yMTQ5LTRkNzAtYWJhZC0yYjlkMTllNDgwNmQuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.LoKoO0_A1-_AMfaUb66yFQ43XCi4aEXpk1GIFgYFC5M');
    }
    &--dragon {
      background: $pokemon-dragon-light;
      background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83ohf3-7f911e73-0d36-4f31-94f9-e620fd0163c6.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDgzb2hmMy03ZjkxMWU3My0wZDM2LTRmMzEtOTRmOS1lNjIwZmQwMTYzYzYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.wxRac84v_EgyrvePWQOUDa7MFXoplmVXtL0_ENPNTpo');
    }
    &--steel {
      background: $pokemon-steel-light;
      background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d88d1yo-10af7b20-6c71-4504-94bd-d31152129ec5.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDg4ZDF5by0xMGFmN2IyMC02YzcxLTQ1MDQtOTRiZC1kMzExNTIxMjllYzUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gXLimxcUtOUcfNZBQKsrxQ9ZB92wSJuXlhd8O6lJ2K0');
    }
    &--flying {
      background: $pokemon-flying-light;
      background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2fb2821a-1406-4a1d-9b04-6668f278e944/d83pvei-ce2f2ee9-0720-4fcc-bd6b-d235b10a2985.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJmYjI4MjFhLTE0MDYtNGExZC05YjA0LTY2NjhmMjc4ZTk0NFwvZDgzcHZlaS1jZTJmMmVlOS0wNzIwLTRmY2MtYmQ2Yi1kMjM1YjEwYTI5ODUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.A1imZWriK4Xj_lKniiehh27Pp35KE7rJTgFuOz7_0pQ');
    }
  }
}
</style>
