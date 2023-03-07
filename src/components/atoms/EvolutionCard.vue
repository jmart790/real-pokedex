<template>
  <article
    class="pokemon-card"
    :class="[
      { 'pokemon-card--non-linear': isNonLinear },
      `pokemon-card--${totalEvolutions}`
    ]"
  >
    <div class="pokemon-card__img-wrapper">
      <img :src="sprite" alt="pokemon sprite" />
    </div>
    <FrostCard>
      <h4>{{ name }}</h4>
    </FrostCard>
    <p v-if="trigger" class="pokemon-card__trigger">
      {{ trigger }}
    </p>
    <span v-if="isArrowVis" class="pokemon-card__arrow">→</span>
  </article>
</template>

<script setup lang="ts">
import type { IPokemonSpritesUpdated } from '@/types';
import type { IEvolutionDetail, IPokemon } from 'pokeapi-typescript';
import { computed } from 'vue';

interface IProps {
  name: string;
  url: string;
  details: IEvolutionDetail[];
  pokemon: IPokemon;
  totalEvolutions: number;
  isNonLinear?: boolean;
}
const props = defineProps<IProps>();

const sprite = computed(() => {
  const { other } = props.pokemon.sprites as IPokemonSpritesUpdated;
  return other['official-artwork'].front_default;
});

const isArrowVis = computed(() => {
  return (
    props.totalEvolutions >= 2 &&
    props.totalEvolutions <= 4 &&
    trigger.value !== 'base'
  );
});

function getTrigger(details) {
  const { trigger, min_happiness, min_level, item, known_move } = details;
  const wordNumToNum = { one: 1, two: 2, three: 3, four: 4, five: 5 };
  const genNineSteps = ['pawmot', 'brambleghast', 'rabsca'];
  if (min_level) {
    return `level ${min_level}`;
  } else if (genNineSteps.includes(props.name)) {
    return '1000 steps';
  } else if (props.name === 'annihilape') {
    return '20 rage fists';
  } else if (props.name === 'kingambit') {
    return "Leader's Crest + defeat 3 Bisharp";
  } else if (props.name === 'gholdengo') {
    return '999 Gimmighoul Coins';
  } else if (min_happiness) {
    return `happiness ${min_happiness}`;
  } else if (item?.name) {
    return item.name.replace('-', ' ');
  } else if (trigger.name === 'trade') {
    return trigger.name;
  } else if (trigger.name.includes('critical')) {
    const split = trigger.name.split('-');
    split[0] = wordNumToNum[split[0]];
    return split.join(' ');
  } else if (known_move?.name) {
    return `learn ${known_move.name.replace('-', ' ')}`;
  } else return null;
}

const trigger = computed(() => {
  const detailsLength = props.details.length;
  if (props.totalEvolutions === 1) return 'no evolutions';
  if (!detailsLength) return 'base';
  const firstDetails = props.details[0];
  const lastDetails = props.details[detailsLength - 1];
  return getTrigger(firstDetails) || getTrigger(lastDetails);
});
</script>

<style scoped lang="scss">
.pokemon-card {
  $self: &;
  position: relative;
  height: fit-content;
  display: grid;
  grid-template-rows: 1fr auto;
  justify-content: center;
  align-items: center;
  color: $off-white;
  &__img-wrapper {
    position: relative;
    max-height: 100%;
    width: 100%;
  }
  img {
    width: 100%;
    filter: drop-shadow(4px 4px 8px rgba(black, 0.7));
  }

  h4 {
    width: 100%;
    padding-inline: gap(2);
    line-height: 1.5;
    text-transform: capitalize;
    text-align: center;
  }
  &__arrow {
    position: absolute;
    top: -15%;
    left: -15%;
    font-size: $font-size-5;
  }
  &__trigger {
    position: absolute;
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    max-width: 150px;
    width: 100%;
    font-size: $font-size-1;
    text-align: center;
    text-transform: capitalize;
  }
  &--non-linear {
    transform: scale(0.8);
    h4 {
      font-size: $font-size-1;
    }
    #{$self}__trigger {
      top: -10%;
      left: 50%;
      transform: translateX(-50%);
      max-width: 150px;
      width: 100%;
      font-size: $font-size-1;
      text-align: center;
    }
  }

  &--1 {
    #{$self}__trigger {
      top: -2%;
    }
  }

  &--2 {
    #{$self}__trigger {
      top: -5%;
    }
    #{$self}__arrow {
      top: -8%;
    }
  }
}
</style>
