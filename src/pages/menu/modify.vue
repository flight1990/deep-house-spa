<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {useTreeData} from "../../composables/useTreeData.js";
import {computed, onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
})

const {getState, dispatchAction} = useStoreModule('menuStore')

const item = getState('item')
const parents = computed(() => useTreeData(getState('items').value))

const payload = ref({
  name: '',
  url: '',
  parent_id: ''
})

const intPayload = (data) => {
  payload.value.name = data.name
  payload.value.url = data.url
  payload.value.parent_id = data.parent_id ?? ''
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

  await dispatchAction('fetchItems', {id: id})
})

</script>

<template>
  <div>
    <form>
      <div>
        <label for="parent_id">Parent</label>
        <select name="parent_id" id="parent_id" v-model="payload.parent_id">
          <option value="">Choose parent...</option>
          <option :value="parent.id" v-for="parent in parents" :key="parent.id">{{ parent.name }}</option>
        </select>
      </div>

      <div>
        <label for="name">Name:</label>
        <input v-model="payload.name" type="text" id="name">
      </div>

      <div>
        <label for="url">Url:</label>
        <input v-model="payload.url" type="text" id="url">
      </div>

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div>
</template>
