<script setup>

const {sidebar, test} = defineProps({
  sidebar: Boolean,
  test: String
})

</script>

<template>
  <div v-if="sidebar">
    sidebar
  </div>
</template>