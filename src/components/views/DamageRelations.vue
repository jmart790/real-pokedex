<template>
  <section class="damage-relations">
    <!-- <p v-if="isLoading">loading...</p> -->
    <div
      class="damage-relations__groups"
      :class="{ 'damage-relations__groups--loaded': !isLoading }"
    >
      <DamageGroup
        class="damage-relations__group"
        v-bind="{
          group: 'half',
          types: damageRelations?.half.types || [],
          relation
        }"
      />
      <DamageGroup
        class="damage-relations__group"
        v-bind="{
          group: 'double',
          types: damageRelations?.double.types || [],
          relation
        }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { watch, ref, computed } from 'vue';
import PokeAPI, {
  type INamedApiResource,
  type IType,
  type ITypeRelations
} from 'pokeapi-typescript';

interface IDamageRelation {
  group: string;
  types: string[];
}
interface IDamageRelations {
  half: IDamageRelation;
  double: IDamageRelation;
}

const props = defineProps<{
  relation: 'from' | 'to';
}>();

const pokeStore = usePokeStore();

const { activePokemonType } = storeToRefs(pokeStore);
const damageRelations = ref<IDamageRelations>();
const isLoading = ref(false);

const gridColumns = computed(() => {
  if (!damageRelations?.value) return '1fr 1fr';
  const { half, double } = damageRelations.value;
  const total = half.types.length + double.types.length;
  const halfCount = (half.types.length / total) * 10;
  const doubleCount = (double.types.length / total) * 10;
  return `${halfCount}fr ${doubleCount}fr`;
});

function transformData(data: ITypeRelations) {
  return Object.keys(data).reduce((relations, groupName) => {
    const types = data[groupName].map(
      (item: INamedApiResource<IType>) => item.name
    );
    if (types?.length && groupName.includes(props.relation)) {
      const key = groupName.includes('half') ? 'half' : 'double';
      relations[key] = { group: groupName, types: types };
    }
    return relations;
  }, {} as IDamageRelations);
}

async function getDamageRelations(type: string) {
  isLoading.value = true;
  await PokeAPI.Type.resolve(type)
    .then(({ damage_relations }) => {
      damageRelations.value = transformData(damage_relations);
    })
    .catch((e) => console.log({ e }));
  isLoading.value = false;
}

watch(
  () => props.relation,
  () => getDamageRelations(activePokemonType.value),
  { immediate: true }
);

watch(activePokemonType, (type) => getDamageRelations(type));
</script>

<style scoped lang="scss">
.damage-relations {
  @include cool-bg;
  padding: $medium-window-padding;
  &__groups {
    height: 100%;
    width: 100%;
    // display: flex;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: v-bind(gridColumns);
    border-top: 1px solid $glass-white;
    transition: grid-template-columns 1s;
    will-change: grid-template-columns;
  }
  &__group:first-of-type {
    border-right: 1px solid $glass-white;
  }
  &__group {
    flex-shrink: 1;
  }
}
</style>
