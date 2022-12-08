<template>
  <template v-for="option in options" :key="option.val">
    <q-radio v-model="userSelection" :val="option.val" :label="option.label" />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['input', '$event']);

const props = defineProps({
  options: { label: String, val: String },
});
console.log(props.options);
const userSelection = ref<string>('');
</script>
