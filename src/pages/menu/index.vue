<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted} from "vue";
import TheMenuTree from "../../components/TheMenuTree.vue";

const {getState, dispatchAction} = useStoreModule('menuStore')

const loading = getState('loading')
const items = getState('items')

const onDelete = async (id) => {
  await dispatchAction('deleteItem', id)
}

onMounted(async () => {
  await dispatchAction('setParams', {})
  await dispatchAction('fetchItems')
})

</script>

<template>
  <div>
    <router-link :to="{name: 'menu.create'}">
      Create new menu item
    </router-link>

    <TheMenuTree
        :items="items"
        @item:deleted="onDelete"
    />

    loading: {{ loading }}
  </div>
</template>