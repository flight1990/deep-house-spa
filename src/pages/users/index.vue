<script setup>
import { useStoreModule } from "../../composables/useStoreModule.js";
import { onMounted, ref } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ContextMenu from "primevue/contextmenu";
import router from "../../router/index.js";

const { getState, dispatchAction } = useStoreModule("usersStore");

const params = getState("params");
const loading = getState("loading");
const items = getState("items");
const total = getState("total");

const onPageUpdated = (e) => {
  dispatchAction("fetchItems", {
    page: e.page + 1,
    limit: e.rows,
  });
};

onMounted(() => dispatchAction("fetchItems"));

const cm = ref();
const selectedProduct = ref();
const onRowContextMenu = (event) => {
  cm.value.show(event.originalEvent);
};
const menuModel = ref([
  {
    label: "Edit",
    icon: "pi pi-pencil",
    command: () => {
      router.push({ name: "users.edit", params: { id: selectedProduct.value.id } });
    },
  },
  {
    label: "Delete",
    icon: "pi pi-trash",
    command: () => {
      dispatchAction("deleteItem", selectedProduct.value.id);
    },
  },
]);
</script>

<template>
  <div>
    <router-link :to="{ name: 'users.create' }"> Create new user </router-link>
    <ContextMenu ref="cm" :model="menuModel" @hide="selectedProduct = null" />
    <DataTable
      tableStyle="min-width: 50rem"
      :first="(params.page - 1) * params.limit"
      :value="items"
      :lazy="true"
      :loading="loading"
      :paginator="true"
      :rows="params.limit"
      :rowsPerPageOptions="[5, 10, 20, 50]"
      :totalRecords="total"
      @page="onPageUpdated"
      contextMenu
      v-model:contextMenuSelection="selectedProduct"
      @rowContextmenu="onRowContextMenu"
    >
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="actions" header="Actions">
        <template #body="slotProps">
          <router-link :to="{ name: 'users.edit', params: { id: slotProps.data.id } }"
            >Edit</router-link
          >
          <a href="#" @click.prevent="dispatchAction('deleteItem', slotProps.data.id)"
            >Delete</a
          >
        </template>
      </Column>
    </DataTable>

    params: {{ params }} total: {{ total }}
  </div>
</template>
