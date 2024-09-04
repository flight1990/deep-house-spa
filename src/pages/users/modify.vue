<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
})

const {getState, dispatchAction} = useStoreModule('usersStore')
const item = getState('item')

const payload = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const initPayload = (data) => {
  payload.value.name = data.name
  payload.value.email = data.email
}

const onSubmit = () => {
  if (!payload.value.password) {
    delete payload.value.password
  }

  if (id) {
    dispatchAction('updateItem', {payload: payload.value, id: id})
  } else {
    dispatchAction('createItem', payload.value)
  }
}

onMounted(async () => {
  if (id) {
    await dispatchAction('fetchItem', id)
    initPayload(item.value)
  }
});

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

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div>
</template>
