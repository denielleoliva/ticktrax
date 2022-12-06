<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">
        {{ props.title
        }}<span v-if="props.isRequired" class="text-red q-pl-xs">*</span>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="q-pa-md q-gutter-sm" v-if="isEditMode">
        <q-editor v-model="editor" min-height="5rem" />
      </div>
      <div v-else>
        {{ props.description }}
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <component
        :is="componentElement[props.typeString]"
        :options="props.options"
      ></component>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent } from "vue";

const InputElement = defineAsyncComponent(() => import("./InputElement.vue"));
const CheckboxElement = defineAsyncComponent(
  () => import("./CheckboxElement.vue")
);
const RadioElement = defineAsyncComponent(() => import("./RadioElement.vue"));
const DateElement = defineAsyncComponent(() => import("./DateElement.vue"));
const TimeElement = defineAsyncComponent(() => import("./TimeElement.vue"));
const FileElement = defineAsyncComponent(() => import("./FileElement.vue"));
const SelectElement = defineAsyncComponent(() => import("./SelectElement.vue"));

const componentElement = {
  InputElement,
  CheckboxElement,
  RadioElement,
  DateElement,
  TimeElement,
  FileElement,
  SelectElement,
};

const radioOptions = [
  { val: "myValue", label: "myLabel" },
  { val: "myValue2", label: "myLabel2" },
];

const inputOptions = {
  label: "myInputLabel",
  hint: "Get a hint or take a hike",
  required: true,
};

const checkboxOptions = [
  { label: "myCheckboxLabel", color: "teal" },
  { label: "myCheckboxLabel2", color: "red" },
];

const dateOptions = {
  multiple: true,
  range: false,
};

const selectOptions = {
  values: ["hey", "this", "is", "kind", "of", "neat"],
  label: "mySelectLabel",
};

const fileOptions = { multiple: true };

const props = defineProps({
  title: String,
  subTitle: String,
  isRequired: Boolean,
  typeString: String,
  description: String,
  options: Array | Object,
});

const isEditMode = ref(false);
</script>
