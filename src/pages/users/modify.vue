<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
});

const {getState, dispatchAction} = useStoreModule('usersStore');

const payload = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
});

const fetchItem = async (id) => {
  if (!id) return;

  await dispatchAction('fetchItem', id);
  const item = getState('item');

  if (item) {
    payload.value.name = item.value.name
    payload.value.email = item.value.email
  }
};

onMounted(() => fetchItem(id));

</script>

<template>
  <div>
    <form>
      <div>
        <label for="name">Name:</label>
        <input v-model="payload.name" type="text" id="name">
      </div>

      <div>
        <label for="email">Email:</label>
        <input v-model="payload.email" type="text" id="email">
      </div>

      <div>
        <label for="password">Password:</label>
        <input v-model="payload.password" type="password" id="password">
      </div>

      <div>
        <label for="password_confirmation">Confirm Password:</label>
        <input v-model="payload.password_confirmation" type="password" id="password_confirmation">
      </div>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped>

</style>
