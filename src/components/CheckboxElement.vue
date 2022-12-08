<template>
  <template v-for="(option, index) in options" :key="option.label">
    <q-checkbox
      v-model="userSelections[index]"
      :label="option.label"
      :color="option.color"
    />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const emit = defineEmits(['input', '$event']);
const props = defineProps({
  options: {
    label: String,
    color: String,
  },
});
console.log(props.options);
const userSelections = ref<boolean>(props.options.map(() => false));
</script>
