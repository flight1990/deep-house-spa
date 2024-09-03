<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
});

const {getState, dispatchAction} = useStoreModule('categoriesStore');

const payload = ref({
  name: '',
});

const fetchItem = async (id) => {
  if (!id) return;

  await dispatchAction('fetchItem', id);
  const item = getState('item');

  if (item) {
    payload.value.name = item.value.name
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

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped>

</style>
