<template>
  <section class="damage-relations">
    <DefenseType
      v-for="{ group, types } in testing"
      :key="`defense-group--${group}`"
      v-bind="{ group, types }"
    />
  </section>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import PokeAPI, {
  type INamedApiResource,
  type IType,
  type ITypeRelations
} from 'pokeapi-typescript';
import { onMounted, ref } from 'vue';

interface IDamageRelation {
  group: string;
  types: string[];
}

const pokeStore = usePokeStore();

const { activePokemon } = storeToRefs(pokeStore);
const damageRelations = ref<IDamageRelation[]>();

function transformData(data: ITypeRelations) {
  Object.keys(data).reduce((relations, groupName) => {
    const types = data[groupName].map(
      (item: INamedApiResource<IType>) => item.name
    ) || [''];
    relations.push({ group: groupName, types: types });
    return relations;
  }, []);
}

async function getDamageRelations(type: string) {
  await PokeAPI.Type.resolve(type).then(({ damage_relations }) => {
    damageRelations.value = transformData(damage_relations);
  });
}

onMounted(() => {
  const type = activePokemon.value?.types[0]?.type?.name || '';
  getDamageRelations(type);
});

const testing = [
  { group: 'very weak', types: ['ice'] },
  { group: 'weak', types: ['rock', 'dragon', 'fairy'] },
  { group: 'resistant', types: ['fire', 'water', 'fighting', 'bug'] },
  { group: 'very resistant', types: ['grass'] }
];
</script>

<style scoped lang="scss">
.damage-relations {
  @include cool-bg;
  padding: $medium-window-padding;
  display: grid;
  // grid-template-columns: repeat(4, 1fr);
  gap: gap(2);
}
</style>
