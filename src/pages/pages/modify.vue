<script setup>
import { useStoreModule } from "@/composables/useStoreModule.js";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const { id } = defineProps({
  id: String,
});

const { getState, dispatchAction } = useStoreModule("pagesStore");
const item = getState("item");

const payload = ref({
  name: "",
  body: "",
});

const intPayload = (data) => {
  payload.value.name = data.name;
  payload.value.body = data.body;
};

const onSubmit = () => {
  if (id) {
    dispatchAction("updateItem", { payload: payload.value, id: id });
    toast.add({
      severity: "success",
      summary: "Успех!",
      detail: "Страница успешно изменена!",
      life: 3000,
    });
  } else {
    dispatchAction("createItem", payload.value);
    toast.add({
      severity: "success",
      summary: "Успех!",
      detail: "Страница успешно создана!",
      life: 3000,
    });
  }
};

onMounted(async () => {
  if (id) {
    await dispatchAction("fetchItem", id);
    intPayload(item.value);
  }
});
</script>

<template>
  <div>
    <Card>
      <template #title>
        <div class="flex items-center justify-between gap-x-10 gap-y-4">
          <div class="flex items-center gap-x-2">
            <Button
              as="router-link"
              :to="{ name: 'pages.index' }"
              icon="pi pi-arrow-left"
              severity="secondary"
              text
            />
            {{
              payload.name
                ? "Редактировать страницу"
                : "Создать страницу"
            }}
          </div>
          <div class="flex items-center gap-x-2"></div>
        </div>
      </template>
      <template #content>
        <form class="space-y-4">
          <div class="flex flex-col gap-y-1">
            <label for="name">Название</label>
            <InputText id="name" v-model="payload.name" type="text" :invalid="false" />
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <div class="flex flex-col gap-y-1">
            <label for="body">Тело страницы</label>
            <Textarea id="body" v-model="payload.body" rows="3" cols="30" autoResize :invalid="false" />
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <Button
            type="submit"
            @click.prevent="onSubmit()"
            label="Сохранить"
            severity="success"
          />
        </form>
      </template>
    </Card>
  </div>
</template>
