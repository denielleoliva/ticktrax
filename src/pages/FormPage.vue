<template>
  <q-layout>
    <q-page class="row items-center q-pb-xl">
      <div class="q-pa-md items-start q-gutter-md my-form">
        <q-card class="my-card">
          <q-card-section class="bg-positive text-white q-pa-xs">
          </q-card-section>
          <q-card-section>
            <div class="text-h4">TickTrax Form</div>
          </q-card-section>
          <q-separator inset />

          <q-card-section>
            {{ formDescription }}
          </q-card-section>
          <q-card-section>
            <p class="text-negative">* Required</p>
          </q-card-section>
        </q-card>

        <template v-for="question in questions" :key="question.id">
          <input-card v-bind="{ ...question }" />
        </template>
        <div class="row justify-between">
          <div>
            <q-btn color="positive" label="Submit" />
          </div>
          <div>
            <q-btn flat color="positive" label="Clear form" />
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<style scoped>
.my-form {
  margin: auto;
  max-width: 90vw;
  width: 640px;
}
</style>

<script setup lang="ts">
import {
  Question,
  ICheckboxElement,
  IInputElement,
  IRadioElement,
  IDateElement,
} from 'components/models';
import InputCard from 'components/InputCard.vue';
import { ref } from 'vue';

const formDescription = ref(
  "This a tick tracking app, which is a tool that allows users to track and monitor the presence of ticks in their local area. With the app, users can report sightings of ticks and see a map of where ticks have been reported in their community. This information can help users avoid areas with a high concentration of ticks and take appropriate precautions to protect themselves from tick-borne illnesses. The form for the tick tracking app might ask for information such as the user's location, the date and time of the tick sighting, and any additional details about the tick. This information will be used to populate the map and provide users with valuable information about the presence of ticks in their area."
);

const checkboxOptions: ICheckboxElement[] = [
  { label: 'Stackoverflow', color: 'green' },
  { label: 'Documentation', color: 'red' },
];

const inputOptions: IInputElement = {
  label: 'Enter value here',
  hint: 'Need a hint? Take the hint.',
  type: 'textarea',
  required: true,
};

const radioOptions: IRadioElement[] = [
  { val: 'myValue1', label: 'brown' },
  { val: 'myValue2', label: 'red' },
  { val: 'myValue3', label: 'camo' },
];

const dateOptions: IDateElement = {
  multiple: true,
  range: false,
};

const questions = ref<Question[]>([
  {
    id: 1,
    typeString: 'FileElement',
    title: 'Upload tick photo',
    isRequired: true,
    description:
      'Upload the photo of the tick. Only .jpg and .png files are accepted.',
    options: { multiple: true, accept: '.jpg, .png' },
  },
  {
    id: 2,
    typeString: 'DateElement',
    title: 'When did you take the photo of the tick?',
    isRequired: false,
    description: 'You may select a date below.',
    options: dateOptions,
  },
  {
    id: 3,
    typeString: 'TimeElement',
    title: 'What time did you photo of the tick?',
    isRequired: false,
    description: 'You may select a date below.',
    options: { time: '' },
  },
  {
    id: 4,
    typeString: 'RadioElement',
    title: 'What is the color of the tick from the photo?',
    isRequired: false,
    description:
      "You can only select one option. If there're multiple colors, select the most dominant color.",
    options: radioOptions,
  },
  {
    id: 5,
    typeString: 'InputElement',
    title: 'What is the size of the tick?',
    isRequired: true,
    description: 'From a scale of 1-10, how big is the tick?',
    options: { ...inputOptions, type: 'number' },
  },
  {
    id: 6,
    typeString: 'InputElement',
    title: 'Describe any distinguishing features of the tick.',
    isRequired: false,
    description: 'Enter any additional information about the tick.',
    options: {
      ...inputOptions,
      label: 'Enter your description here',
      hint: '',
      required: false,
    },
  },
  {
    id: 7,
    typeString: 'CheckboxElement',
    title: 'What is the powerhouse of the programmer?',
    isRequired: true,
    description: 'Select all that apply.',
    options: checkboxOptions,
  },
]);
</script>
