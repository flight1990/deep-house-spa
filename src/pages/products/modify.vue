<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
});

const {getState, dispatchAction} = useStoreModule('productsStore');

const payload = ref({
  name: '',
  description: '',
  price: '',
});

const fetchItem = async (id) => {
  if (!id) return;

  await dispatchAction('fetchItem', id);
  const item = getState('item');

  if (item) {
    payload.value.name = item.value.name
    payload.value.description = item.value.description
    payload.value.price = item.value.price
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
        <label for="description">Description:</label>
        <textarea rows="10" cols="150" v-model="payload.description" id="description"></textarea>
      </div>

      <div>
        <label for="price">Price:</label>
        <input v-model="payload.price" type="text" id="price">
      </div>

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped>

</style>
