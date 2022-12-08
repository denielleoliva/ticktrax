<template>
  <q-select v-model="model" :options="options.values" :label="options.label" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  options: { values: Array, label: String },
});
//const options = props.options;
const model = ref<string>('');
</script>
