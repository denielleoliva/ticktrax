<template>
  <q-date
    v-model="date"
    minimal
    :range="options.range"
    :multiple="options.multiple"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  options: { range: Boolean | null, multiple: Boolean | null },
});
const date = ref<string>('');
</script>
