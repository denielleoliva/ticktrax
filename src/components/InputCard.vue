<template>
  <q-card
    class="my-card q-pa-sm"
    :class="{ 'red-border': isRedBorderActive && props.isRequired }"
  >
    <q-card-section class="">
      <div class="text-h6">
        {{ props.title
        }}<span v-if="props.isRequired" class="text-negative q-pl-xs">*</span>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none gt-xs">
      <div class="q-pa-md q-gutter-sm" v-if="isEditMode">
        <q-editor v-model="editor" min-height="5rem" />
      </div>
      <div v-else>{{ props.description }}{{ props.modelValue }}</div>
    </q-card-section>
    <q-card-section class="q-pt-none gt-xs" style="max-width: 300px">
      <component
        :is="componentElement[props.typeString]"
        :options="props.options"
        @customChange="logChange"
        @emptyField="requiredFieldEmpty"
        :id="props.id"
      ></component>
    </q-card-section>
    <div class="lt-sm">
    <q-card-actions>

      <q-space />

      <q-btn
        color="grey"
        round
        flat
        dense
        :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
        @click="expanded = !expanded"
      />
    </q-card-actions>

    <q-slide-transition>
      <div v-show="expanded">
        <q-separator />

        <q-card-section class="q-pt-none">
          <div class="q-pa-md q-gutter-sm" v-if="isEditMode">
            <q-editor v-model="editor" min-height="5rem" />
          </div>
          <div v-else>{{ props.description }}{{ props.modelValue }}</div>
        </q-card-section>

    <q-card-section class="q-pt-none" style="max-width: 300px">
      <component
        :is="componentElement[props.typeString]"
        :options="props.options"
        @customChange="logChange"
        @emptyField="requiredFieldEmpty"
        :id="props.id"
      ></component>
    </q-card-section>
      </div>
    </q-slide-transition>
    </div>
  </q-card>
</template>

<style lang="sass" scoped>

.red-border
  border: 1px solid red
</style>

<script setup lang="ts">
import { ref, defineAsyncComponent, watch } from 'vue';
import { Question, IRadioElement } from './models';

const isRedBorderActive = ref(false);

const requiredFieldEmpty = (isError: boolean) => {
  isRedBorderActive.value = isError;
}


const InputElement = defineAsyncComponent(() => import('./InputElement.vue'));
const CheckboxElement = defineAsyncComponent(
  () => import('./CheckboxElement.vue')
);
const RadioElement = defineAsyncComponent(() => import('./RadioElement.vue'));
const DateElement = defineAsyncComponent(() => import('./DateElement.vue'));
const TimeElement = defineAsyncComponent(() => import('./TimeElement.vue'));
const FileElement = defineAsyncComponent(() => import('./FileElement.vue'));
const SelectElement = defineAsyncComponent(() => import('./SelectElement.vue'));

const example = ref('');

watch(example, (newValue, oldValue) => {
  console.log(newValue);
});

function logChange(value: any) {
  console.log('logChange', value.id);
}

const componentElement = {
  InputElement,
  CheckboxElement,
  RadioElement,
  DateElement,
  TimeElement,
  FileElement,
  SelectElement,
};

type QuestionType = MultipleChoice | CheckBox | ShortAnswer | IRadioElement | IInputElement | ICheckboxElement | ISelectElement


interface Question {
  id: number;
  typeString: string;
  title: string;
  isRequired: boolean;

  description?: string;
  options: QuestionType;
}

interface MultipleChoice {
  options: string[];
  response: string | null;
}

interface CheckBox {
  options: string[];
  response: string[] | null;
}

interface ShortAnswer {
  response: string | null;
}

interface IRadioElement {
  option: { val: string; label: string };
}

interface IInputElement {
  option: { label: string; hint: string | null; required: boolean };
}

interface ICheckboxElement {
  option: { label: string; required: boolean };
}

interface ISelectElement {
  values: string[];
  label: string;
}


const props = defineProps<Question>();

const expanded = ref(false);

const isEditMode = ref(false);
const editor = ref<string>('What you see is <b>what</b> you get.');
</script>
