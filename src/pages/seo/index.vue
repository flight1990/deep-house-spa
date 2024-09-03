<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted} from "vue";

const {getState, dispatchAction} = useStoreModule('seoStore');

const params = getState('params')
const loading = getState('loading')
const items = getState('items')
const total = getState('total')

onMounted(() => dispatchAction('fetchItems'))

</script>

<template>
  <div>
    <router-link :to="{name: 'seo.create'}">
      Create new seo
    </router-link>

    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>
          <router-link :to="{name: 'seo.edit', params: {id: item.id}}">Edit</router-link>
        </td>
      </tr>
      </tbody>
    </table>

    params: {{ params }}
    loading: {{ loading }}
    total: {{ total }}
  </div>
</template>

<style scoped>

</style>