<script setup>
import { useStoreModule } from "@/composables/useStoreModule.js";
import { onMounted, ref } from "vue";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import router from "../../router/index.js";

const { getState, dispatchAction } = useStoreModule("pagesStore");

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
  { field: "id", header: "ID" },
  { field: "name", header: "Имя" },
]);

const selectedItem = ref();
const confirm = useConfirm();
const toast = useToast();

const editSelectedItem = () => {
  router.push({ name: "pages.edit", params: { id: selectedItem.value.id } });
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
        detail: "Страница " + selectedItem.value.name + " успешно удалена!",
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
          <div>Страницы</div>
          <div class="flex items-center gap-x-2">
            <Button
              as="router-link"
              :to="{ name: 'pages.create' }"
              icon="pi pi-plus"
              severity="success"
              size="small"
              v-tooltip.bottom="{ value: 'Создать', showDelay: 1000, hideDelay: 300 }"
            />
            <Button
              icon="pi pi-pencil"
              severity="warn"
              size="small"
              v-tooltip.bottom="{
                value: 'Редактировать',
                showDelay: 1000,
                hideDelay: 300,
              }"
              :disabled="!selectedItem"
              @click.prevent="editSelectedItem()"
            />
            <Button
              icon="pi pi-trash"
              severity="danger"
              size="small"
              v-tooltip.bottom="{ value: 'Удалить', showDelay: 1000, hideDelay: 300 }"
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
          <Column
            v-for="col in columns"
            :field="col.field"
            :header="col.header"
            :key="col.field"
          ></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>
