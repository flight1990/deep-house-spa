<script setup>
import { routes } from "@/router/routes.js";
import { computed } from "vue";

import ScrollPanel from "primevue/scrollpanel";

const sidebarIsOpen = defineModel("sidebarIsOpen", { default: false });
const onSidebarClick = () => {
  sidebarIsOpen.value = !sidebarIsOpen.value;
};

const menuItems = computed(() =>
  routes.find((r) => r.children).children.filter((c) => c.meta.showInMenu)
);
</script>

<template>
  <div v-if="sidebarIsOpen" class="lg:hidden fixed inset-0 w-full h-full z-[998] bg-black/40 backdrop-blur-sm animate-fadein" @click.prevent="onSidebarClick()"></div>
  <nav
    class="fixed inset-0 w-72 h-full shadow-xl bg-white dark:bg-surface-900 border-r dark:border-surface-700 transition-all z-[999] -translate-x-full lg:translate-x-0"
    :class="sidebarIsOpen ? 'translate-x-0' : ''"
  >
    <div class="h-full flex flex-col justify-between gap-4">
      <div class="flex flex-col items-center justify-center py-4">
        <div class="text-3xl font-bold text-primary">Deep House</div>
        <div class="uppercase text-sm mt-2">Панель управления</div>
      </div>
      <div class="flex-1 h-full">
        <ScrollPanel
          class="h-full"
          pt:barY:class="!w-1.5 !bg-surface-200 dark:!bg-surface-700 -translate-x-1"
        >
          <ul class="px-3">
            <li v-for="item in menuItems" :key="item.name">
              <router-link
                :to="{ name: item.name }"
                class="px-3 py-2 flex items-center justify-between gap-x-4 rounded hover:bg-surface-100 dark:hover:bg-surface-800"
                exactActiveClass="font-bold"
                @click.prevent="onSidebarClick()"
              >
                <span :class="item.meta.icon" class="text-primary" />
                <span class="flex-1">{{ item.meta.title }}</span>
              </router-link>
            </li>
          </ul>
        </ScrollPanel>
      </div>
      <!-- <div>123</div> -->
    </div>
  </nav>
</template>
