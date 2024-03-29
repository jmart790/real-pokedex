<template>
  <section class="damage-relations">
    <PikachuLoader v-if="isLoading" />
    <ErrorCard v-else-if="hasError" />
    <div v-else class="damage-relations__groups" :class="{ 'damage-relations__groups--loaded': !isLoading }">
      <DamageGroup
        class="damage-relations__group"
        v-bind="{
          group: 'half',
          types: damageRelations?.half?.types || [],
          relation
        }"
      />
      <DamageGroup
        class="damage-relations__group"
        v-bind="{
          group: 'double',
          types: damageRelations?.double?.types || [],
          relation
        }"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { useControlsStore } from '@/store/controls';
import { storeToRefs } from 'pinia';
import { watchEffect, ref, computed } from 'vue';
import PokeAPI, { type INamedApiResource, type IType, type ITypeRelations } from 'pokeapi-typescript';
import { useLoading } from '@/composables/useLoading';

interface IDamageRelation {
  group: string;
  types: string[];
}
interface IDamageRelations {
  half: IDamageRelation;
  double: IDamageRelation;
}

const { isLoading, executeFn } = useLoading(getDamageRelations);

const props = defineProps<{
  relation: 'from' | 'to';
}>();

const pokeStore = usePokeStore();
const controlsStore = useControlsStore();

const { isYoshView } = storeToRefs(controlsStore);
const { activePokemonType } = storeToRefs(pokeStore);
const damageRelationsRawResponse = ref<ITypeRelations>();
const hasError = ref(false);

const gridColumns = computed(() => {
  if (!damageRelations?.value) return '1fr 1fr';
  const { half, double } = damageRelations.value;
  const halfTotal = half?.types?.length || 1;
  const doubleTotal = double?.types?.length || 1;
  const total = halfTotal + doubleTotal;
  const halfCount = (halfTotal / total) * 10;
  const doubleCount = (doubleTotal / total) * 10;
  return `${halfCount}fr ${doubleCount}fr`;
});

const damageRelations = computed(() => {
  const data = damageRelationsRawResponse?.value;
  if (!data) return;
  const dataTransformed = Object.keys(data).reduce((relations, groupName) => {
    const types = data[groupName].map((item: INamedApiResource<IType>) => item.name) || [];
    if (types?.length && groupName.includes(props.relation)) {
      const key = groupName.includes('half') ? 'half' : 'double';
      relations[key] = { group: groupName, types };
    }
    return relations;
  }, {} as IDamageRelations);
  return dataTransformed;
});

function handleFailure(e) {
  console.log({ e });
  hasError.value = true;
}

async function getDamageRelations(type: string) {
  const payload = isYoshView.value ? 'grass' : type;
  await PokeAPI.Type.resolve(payload)
    .then(({ damage_relations }) => (damageRelationsRawResponse.value = damage_relations))
    .catch((e) => handleFailure(e));
}

watchEffect(() => executeFn(activePokemonType.value));
</script>

<style scoped lang="scss">
.damage-relations {
  @include cool-bg;
  padding: $medium-window-padding;
  &__groups {
    height: 100%;
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: v-bind(gridColumns);
    transition: grid-template-columns 1s;
    will-change: grid-template-columns;
  }
  &__group:first-of-type {
    border-right: 2px solid $glass-white;
  }
  &__group {
    flex-shrink: 1;
  }
}
</style>
