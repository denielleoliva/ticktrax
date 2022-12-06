<template>
  <div>
    <template v-for="(option, index) in options">
      <q-checkbox
        v-model="userSelections[index]"
        :label="option.label"
        :color="option.color"
        :key="option.label"
      />
    </template>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  options: {
    label: String,
    color: String,
  },
});
const userSelections = ref(props.options.map(() => false));
</script>
