<template>
  <section class="pokemon-details">
    <div
      class="pokemon-details__bg"
      :class="`pokemon-details__bg--${activePokemonType}`"
    />
    {{ activePokemonName }}
    <img
      v-show="isImgLoading"
      class="pokemon-details__pokeball"
      src="@/assets/images/pokeball-pokemon.gif"
      :alt="`${activePokemonName} sprite`"
    />
    <img
      v-show="!isImgLoading"
      class="pokemon-details__pokemon"
      :src="spriteImage"
      :alt="`${activePokemonName} sprite`"
      @load="handleImgLoaded"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokeStore } from '@/store/pokemon';
import { useControlsStore } from '@/store/controls';

const pokeStore = usePokeStore();
const controlStore = useControlsStore();

const { activeSpriteSetting } = storeToRefs(controlStore);
const {
  activePokemonPayload,
  activePokemonName,
  activePokemonSprites,
  activePokemonType,
  genNum,
} = storeToRefs(pokeStore);

const { getActivePokemon } = pokeStore;

const isImgLoading = ref(false);

const spriteImage = computed(() => {
  if (!activePokemonSprites.value) return null;

  const sprites = activePokemonSprites.value;
  const { type, isFront } = activeSpriteSetting.value;
  if (genNum.value > 5) {
    // only artwork front for gen 6 and up
    const isShiny = type.includes('Shiny');
    const artworkType = isShiny ? 'artworkShiny' : 'artwork';
    return sprites[artworkType].front;
  }
  const orientation = isFront ? 'front' : 'back';
  const safeOrientation = type.includes('artwork') ? 'front' : orientation;

  return sprites[type][safeOrientation];
});

function handleImgLoaded() {
  setTimeout(() => (isImgLoading.value = false), 1000);
}

watchEffect(async () => {
  isImgLoading.value = true;
  await getActivePokemon(activePokemonPayload.value);
});
</script>

<style scoped lang="scss">
.pokemon-details {
  position: relative;
  height: 100%;
  width: 100%;
  background: $off-white;

  img {
    position: absolute;
  }

  &__pokemon {
    bottom: 10%;
    right: 10%;
    height: 50%;
    width: auto;
    filter: drop-shadow(0px 4px 4px rgba(black, 0.7));
  }

  &__pokeball {
    bottom: 15%;
    right: 15%;
    height: 50px;
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
    opacity: 0.85;

    &--fire {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064393756616445952/BonzaiYosh_in-game_non-active_volcano_background_landscape_in_t_78fe356a-06e2-42a5-a9e1-16b0f3329239.png');
      transform: scaleX(-1);
    }

    &--grass {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064387454741790781/BonzaiYosh_in-game_forest_background_landscape_in_the_style_of__12a91c82-c63a-4349-8a95-827ddf720f5e.png');
      transform: translateX(20px);
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
      transform: scaleX(-1) translateX(-20px);
    }

    &--ground {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064756522720174170/BonzaiYosh_in-game_pathway_to_cave_background_landscape_in_the__dccef69c-4a92-472f-9f72-b9ff306a141c.png');
      transform: translateX(70px);
    }

    &--fighting {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064533387538341898/BonzaiYosh_in-game_path_leading_to_dojo_surounded_by_mountains__736edb0a-913a-4614-a2d7-ac06a84e26c4.png');
    }

    &--rock {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064404167940124682/BonzaiYosh_in-game_rocky_terrain_background_landscape_in_the_st_3253cfc9-3cf9-4068-85c1-634ad3b1fe56.png');
      transform: scaleX(-1) translateX(-40px);
    }

    &--electric {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064373519309361283/BonzaiYosh_in-game_street_background_landscape_in_the_style_of__2c568057-8088-4617-92e8-2dd8a4e5a258.png');
    }

    &--fairy {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064904348771033208/BonzaiYosh_in-game_quiet_mountain_area_covered_with_flowers_bac_5988f45b-6f09-46ae-91d8-f5182d3a401c.png');
      transform: scaleX(-1) translate(-45px, 20px);
    }

    &--psychic {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064750024870854736/BonzaiYosh_in-game_abandoned_temple_background_landscape_in_the_06ccd0c1-d880-40ef-ad95-55a97551ad47.png');
      transform: translateX(20px);
    }

    &--ghost {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064753182527475783/BonzaiYosh_in-game_pathway_to_haunted_cementry_background_lands_476513f2-3637-4f6a-8eef-1225d1d9ca26.png');
    }

    &--ice {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064898348198400071/BonzaiYosh_in-game_icy_area_near_surounded_by_mountains_backgro_e2f15cbe-0235-4777-b311-fd9f361ddc4c.png');
    }

    &--dragon {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1064746570886696970/BonzaiYosh_in-game_secret_Lake_background_landscape_with_an_anc_3f3b8d49-c008-4048-a2af-fcf63a014df9.png');
      transform: scaleX(-1) translateX(-50px);
    }

    &--steel {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1065384940256120842/BonzaiYosh_in-game_underground_full_of_crystals_background_land_bdecff41-1e84-4355-8713-c8c07a498c97.png');
      transform: scaleX(-1) translateX(-60px);
    }

    &--flying {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1065443033291706418/BonzaiYosh_in-game_a_mile_high_surrounded_by_clouds_background__d343e3da-d21d-4bd6-84f1-2a2083f3ef97.png');
      transform: scaleX(-1) translateX(-20px);
    }

    &--dark {
      background-image: url('https://media.discordapp.net/attachments/1057467541062168586/1065090328807350300/BonzaiYosh_ask_in-game_pathway_to_a_lost_tower_during_a_full_mo_4042451b-56d4-46a4-b9d9-29f4c9fd308f.png');
      transform: scaleX(-1) translateX(-80px);
    }
  }
}
</style>
