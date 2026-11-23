<template>
  <article class="pokemon-search">
    <div class="pokemon-search__field">
      <FrostCard class="pokemon-search__frost">
        <input
          ref="inputElement"
          v-model="query"
          class="pokemon-search__input"
          type="text"
          enterkeyhint="search"
          placeholder="Name or number"
          aria-label="Search Pokemon by name or number"
          autocomplete="off"
          spellcheck="false"
        />
      </FrostCard>
    </div>
    <PokemonGrid
      v-if="searchResults.length"
      class="pokemon-search__grid"
      :pokemon="searchResults"
      :activeIndex="searchPosition"
    />
    <p v-else class="pokemon-search__message">{{ message }}</p>
  </article>
</template>

<script setup lang="ts">
import { computed, onActivated, onDeactivated, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { usePokeStore } from '@/store/pokemon';
import { useControlsStore } from '@/store/controls';

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();
const { searchQuery, searchResults, allPokemon } = storeToRefs(pokeStore);
const { searchPosition, activeBtn } = storeToRefs(controlsStore);
const inputElement = ref<HTMLInputElement | null>(null);

const query = computed({
  get: () => searchQuery.value,
  set: (value: string) => {
    pokeStore.setSearchQuery(value);
    controlsStore.setSearchPosition(0); // new results, start from the first one
  }
});

const message = computed(() => {
  if (!searchQuery.value.trim()) return 'Type a Pokemon name or number';
  if (!allPokemon.value.length) return 'Loading Pokedex...';
  return 'No Pokemon found';
});

function focusInput() {
  inputElement.value?.focus();
}

onActivated(() => {
  pokeStore.loadAllPokemon();
  // Coming back from a Pokemon (B) keeps the user browsing results; opening search starts in the field.
  if (activeBtn.value !== 'b') focusInput();
});

// Leaving the view hands the keyboard back to the Pokedex controls.
onDeactivated(() => inputElement.value?.blur());

// Pressing search again while here puts the cursor back in the field.
watch(activeBtn, (btn) => btn === 'search' && focusInput());
</script>

<style scoped lang="scss">
.pokemon-search {
  @include cool-bg;
  display: flex;
  flex-direction: column;

  &__field {
    padding: gap(9) gap(5) 0;
  }

  &__input {
    width: 100%;
    height: 40px;
    padding: 0 gap(4);
    border: none;
    border-radius: inherit;
    outline: none;
    background: transparent;
    font-family: $main-font;
    font-size: $font-size-3;
    color: $off-white;
    caret-color: $off-white;
    position: relative;
    z-index: 3;

    &::placeholder {
      color: rgba($off-white, 0.6);
    }
  }

  &__frost {
    transition: box-shadow 150ms ease-in-out, background-color 150ms ease-in-out;
  }

  // Typing mode: glowing ring + brighter field so it's clear keys go into the search
  &__field:focus-within &__frost {
    background-color: rgba(white, 0.15);
    box-shadow: 0 0 0 2px $off-white, 0 0 12px 2px rgba($off-white, 0.6);
  }

  &__message {
    padding: gap(6) gap(5);
    text-align: center;
    color: rgba($off-white, 0.8);
  }
}

// extra specificity so it wins over the grid's own height: 100%
.pokemon-search > .pokemon-search__grid {
  flex: 1;
  height: auto;
  min-height: 0;
  padding-top: gap(3);
}
</style>
