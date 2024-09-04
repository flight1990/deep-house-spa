<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {useTreeData} from "../../composables/useTreeData.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
})

const {getState, dispatchAction} = useStoreModule('categoriesStore')
const {processedData: processedParents, setTree} = useTreeData()

const item = getState('item')
const parents = getState('items')

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

  await dispatchAction('setParams', {id: id})
  await dispatchAction('fetchItems')

  setTree(parents.value)
})

</script>

<template>
  <div>
    <form>
      <div>
        <label for="parent_id">Parent</label>
        <select name="parent_id" id="parent_id" v-model="payload.parent_id">
          <option value="">Choose parent...</option>
          <option :value="parent.id" v-for="parent in processedParents" :key="parent.id">{{ parent.name }}</option>
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