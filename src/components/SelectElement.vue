<template>
  <q-select v-model="model" :options="options.dropdownValues" :color="options.color" :label="options.boxLabel" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const model = ref<string>('')

const emit = defineEmits(['customChange']);
const props = defineProps({
  userInput: String,
  options: Object,
  label: String,
  id: Number,
});
//const options = props.options;

watch(model, (newValue, oldValue) => {
  emit('customChange', newValue);
});
</script>
