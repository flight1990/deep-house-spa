<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {computed, onMounted, ref} from "vue";
import {useTreeData} from "../../composables/useTreeData.js";

const {id} = defineProps({
  id: String,
})

const {getState, dispatchAction} = useStoreModule('productsStore');
const {getState: getCategoriesState, dispatchAction: dispatchCategoriesAction} = useStoreModule('categoriesStore');

const item = getState('item');
const categories = computed(() => useTreeData(getCategoriesState('items').value));

const payload = ref({
  name: '',
  description: '',
  price: '',
  category_id: ''
})

const initPayload = (data) => {
  payload.value.name = data.name
  payload.value.description = data.description
  payload.value.price = data.price
  payload.value.category_id = data.category_id ?? ''
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
    await dispatchAction('fetchItem', id);
    initPayload(item.value)
  }

  await dispatchCategoriesAction('fetchItems')
})

</script>

<template>
  <div>
    <form>
      <div>
        <label for="category_id">Category</label>
        <select name="category_id" id="category_id" v-model="payload.category_id">
          <option value="">Choose category...</option>
          <option :value="category.id" v-for="category in categories" :key="category.id">{{ category.name }}</option>
        </select>
      </div>

      <div>
        <label for="name">Name:</label>
        <input v-model="payload.name" type="text" id="name">
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea rows="10" cols="150" v-model="payload.description" id="description"></textarea>
      </div>

      <div>
        <label for="price">Price:</label>
        <input v-model="payload.price" type="text" id="price">
      </div>

      <button type="submit" @click.prevent="onSubmit">Save</button>
    </form>
  </div>
</template>
