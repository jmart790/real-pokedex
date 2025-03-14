<template>
  <section class="pokemon-wild">
    <div class="pokemon-wild__bg" :class="`pokemon-wild__bg--${activePokemonType}`" />
    <img
      v-show="isImgLoading"
      class="pokemon-wild__pokeball"
      src="@/assets/images/pokeball-pokemon.gif"
      :alt="`${activePokemonName} sprite`"
    />
    <img
      v-show="!isImgLoading"
      class="pokemon-wild__pokemon"
      :class="{ 'pokemon-wild__pokemon--small': activePokemonHeight <= 10 }"
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
const { activePokemonPayload, activePokemonName, activePokemonSprites, activePokemonType, activePokemonHeight } =
  storeToRefs(pokeStore);

const { getActivePokemon } = pokeStore;

const isImgLoading = ref(false);

/**
 * Returns the sprite image for the active Pokemon based on the active sprite setting.
 * @return {string|null} - The URL of the sprite image, or null if the active Pokemon sprites are not available.
 */
const spriteImage = computed(() => {
  if (!activePokemonSprites.value) return null;

  const sprites = activePokemonSprites.value;
  const { isAnimated, isShiny, isFront } = activeSpriteSetting.value;

  const type = isAnimated ? 'animated' : 'artwork';
  const shiny = isShiny ? 'Shiny' : '';
  const availableType = sprites[`${type}${shiny}`].front ? `${type}${shiny}` : `artwork${shiny}`;

  const availableOrientation = isFront ? 'front' : sprites[availableType].back ? 'back' : 'front';

  return sprites[availableType][availableOrientation];
});

const pokemonHeight = computed(() => {
  const baseHeight = 70;
  const ratio = 8;
  return `${activePokemonHeight.value * ratio + baseHeight}px`;
});

function handleImgLoaded() {
  setTimeout(() => (isImgLoading.value = false), 500);
}

watchEffect(async () => {
  isImgLoading.value = true;
  await getActivePokemon(activePokemonPayload.value);
});
</script>

<style scoped lang="scss">
.pokemon-wild {
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
    max-height: 65%;
    height: v-bind(pokemonHeight);
    width: auto;
    @include larger-than-mobile {
      filter: drop-shadow(0px 4px 4px rgba(black, 0.7));
    }
    &--small {
      bottom: 15%;
      right: 15%;
    }
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
    background-image: url('https://cdn.midjourney.com/620a8115-2f53-4bac-99a7-89f46cb90864/0_0.png');
    opacity: 0.85;

    &--grass {
      background-image: url('https://cdn.midjourney.com/620a8115-2f53-4bac-99a7-89f46cb90864/0_0.png');
      transform: translateX(20px);
    }

    &--fire {
      background-image: url('https://cdn.midjourney.com/78fe356a-06e2-42a5-a9e1-16b0f3329239/0_0.png');
      transform: scaleX(-1);
    }

    &--water {
      background-image: url('https://cdn.midjourney.com/24cc6554-928c-490f-9a14-8c7ab7bbb499/0_0.png');
    }

    &--normal {
      background-image: url('https://cdn.midjourney.com/935c7eb5-c7ef-48f4-b19f-2c25e3c0da5e/0_0.png');
    }

    &--poison {
      background-image: url('https://cdn.midjourney.com/625297cd-261a-429b-bd4b-b833d643231d/0_0.png');
    }

    &--bug {
      background-image: url('https://cdn.midjourney.com/620a8115-2f53-4bac-99a7-89f46cb90864/0_0.png');
      transform: scaleX(-1) translateX(-20px);
    }

    &--ground {
      background-image: url('https://cdn.midjourney.com/dccef69c-4a92-472f-9f72-b9ff306a141c/0_0.png');
      transform: translateX(70px);
    }

    &--fighting {
      background-image: url('https://cdn.midjourney.com/736edb0a-913a-4614-a2d7-ac06a84e26c4/0_0.png');
    }

    &--rock {
      background-image: url('https://cdn.midjourney.com/3253cfc9-3cf9-4068-85c1-634ad3b1fe56/0_0.png');
      transform: scaleX(-1) translateX(-40px);
    }

    &--electric {
      background-image: url('https://cdn.midjourney.com/2c568057-8088-4617-92e8-2dd8a4e5a258/0_0.png');
    }

    &--fairy {
      background-image: url('https://cdn.midjourney.com/5988f45b-6f09-46ae-91d8-f5182d3a401c/0_0.png');
      transform: scaleX(-1) translate(-45px, 20px);
    }

    &--psychic {
      background-image: url('https://cdn.midjourney.com/06ccd0c1-d880-40ef-ad95-55a97551ad47/0_0.png');
      transform: translateX(20px);
    }

    &--ghost {
      background-image: url('https://cdn.midjourney.com/476513f2-3637-4f6a-8eef-1225d1d9ca26/0_0.png');
    }

    &--ice {
      background-image: url('https://cdn.midjourney.com/e2f15cbe-0235-4777-b311-fd9f361ddc4c/0_0.png');
    }

    &--dragon {
      background-image: url('https://cdn.midjourney.com/3f3b8d49-c008-4048-a2af-fcf63a014df9/0_0.png');
      transform: scaleX(-1) translateX(-50px);
    }

    &--steel {
      background-image: url('https://cdn.midjourney.com/bdecff41-1e84-4355-8713-c8c07a498c97/0_0.png');
      transform: scaleX(-1) translateX(-60px);
    }

    &--flying {
      background-image: url('https://cdn.midjourney.com/d343e3da-d21d-4bd6-84f1-2a2083f3ef97/0_0.png');
      transform: scaleX(-1) translateX(-20px);
    }

    &--dark {
      background-image: url('https://cdn.midjourney.com/4042451b-56d4-46a4-b9d9-29f4c9fd308f/0_0.png');
      transform: scaleX(-1) translateX(-80px);
    }
  }
}
</style>
