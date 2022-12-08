<template>
  <q-file
    outlined
    v-model="file"
    :multiple="options.multiple"
    accept=".jpg, image/*"
  >
    <template v-slot:prepend>
      <q-icon name="photo_library" />
    </template>
  </q-file>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  options: { multiple: Boolean },
});
const file = ref(null);
</script>
