<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted} from "vue";

const {getState, dispatchAction} = useStoreModule('categoriesStore');

const loading = getState('loading')
const items = getState('items')

onMounted(() => dispatchAction('fetchItems'))

</script>

<template>
  <div>
    <router-link :to="{name: 'categories.create'}">
      Create new category
    </router-link>

    <pre>
      {{ items }}
    </pre>

    loading: {{ loading }}
  </div>
</template>

<style scoped>

</style>