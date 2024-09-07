<script setup>
import {ref} from "vue";
import {routes} from "../router/routes.js";
import {computed} from "vue";

import Button from 'primevue/button';

import TheNavigation from "../components/TheNavigation.vue";
import TheTopBar from "../components/TheTopBar.vue";
import TheSideBar from "../components/TheSideBar.vue";

const sidebar = ref(false);

const menu = computed(() => routes.find(r => r.children).children.filter(c => c.meta.showInMenu))

</script>

<template>

  <Button label="Primary" />
  <Button label="Secondary" severity="secondary" />
  <Button label="Success" severity="success" />
  <Button label="Info" severity="info" />
  <Button label="Warn" severity="warn" />
  <Button label="Help" severity="help" />
  <Button label="Danger" severity="danger" />
  <Button label="Contrast" severity="contrast" />

  <TheTopBar
    v-model:sidebar="sidebar"
  >
    <template #title="{model, onModelClick}" >
      {{ model }}
    </template>

  </TheTopBar>

  <TheSideBar
      :sidebar="sidebar"
  />

  <TheNavigation
    :routes="menu"
  />

  <main>
    <router-view/>
  </main>
</template>