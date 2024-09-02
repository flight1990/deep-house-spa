<script setup>

const {routes} = defineProps({
  routes: {
    type: Array,
    required: true
  }
})

</script>

<template>
  <nav>
    <ul>
      <li v-for="route in routes" :key="route.name">



        <router-link :to="{name: route.name}">
          {{ route.meta.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>

</style>