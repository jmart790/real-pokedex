<template>
  <section class="main-menu">
    <img src="@/assets/images/pokedex_logo.png" alt="Pokedex logo" >
    <div class="main-menu__options">
      <FrostCard>
        <p class="main-menu__option" :class="{'main-menu__option--active': menuPosition === 0 }">Pokemon</p>
      </FrostCard>
      <FrostCard>
        <p class="main-menu__option" :class="{'main-menu__option--active': menuPosition === 1 }">Generations</p>
      </FrostCard>
      <FrostCard>
        <p class="main-menu__option" :class="{'main-menu__option--active': menuPosition === 2 }">Me</p>
      </FrostCard>
      <FrostCard>
        <p class="main-menu__option" :class="{'main-menu__option--active': menuPosition === 3 }">Credits</p>
      </FrostCard>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useControlsStore } from '@/store/controls';
import { storeToRefs } from 'pinia';

const controlsStore = useControlsStore();
const { menuPosition } = storeToRefs(controlsStore);

</script>

<style scoped lang="scss">
.main-menu {
  @include cool-bg;
  padding: gap(9) gap(5);
  img {
    height: 110px;
    width: 330px;
    display: block;
    margin-inline: auto;
    margin-block: gap(2) gap(10);
  }
  &__options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: gap(4);
  }
  &__option {
    padding: gap(3) gap(4);
    font-size: rem(18);
    &--active {
      color: white;
    }
  }
}
</style>