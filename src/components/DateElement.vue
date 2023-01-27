<template>

  <q-input
    v-model="date"
    type="date"
    minimal
    :range="options.range"
    :multiple="options.multiple"
    :color="options.color"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['customChange']);
const props = defineProps({
  options: { range: Boolean | null, multiple: Boolean | null, color: String },
  id: Number,
});

const date = ref<string>('');
watch(date, (newValue, oldValue) => {
  emit('customChange', { id: props.id, value: newValue });
});
</script>
