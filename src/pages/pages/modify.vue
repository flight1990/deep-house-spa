<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
})

const {getState, dispatchAction} = useStoreModule('pagesStore');
const item = getState('item');

const payload = ref({
  name: '',
  body: ''
})

const intPayload = (data) => {
  payload.value.name = data.name
  payload.value.body = data.body
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
    intPayload(item.value)
  }
})

</script>

<template>
  <div>
    <form>
      <div>
        <label for="name">Name:</label>
        <input v-model="payload.name" type="text" id="name">
      </div>

      <div>
        <label for="body">Body:</label>
        <textarea rows="10" cols="150" v-model="payload.body" id="body"></textarea>
      </div>

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div>
</template>