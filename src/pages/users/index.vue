<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted} from "vue";

const {getState, dispatchAction} = useStoreModule('usersStore');

const params = getState('params')
const loading = getState('loading')
const items = getState('items')
const total = getState('total')

onMounted(() => dispatchAction('fetchItems'))

</script>

<template>
  <div>
    <router-link :to="{name: 'users.create'}">
      Create new user
    </router-link>

    <pre>
      {{ items }}
    </pre>

    params: {{ params }}
    loading: {{ loading }}
    total: {{ total }}
  </div>
</template>

<style scoped>

</style>
