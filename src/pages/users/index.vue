<script setup>
import { useStoreModule } from "../../composables/useStoreModule.js";
import { onMounted, ref } from "vue";

import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ContextMenu from "primevue/contextmenu";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

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
const selectedItem = ref();
const selectedItemToDelete = ref();
const onRowContextMenu = (event) => {
  cm.value.show(event.originalEvent);
};
const menuModel = ref([
  {
    label: "Редактировать",
    icon: "pi pi-pencil",
	class: "text-sm",
    command: () => {
      router.push({ name: "users.edit", params: { id: selectedItem.value.id } });
    },
  },
  {
    label: "Удалить",
    icon: "pi pi-trash",
	class: "text-sm",
    command: () => {
		selectedItemToDelete.value = selectedItem.value;
      deleteItem(selectedItem.value.id);
    },
    // command: () => {
    //   dispatchAction("deleteItem", selectedItem.value.id);
    // },
  },
]);

const confirm = useConfirm();
const toast = useToast();

const deleteItem = () => {
    confirm.require({
        header: 'Внимание!',
        message: 'Вы действительно хотите удалить ' + selectedItemToDelete.value.name + '?',
        rejectProps: {
            label: 'Отмена',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Удалить',
            severity: 'danger'
        },
        accept: () => {
			dispatchAction("deleteItem", selectedItemToDelete.value.id);
            toast.add({ severity: 'info', summary: 'Успех!', detail: 'Пользователь ' + selectedItemToDelete.value.name + ' успешно удален!', life: 3000 });
			selectedItemToDelete.value = null;
        },
    });
};
</script>

<template>
  <div>
    <Card>
      <template #title>
        <div class="flex items-center justify-between gap-x-10 gap-y-4">
          <div>Пользователи</div>
          <div class="flex items-center gap-x-2">
            <Button
              as="router-link"
              :to="{ name: 'users.create' }"
              icon="pi pi-plus"
              label="Создать"
              outlined
            />
          </div>
        </div>
      </template>
      <template #content>
        <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
        <DataTable
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
          v-model:contextMenuSelection="selectedItem"
          @rowContextmenu="onRowContextMenu"
          :pt="{
            pcPaginator: {
              paginatorContainer: { class: '!border-none' },
            },
          }"
        >	
			<template #empty> No customers found. </template>
			<Column field="id" header="ID"></Column>
			<Column field="name" header="Имя"></Column>
			<Column field="email" header="Email"></Column>
        </DataTable>
      </template>
    </Card>

    <!-- <router-link :to="{ name: 'users.create' }"> Create new user </router-link>
    <ContextMenu ref="cm" :model="menuModel" @hide="selectedItem = null" />
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
      v-model:contextMenuSelection="selectedItem"
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

    params: {{ params }} total: {{ total }} -->
  </div>
</template>
