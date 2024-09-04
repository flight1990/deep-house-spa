<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {useTreeData} from "../../composables/useTreeData.js";
import {computed, onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
})

const {getState, dispatchAction} = useStoreModule('categoriesStore')

const item = getState('item')
const parents = computed(() => useTreeData(getState('items').value))

const payload = ref({
  name: '',
  parent_id: '',
})

const intPayload = (data) => {
  payload.value.name = data.name
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

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div>
</template>