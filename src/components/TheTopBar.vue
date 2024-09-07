<script setup>

const model = defineModel('sidebar', {default: false})

const onModelClick = () => {
  model.value = !model.value
}

</script>

<template>
  <div>
    <slot>
      <button @click.prevent="onModelClick">
        <slot name="title" :model="model" :onModelClick="onModelClick">
          {{ model ? 'on' : 'off' }}
        </slot>
      </button>
    </slot>
  </div>
</template>