<template>
  <q-select v-model="model" :options="options.values" :label="options.label" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['customChange']);
const props = defineProps({
  options: { values: Array, label: String },
  id: Number,
});
//const options = props.options;
const selectedValue = ref<string>('');
watch(selectedValue, (newValue, oldValue) => {
  emit('customChange', { id: props.id, value: newValue });
});
</script>
