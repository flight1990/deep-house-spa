<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
})

const {getState, dispatchAction} = useStoreModule('reviewsStore')
const item = getState('item')

const payload = ref({
  title: '',
  message: '',
  is_active: false
})

const initPayload = (data) => {
  payload.value.title = data.title
  payload.value.message = data.message
  payload.value.is_active = data.is_active
}

const onSubmit = () => {
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
        <label for="title">Title:</label>
        <input v-model="payload.title" type="text" id="title">
      </div>

      <div>
        <label for="message">Message:</label>
        <textarea rows="10" cols="150" v-model="payload.message" id="message"></textarea>
      </div>

      <div>
        <label for="is_active">Active</label>
        <input type="checkbox" v-model="payload.is_active" id="is_active">
      </div>

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div>
</template>
