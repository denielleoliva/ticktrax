<template>
  <div >
  <span v-for="option in options">
    <q-radio
      :key="option.val"
      v-model="userSelection"
      :val="option.val"
      :label="option.label"
      :color="option.color"
    />
  </span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['customChange']);
const props = defineProps({
  options: Array,
  id: Number,
});


const userSelection = ref<string | null>(null);
watch(userSelection, (newValue, oldValue) => {
  console.log(newValue, "Radio");
  emit('customChange', newValue);
});
</script>
