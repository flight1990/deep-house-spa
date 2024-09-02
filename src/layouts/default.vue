<script setup>

import {routes} from "../router/routes.js";
import {computed} from "vue";
import TheNavigation from "../components/TheNavigation.vue";

const menu = computed(() => routes.find(r => r.children).children.filter(c => c.meta.showInMenu))

</script>

<template>
  <TheNavigation
    :routes="menu"
  />

  <main>
    <router-view/>
  </main>
</template>