<template>
  <q-layout>
    <q-page
      class="row items-center q-pb-xl"
      :class="$q.dark.isActive ? null : 'bg-green-1'"
    >
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

        <template v-for="question in questions">
          <input-card v-bind="{ ...question }" :key="question.id" />
        </template>
        <div class="row justify-between">
          <div>
            <q-btn color="positive" label="Submit" @click="store.counter++" />
          </div>
          <div>
            <q-btn
              flat
              color="positive"
              label="Clear form"
              @click="store.counter--"
            />
          </div>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup>


import InputCard from 'components/InputCard.vue';
import { ref } from 'vue';
import { useFormStore } from '../store/form';
//import { storeToRefs } from 'pinia';





//const store = useFormStore();


const formDescription = ref(
  "This a tick tracking app, which is a tool that allows users to track and monitor the presence of ticks in their local area. With the app, users can report sightings of ticks and see a map of where ticks have been reported in their community. This information can help users avoid areas with a high concentration of ticks and take appropriate precautions to protect themselves from tick-borne illnesses. The form for the tick tracking app might ask for information such as the user's location, the date and time of the tick sighting, and any additional details about the tick. This information will be used to populate the map and provide users with valuable information about the presence of ticks in their area."
);

const checkboxOptions  = [
  { label: 'Fever/chills', color: 'green' },
  { label: 'Aches and pains', color: 'green' },
  { label: 'Rash', color: 'green' },
];

const inputOptions = {
  label: 'Enter value here',
  hint: 'Need a hint? Take the hint.',
  type: 'textarea',
  required: true,
  color: 'green',
};

const radioOptions  = [
  { val: 'myValue1', label: 'brown', color: 'green' },
  { val: 'myValue2', label: 'red', color: 'green' },
  { val: 'myValue3', label: 'camo', color: 'green' },
];

const dateOptions = {
  multiple: true,
  range: false,
  color: 'green',
};

const userInput = ref([]);

const questions = ref([
  {
    id: 1,
    typeString: 'FileElement',
    title: 'Upload tick photo',
    isRequired: true,
    userInput: null,
    description:
      'Upload the photo of the tick. Only .jpg and .png files are accepted.',
    options: {
      multiple: true,
      accept: '.jpg, .png',
      required: false,
      color: 'green',
    },
  },
  {
    id: 2,
    typeString: 'DateElement',
    title: 'When did you take the photo of the tick?',
    isRequired: false,
    userInput: null,
    description: 'You may select a date below.',
    options: dateOptions,
  },
  {
    id: 3,
    typeString: 'InputElement',
    title: 'Where did you take the photo of the tick?',
    isRequired: true,
    userInput: null,
    description: 'Enter any additional information about the tick.',
    options: {
      ...inputOptions,
      type: 'text',
      label: 'Enter the location here',
      hint: '',
      required: true,
    },
  },
  {
    id: 4,
    typeString: 'TimeElement',
    title: 'What time did you photo of the tick?',
    isRequired: false,
    userInput: null,
    //description: 'You may select a date below.',
    options: { time: '', color: 'green' },
  },
  {
    id: 5,
    typeString: 'RadioElement',
    title: 'What is the color of the tick from the photo?',
    isRequired: false,
    userInput: null,
    description:
      "You can only select one option. If there're multiple colors, select the most dominant color.",
    options: radioOptions,
  },
  {
    id: 6,
    typeString: 'InputElement',
    title: 'What is the size of the tick?',
    isRequired: true,
    userInput: null,
    description: 'From a scale of 1-10, how big is the tick?',
    options: { ...inputOptions, type: 'number' },
  },
  {
    id: 7,
    typeString: 'InputElement',
    title: 'Describe any distinguishing features of the tick.',
    isRequired: false,
    userInput: null,
    description: 'Enter any additional information about the tick.',
    options: {
      ...inputOptions,
      label: 'Enter your description here',
      hint: '',
      required: false,
    },
  },
  {
    id: 8,
    typeString: 'CheckboxElement',
    title:
      'If you have been bitten by a tick, did you experienced any of the following symptoms?',
    isRequired: false,
    userInput: null,
    description: 'Select all that apply.',
    options: checkboxOptions,
  },
]);

//store.setFormState(questions);

userInput.value = Array(questions.value.length);
</script>

<style scoped>
.my-form {
  margin: auto;
  max-width: 90vw;
  width: 640px;
}
</style>
