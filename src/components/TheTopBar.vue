<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from "vue-router";

  import Toolbar from 'primevue/toolbar';

  const sidebarIsOpen = defineModel('sidebarIsOpen', {default: false})
  const onSidebarClick = () => {
    sidebarIsOpen.value = !sidebarIsOpen.value
  }

  const colorScheme = ref(false);
  const toggleColorScheme = () => {
    colorScheme.value = !colorScheme.value;
    const element = document.querySelector('html');
    element.classList.toggle('dark');
  }
  

  const router = useRouter();
  const title = computed(() =>
    router.currentRoute.value.meta.title
  );
</script>

<template>
  <Toolbar class="!border-x-0 !border-t-0 !rounded-none transition-all p-4 lg:p-8 lg:ml-72">
    <template #start>
      <Button icon="pi pi-bars" class="lg:!hidden" severity="secondary" text @click.prevent="onSidebarClick()" />
      <span class="text-xl font-semibold ml-4">
        {{title}}
      </span>
    </template>
    <template #end>
      <Button :icon=" colorScheme ? 'pi pi-sun' : 'pi pi-moon' " class="" severity="secondary" text @click.prevent="toggleColorScheme()" />
    </template>
  </Toolbar>

  <!-- <div>
    <slot>
      <button @click.prevent="onModelClick">
        <slot name="title" :model="model" :onModelClick="onModelClick">
          {{ model ? 'on' : 'off' }}
        </slot>
      </button>
    </slot>
  </div> -->
</template>