<script setup>
import { useStoreModule } from "@/composables/useStoreModule.js";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const { id } = defineProps({
  id: String,
});

const { getState, dispatchAction } = useStoreModule("seoStore");
const item = getState("item");

const payload = ref({
  title: "",
  description: "",
  keywords: "",
  index: false,
  follow: false,
});

const initPayload = (data) => {
  payload.value.title = data.title;
  payload.value.description = data.description;
  payload.value.keywords = data.keywords;
  payload.value.index = data.index;
  payload.value.follow = data.follow;
};

const onSubmit = () => {
  if (id) {
    dispatchAction("updateItem", { payload: payload.value, id: id });
    toast.add({
      severity: "success",
      summary: "Успех!",
      detail: "Запись успешно изменена!",
      life: 3000,
    });
  } else {
    dispatchAction("createItem", payload.value);
    toast.add({
      severity: "success",
      summary: "Успех!",
      detail: "Запись успешно создана!",
      life: 3000,
    });
  }
};

onMounted(async () => {
  if (id) {
    await dispatchAction("fetchItem", id);
    initPayload(item.value);
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
              :to="{ name: 'seo.index' }"
              icon="pi pi-arrow-left"
              severity="secondary"
              text
            />
            {{ payload.title ? "Редактировать SEO " : "Создать SEO" }}
          </div>
          <div class="flex items-center gap-x-2"></div>
        </div>
      </template>
      <template #content>
        <form class="space-y-4">
          <div class="flex flex-col gap-y-1">
            <label for="title">Заголовок</label>
            <InputText id="title" v-model="payload.title" type="text" :invalid="false" />
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <div class="flex flex-col gap-y-1">
            <label for="description">Описание</label>
            <Textarea
              id="description"
              v-model="payload.description"
              rows="3"
              cols="30"
              autoResize
              :invalid="false"
            />
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <div class="flex flex-col gap-y-1">
            <label for="keywords">Ключевые слова</label>
            <InputText
              id="keywords"
              v-model="payload.keywords"
              type="text"
              :invalid="false"
            />
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <div class="flex flex-col gap-y-1">
            <div class="flex items-center gap-x-2">
              <Checkbox v-model="payload.index" id="index" inputId="index1" binary  />
              <label for="index1" class="select-none">Index</label>
            </div>
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <div class="flex flex-col gap-y-1">
            <div class="flex items-center gap-x-2">
              <Checkbox v-model="payload.follow" id="follow" inputId="follow1" binary  />
              <label for="follow1" class="select-none">Follow</label>
            </div>
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
  <!-- <div>
    <form>
      <div>
        <label for="title">Title:</label>
        <input v-model="payload.title" type="text" id="title" />
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea
          rows="10"
          cols="150"
          v-model="payload.description"
          id="description"
        ></textarea>
      </div>

      <div>
        <label for="keywords">keywords:</label>
        <input v-model="payload.keywords" type="text" id="keywords" />
      </div>

      <div>
        <label for="index">Index</label>
        <input type="checkbox" v-model="payload.index" id="index" />
      </div>

      <div>
        <label for="follow">Follow</label>
        <input type="checkbox" v-model="payload.follow" id="follow" />
      </div>

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div> -->
</template>
