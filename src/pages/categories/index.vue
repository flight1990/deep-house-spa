<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted} from "vue";
import TheCategoriesTree from "../../components/TheCategoriesTree.vue";

const {getState, dispatchAction} = useStoreModule('categoriesStore')

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
    <router-link :to="{name: 'categories.create'}">
      Create new category
    </router-link>

    <TheCategoriesTree
        :items="items"
        @item:deleted="onDelete"
    />

    loading: {{ loading }}
  </div>
</template>