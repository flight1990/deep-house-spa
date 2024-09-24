<script setup>
import { useStoreModule } from "@/composables/useStoreModule.js";
import { onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const { id } = defineProps({
  id: String,
});

const { getState, dispatchAction } = useStoreModule("usersStore");
const item = getState("item");

const payload = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});

const initPayload = (data) => {
  payload.value.name = data.name;
  payload.value.email = data.email;
};

const onSubmit = () => {
  if (!payload.value.password) {
    delete payload.value.password;
  }
  if (id) {
    dispatchAction("updateItem", { payload: payload.value, id: id });
    toast.add({
      severity: "success",
      summary: "Успех!",
      detail: "Пользователь " + payload.value.name + " успешно изменен!",
      life: 3000,
    });
  } else {
    dispatchAction("createItem", payload.value);
    toast.add({
      severity: "success",
      summary: "Успех!",
      detail: "Пользователь " + payload.value.name + "  успешно создан!",
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
              :to="{ name: 'users.index' }"
              icon="pi pi-arrow-left"
              severity="secondary"
              text
            />
            {{
              payload.name
                ? "Редактировать пользователя " + payload.name
                : "Создать пользователя"
            }}
          </div>
          <div class="flex items-center gap-x-2"></div>
        </div>
      </template>
      <template #content>
        <form class="space-y-4">
          <div class="flex flex-col gap-y-1">
            <label for="name">Имя пользователя</label>
            <InputText id="name" v-model="payload.name" type="text" :invalid="false" />
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <div class="flex flex-col gap-y-1">
            <label for="email">Email пользователя</label>
            <InputText id="email" v-model="payload.email" type="email" :invalid="false" />
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <div class="flex flex-col gap-y-1">
            <label for="password">Пароль</label>
            <InputText
              id="password"
              v-model="payload.password"
              type="password"
              :invalid="false"
            />
            <small v-if="false" class="text-red-500">Error message</small>
          </div>
          <div class="flex flex-col gap-y-1">
            <label for="password_confirmation">Подтверждение пароля</label>
            <InputText
              id="password_confirmation"
              v-model="payload.password_confirmation"
              type="password"
              :invalid="false"
            />
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
