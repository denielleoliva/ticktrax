<template>
  <q-input
    @input="
      (val) => {
        console.log(val);
      }
    "
    v-model="userEntry"
    :label="options.label"
    :hint="options.hint"
    :type="options.type"
    lazy-rules
    :rules="
      options.required
        ? [(val) => (val && val.length > 0) || 'This is a required field']
        : null
    "
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  options: {
    label: String,
    hint: String,
    required: Boolean,
    isParagraph: Boolean,
  },
});
const userEntry = ref("");
</script>
