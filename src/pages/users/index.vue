<script setup>
import { useStoreModule } from "../../composables/useStoreModule.js";
import { onMounted, ref } from "vue";

import Card from "primevue/card";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
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

const columns = ref([
	{field: 'id', header: 'ID'},
	{field: 'name', header: 'Имя'},
	{field: 'email', header: 'Email'},
]);

const selectedItem = ref();
const confirm = useConfirm();
const toast = useToast();

const editSelectedItem = () => {
  router.push({ name: "users.edit", params: { id: selectedItem.value.id } });
};

const deleteSelectedItem = () => {
  confirm.require({
    header: "Внимание!",
    message: "Вы действительно хотите удалить " + selectedItem.value.name + "?",
    rejectProps: {
      label: "Отмена",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Удалить",
      severity: "danger",
    },
    accept: () => {
      dispatchAction("deleteItem", selectedItem.value.id);
      toast.add({
        severity: "info",
        summary: "Успех!",
        detail: "Пользователь " + selectedItem.value.name + " успешно удален!",
        life: 3000,
      });
      selectedItem.value = null;
    },
  });
};
</script>

<template>
  <div>
    <Card>
      <template #title>
        <div class="flex items-center justify-between flex-wrap gap-x-10 gap-y-4">
          <div>Пользователи</div>
          <div class="flex items-center gap-x-2">
            <Button
              as="router-link"
              :to="{ name: 'users.create' }"
              icon="pi pi-plus"
              severity="success"
              
              size="small"
			  v-tooltip.bottom="'Создать'"
            />
            <Button
              icon="pi pi-pencil"
              severity="warn"
              
              size="small"
			  v-tooltip.bottom="'Редактировать'"
              :disabled="!selectedItem"
              @click.prevent="editSelectedItem()"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              
              size="small"
			  v-tooltip.bottom="'Удалить'"
              :disabled="!selectedItem"
              @click.prevent="deleteSelectedItem()"
            />
          </div>
        </div>
      </template>
      <template #content>
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
          :pt="{
            pcPaginator: {
              paginatorContainer: { class: '!border-none' },
            },
          }"
          v-model:selection="selectedItem"
          selectionMode="single"
        >
          <template #empty> No customers found. </template>
		  <Column v-for="col in columns" :field="col.field" :header="col.header" :key="col.field"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>
