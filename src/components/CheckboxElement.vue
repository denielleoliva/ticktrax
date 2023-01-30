<template>
  <div>
  <span v-for="option in options">
    <q-checkbox
      :key="option.label"
      v-model="userSelections"
      :label="option.label"
      :color="option.color"
      :val="option.label"
    />
  </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const emit = defineEmits(['customChange']);
const props = defineProps({
  options: {
    label: String,
    color: String,
  },
  id: Number,
});
console.log(props.options);
const userSelections = ref([]);
watch(userSelections, (newValue, oldValue) => {
  emit('customChange', { id: props.id, value: newValue });
});
</script>
