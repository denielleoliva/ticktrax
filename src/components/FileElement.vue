<template>
  <q-file
    :color="options.color"
    v-model="file"
    @input="
      $emit('customChange', { id: props.id, value: $event.target.files[0] })
    "
    :multiple="options.multiple"
    accept=".jpg, image/*"
    lazy-rules
    :rules="options.required ? [(val) => !!val || 'Field is required'] : null"
  >
    <template v-slot:prepend>
      <q-icon name="photo_library" />
    </template>
  </q-file>
</template>

<script setup>
import { ref, watch } from 'vue';

defineEmits(['customChange']);


const props = defineProps({
  options: { multiple: Boolean },
  id: Number,
});



const file = ref(null);
watch(file, (newValue, oldValue) => {

});
</script>
