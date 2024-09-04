<script setup>

const {items} = defineProps({
  items: Array
})

const emit = defineEmits(['item:deleted'])

const onDelete = (id) => {
  emit('item:deleted', id)
}

</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <span style="margin-right: 15px;">{{ item.name }}</span>

      <router-link :to="{name: 'menu.edit', params: {id: item.id}}">Edit</router-link>
      <a href="#" @click.prevent="onDelete(item.id)">Delete</a>

      <ul v-if="item.children?.length">
        <TheMenuTree
          :items="item.children"
          @item:deleted="onDelete"
        />
      </ul>
    </li>
  </ul>
</template>