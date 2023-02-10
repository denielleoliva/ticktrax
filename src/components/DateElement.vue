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
  userInput: String,
  options: Object,
  id: Number,
});

const date = ref<string>('');
if (props.userInput) {
  date.value = props.userInput;
}
console.log(props.userInput)

watch(date, (newValue, oldValue) => {
  console.log(newValue)
  emit('customChange', { id: props.id, value: newValue });
});
</script>
