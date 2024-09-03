<script setup>
import {useStoreModule} from "../../composables/useStoreModule.js";
import {onMounted, ref} from "vue";

const {id} = defineProps({
  id: String,
});

const {getState, dispatchAction} = useStoreModule('seoStore');

const payload = ref({
  title: '',
  description: '',
  keywords: '',
  index: false,
  follow: false
});

const fetchItem = async (id) => {
  if (!id) return;

  await dispatchAction('fetchItem', id);
  const item = getState('item');

  if (item) {
    payload.value.title = item.value.title
    payload.value.description = item.value.description
    payload.value.keywords = item.value.keywords
    payload.value.index = item.value.index
    payload.value.follow = item.value.follow
  }
};

onMounted(() => fetchItem(id));

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

      <button type="submit">Save</button>
    </form>
  </div>
</template>

<style scoped>

</style>
