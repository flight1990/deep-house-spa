<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted} from "vue";
import TheCategoriesTree from "../../components/TheCategoriesTree.vue";

const {getState, dispatchAction} = useStoreModule('categoriesStore')

const loading = getState('loading')
const items = getState('items')

onMounted(async () => await dispatchAction('fetchItems'))

</script>

<template>
  <div>
    <router-link :to="{name: 'categories.create'}">
      Create new category
    </router-link>

    <TheCategoriesTree
        :items="items"
        @item:deleted="dispatchAction('deleteItem', $event)"
    />

    loading: {{ loading }}
  </div>
</template>