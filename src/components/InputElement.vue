<template>
  <q-input
    v-model="userEntry"
    :label="options.label"
    :hint="options.hint"
    :type="options.type"
    clearable
    lazy-rules
    :rules="
      options.required
        ? [(val) => emitIsEmptyField(val)]
        : null
    "
    :color="options.color"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['customChange', 'emptyField']);
const props = defineProps({
  options: {
    type: Object, // Declare the prop as an object
    required: true,
  },
  id: Number,
});

const emitIsEmptyField = (val: string) => {

  if (val && val.length > 0) {
    emit('emptyField', false);
    return true;
  }

  emit('emptyField', true);
  return 'This is a required field!';
}

console.log("props", props.options);
const userEntry = ref<string>('');
watch(userEntry, (newValue, oldValue) => {
  emit('customChange', { id: props.id, value: newValue });
});
</script>
