<template>
  <div>
    <template v-for="option in options">
      <q-radio
        v-model="userSelection"
        :val="option.val"
        :label="option.label"
        :key="option.val"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  options: { label: String, val: String },
});
const userSelection = ref("");
</script>
