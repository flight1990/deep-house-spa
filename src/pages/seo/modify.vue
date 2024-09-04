<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
})

const {getState, dispatchAction} = useStoreModule('seoStore')
const item = getState('item')

const payload = ref({
  title: '',
  description: '',
  keywords: '',
  index: false,
  follow: false
})

const initPayload = (data) => {
  payload.value.title = data.title
  payload.value.description = data.description
  payload.value.keywords = data.keywords
  payload.value.index = data.index
  payload.value.follow = data.follow
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
})

</script>

<template>
  <div>
    <form>
      <div>
        <label for="title">Title:</label>
        <input v-model="payload.title" type="text" id="title">
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea rows="10" cols="150" v-model="payload.description" id="description"></textarea>
      </div>

      <div>
        <label for="keywords">keywords:</label>
        <input v-model="payload.keywords" type="text" id="keywords">
      </div>

      <div>
        <label for="index">Index</label>
        <input type="checkbox" v-model="payload.index" id="index">
      </div>

      <div>
        <label for="follow">Follow</label>
        <input type="checkbox" v-model="payload.follow" id="follow">
      </div>

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div>
</template>
