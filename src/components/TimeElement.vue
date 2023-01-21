<template>
  <q-input v-model="time" mask="time" :rules="['time']" :color="options.color">
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-time v-model="time">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['customChange']);
const props = defineProps({
  options: Object,
  id: Number,
});
const time = ref<string>('');
watch(time, (newValue, oldValue) => {
  emit('customChange', { id: props.id, value: newValue });
});
</script>
