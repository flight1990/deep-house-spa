<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted} from "vue";

const {getState, dispatchAction} = useStoreModule('pagesStore');

const params = getState('params')
const loading = getState('loading')
const items = getState('items')
const total = getState('total')

const onDelete = async (id) => {
  await dispatchAction('deleteItem', id)
}

onMounted(async () => await dispatchAction('fetchItems'))

</script>

<template>
  <div>
    <router-link :to="{name: 'pages.create'}">
      Create new page
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
          <router-link :to="{name: 'pages.edit', params: {id: item.id}}">Edit</router-link>
          <a href="#" @click.prevent="onDelete(item.id)">Delete</a>
        </td>
      </tr>
      </tbody>
    </table>

    params: {{ params }}
    loading: {{ loading }}
    total: {{ total }}
  </div>
</template>