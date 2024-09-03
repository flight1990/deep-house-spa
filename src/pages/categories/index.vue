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

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>
          <router-link :to="{name: 'categories.edit', params: {id: item.id}}">Edit</router-link>
        </td>
      </tr>
      </tbody>
    </table>

    loading: {{ loading }}
  </div>
</template>

<style scoped>

</style>