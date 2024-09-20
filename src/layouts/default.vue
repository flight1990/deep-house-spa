<script setup>
import { ref } from "vue";
import { routes } from "../router/routes.js";
import { computed } from "vue";

import TheNavigation from "../components/TheNavigation.vue";
import TheTopBar from "../components/TheTopBar.vue";
import TheSideBar from "../components/TheSideBar.vue";

const sidebarIsOpen = ref(false);

</script>
<template>
    <div class="min-h-screen bg-surface-100 dark:bg-surface-950">
        <TheSideBar v-model:sidebarIsOpen="sidebarIsOpen"/>
        <TheTopBar v-model:sidebarIsOpen="sidebarIsOpen"/>
        <main class="overflow-auto transition-all p-4 lg:p-8 lg:ml-72">
            <router-view/>
        </main>
    </div>
</template>
