<template>
  <section class="damage-relations">
    <p v-if="isLoading">loading...</p>
    <div v-else-if="damageRelations" class="damage-relations__groups-wrapper">
      <div class="damage-relations__groups">
        <DamageGroup v-bind="{ ...damageRelations[1] }" />
        <DamageGroup v-bind="{ ...damageRelations[0] }" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { usePokeStore } from '@/store/pokemon';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import PokeAPI, {
  type INamedApiResource,
  type IType,
  type ITypeRelations
} from 'pokeapi-typescript';

interface IDamageRelation {
  group: string;
  types: string[];
}

const pokeStore = usePokeStore();

const { activePokemon } = storeToRefs(pokeStore);
const damageRelations = ref<IDamageRelation[]>();
const isLoading = ref(false);

function transformData(data: ITypeRelations): IDamageRelation[] {
  return Object.keys(data).reduce((relations, groupName) => {
    const types = data[groupName].map(
      (item: INamedApiResource<IType>) => item.name
    );
    if (types?.length && groupName.includes('from')) {
      relations.push({ group: groupName, types: types });
    }
    return relations;
  }, [] as IDamageRelation[]);
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

onMounted(() => {
  const type = activePokemon.value?.types[0]?.type?.name || '';
  getDamageRelations(type);
});
</script>

<style scoped lang="scss">
.damage-relations {
  @include cool-bg;
  padding: $medium-window-padding;
  &__groups-wrapper {
    height: 100%;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    border-radius: $cool-border-radius;
  }
  &__groups {
    height: 100%;
    width: 100%;
    display: flex;
    @include frost-bg;
    border-radius: $cool-border-radius;
    overflow: hidden;
  }
  &__guide {
    position: absolute;
    height: 100%;
    width: 100%;
    padding: $medium-window-padding;
    p {
      position: absolute;
      width: fit-content;
      background-color: rgba(black, 0.5);
      border-radius: 20px;
      padding: 2px gap(2);
      color: rgba(white, 0.8);
    }
    p:nth-of-type(1),
    p:nth-of-type(2) {
      left: 50%;
      transform: translateX(-50%);
    }
    p:nth-of-type(2) {
      bottom: 12px;
    }
    p:nth-of-type(3),
    p:nth-of-type(4) {
      top: 50%;
      transform: translateY(-50%);
    }
    p:nth-of-type(4) {
      right: 14px;
    }
  }
}
</style>
