<template>
  <q-layout>

    <q-page
      class="row items-center q-pb-xl"
      :class="$q.dark.isActive ? null : 'bg-green-1'"

    >
      <div class="q-pa-md items-start q-gutter-md my-form">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
        <q-card class="my-card">
          <q-card-section class="bg-positive text-white q-pa-xs">
          </q-card-section>
          <q-card-section>
            <div class="text-h4">Tick Submissions</div>
          </q-card-section>
          <q-separator inset />

          <q-card-section>
            {{ formDescription }}
          </q-card-section>
          <q-card-section>
            <p class="text-negative">* Required</p>
          </q-card-section>
        </q-card>
        <input-card :id="0" title="Upload tick photo" :is-required="true"
                    type-string="FileElement" description="Only .jpg/jpeg and .heic/heif files are accepted. If it's taken from an apple or android device, you're good to go.  "
                    :options="uploadOptions" :user-input="null" @getMetaData="getMetaData" />

        <input-card :key="coordsKey" :id="1" title="Where did you take the photo of the tick?"
                    :is-required="true" type-string="MapElement" options=""
                    v-bind:user-input="coords" />

        <input-card :key="dateEXIF" :id="2" title="On what date did you find the tick?"
                    :is-required="true" type-string="DateElement"
                    :options="dateOptions" v-bind:user-input="dateEXIF" />

        <input-card :id="3" title="Are you able to identify the type of tick?"
                    :is-required="true" type-string="RadioElement"
                    :options="tickIDOptions" @getCanIdTick="getCanIdTick" :user-input="null" />


        <input-card v-if="showOptionalQuestions" :id="4" title="Select the type of tick."
                    :is-required="true" type-string="SelectElement"
                    :options="selectOptions" @getTickType="getTickType" v-bind:user-input="tickType" />



<!--        <template v-for="question in questions">-->
<!--          <input-card v-bind="{ ...question }" :key="question.id" />-->
<!--        </template>-->
        <div class="row justify-between">
          <div>
            <q-btn color="positive" label="Submit" type="submit"  />
          </div>
          <div>
            <q-btn
              flat
              color="positive"
              label="clear form"
              type="reset"
            />
          </div>
        </div>
        </q-form>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup>


import InputCard from 'components/InputCard.vue';
import { ref, watch } from 'vue';


//const store = useFormStore();

const dateEXIF = ref('1');
const showOptionalQuestions = ref(false)
const coords = ref([]);
const imageData = ref('');
const coordsKey = ref('');
const tickType = ref('');

watch(coords, (updatedCoords) => {
  coordsKey.value = updatedCoords.join();
})

const onSubmit = () => {
  const formData = new FormData();
  formData.append('image', imageData.value);
  formData.append('date', dateEXIF.value);
  formData.append('coordinates', coords.value.join(','));
  formData.append('tickType', tickType.value);
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
  }
}

const onReset = () => {
  console.log('onReset');
}


const getMetaData = (a) => {
  const dateTimeMatchRe = /(?<year>\d{4}):(?<month>\d{2}):(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<seconds>\d{2})/;
  console.log(a)
  if (a.data.length > 0) {
    imageData.value = a.data[0]
  }
  if (a.dateTime) {
    const {year, month, day} = ((result) => ((result) ? result.groups : {}))(dateTimeMatchRe.exec(a.dateTime));
    console.log(year, month, day);
    dateEXIF.value = year + '-' + month + '-' + day;
    console.log(dateEXIF.value)
  }

  if (a.coords) {
    console.log(a.coords)
    coords.value = Object.values(a.coords).reverse()
  }

}

const getCanIdTick = (canId) => {
  showOptionalQuestions.value = canId === 'yes';
}

const getTickType = (tickName) => {
  tickType.value = tickName.value;

}

const formDescription = ref(
  "Spot a tick? Snap a picture, answer a couple questions and submit!"
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

const tickIDOptions  = [
  { val: 'yes', label: 'Yes', color: 'green' },
  { val: 'no', label: 'No', color: 'green' },
];

const selectOptions  = {
  color: 'green',
  boxLabel: 'Tick type',
  dropdownValues:[
  {
    label: "American dog tick (Dermacentor variabilis)",
    value: "Dermacentor variabilis"
  },
  {
    label: "Asian longhorned tick (Haemaphysalis longicornis)",
    value: "Haemaphysalis longicornis"
  },
  {
    label: "Blacklegged or deer tick (Ixodes scapularis)",
    value: "Ixodes scapularis"
  },
  {
    label: "Brown dog tick (Rhipicephalus sanguineus)",
    value: "Rhipicephalus sanguineus"
  },
  {
    label: "Cayenne tick (Amblyomma cajennense)",
    value: "Amblyomma cajennense"
  },
  {
    label: "Gulf coast tick (Amblyomma maculatum)",
    value: "Amblyomma maculatum"
  },
  {
    label: "Lone star tick (Amblyomma americanum)",
    value: "Amblyomma americanum"
  },
  {
    label: "Pacific coast tick (Dermacentor occidentalis)",
    value: "Dermacentor occidentalis"
  },
  {
    label: "Rocky Mountain wood tick (Dermacentor andersoni)",
    value: "Dermacentor andersoni"
  },
  {
    label: "Western blacklegged tick (Ixodes pacificus)",
    value: "Ixodes pacificus"
  },
  {
    label: "Other (please specify in the comment box below)",
    value: ""
  }
]
};

const dateOptions = {
  multiple: false,
  range: false,
  color: 'green',
};

const uploadOptions = {

    multiple: true,
    accept: '.jpg, .png',
    required: false,
    color: 'green',

}

const userInput = ref([]);

const uploadImageProps = {
  id: 1,
  typeString: 'FileElement',
  title: 'Upload tick photo',
  isRequired: true,
  userInput: null,
  description:
    'Upload the photo of the tick. Only .jpg and .heic files are accepted.',
  options: {
    multiple: true,
    accept: '.jpg, .heic',
    required: false,
    color: 'green',
  },
}

// const questions = ref([
//   {
//     id: 1,
//     typeString: 'FileElement',
//     title: 'Upload tick photo',
//     isRequired: true,
//     userInput: null,
//     description:
//       'Upload the photo of the tick. Only .jpg and .png files are accepted.',
//     options: {
//       multiple: true,
//       accept: '.jpg, .png',
//       required: false,
//       color: 'green',
//     },
//   },
//   {
//     id: 2,
//     typeString: 'DateElement',
//     title: 'When did you take the photo of the tick?',
//     isRequired: false,
//     userInput: null,
//     description: 'You may select a date below.',
//     options: dateOptions,
//   },
//   {
//     id: 3,
//     typeString: 'InputElement',
//     title: 'Where did you take the photo of the tick?',
//     isRequired: true,
//     userInput: null,
//     description: 'Enter any additional information about the tick.',
//     options: {
//       ...inputOptions,
//       type: 'text',
//       label: 'Enter the location here',
//       hint: '',
//       required: true,
//     },
//   },
//   {
//
//     id: 4,
//     typeString: 'RadioElement',
//     title: 'What type of tick is it?',
//     isRequired: true,
//     userInput: null,
//     description:
//       "You can only select one option. If there're multiple colors, select the most dominant color.",
//     options: radioOptions,
//   },
//
//   // {
//   //   id: 3,
//   //   typeString: 'InputElement',
//   //   title: 'Where did you take the photo of the tick?',
//   //   isRequired: true,
//   //   userInput: null,
//   //   description: 'Enter any additional information about the tick.',
//   //   options: {
//   //     ...inputOptions,
//   //     type: 'text',
//   //     label: 'Enter the location here',
//   //     hint: '',
//   //     required: true,
//   //   },
//   // },
//   // {
//   //   id: 4,
//   //   typeString: 'RadioElement',
//   //   title: 'What is the color of the tick from the photo?',
//   //   isRequired: false,
//   //   userInput: null,
//   //   description:
//   //     "You can only select one option. If there're multiple colors, select the most dominant color.",
//   //   options: radioOptions,
//   // },
//   // {
//   //   id: 5,
//   //   typeString: 'InputElement',
//   //   title: 'What is the size of the tick?',
//   //   isRequired: true,
//   //   userInput: null,
//   //   description: 'From a scale of 1-10, how big is the tick?',
//   //   options: { ...inputOptions, type: 'number' },
//   // },
//   // {
//   //   id: 6,
//   //   typeString: 'InputElement',
//   //   title: 'Describe any distinguishing features of the tick.',
//   //   isRequired: false,
//   //   userInput: null,
//   //   description: 'Enter any additional information about the tick.',
//   //   options: {
//   //     ...inputOptions,
//   //     label: 'Enter your description here',
//   //     hint: '',
//   //     required: false,
//   //   },
//   // },
//   // {
//   //   id: 7,
//   //   typeString: 'CheckboxElement',
//   //   title:
//   //     'If you have been bitten by a tick, did you experienced any of the following symptoms?',
//   //   isRequired: false,
//   //   userInput: null,
//   //   description: 'Select all that apply.',
//   //   options: checkboxOptions,
//   // },
// ]);
//
// //store.setFormState(questions);
//
// userInput.value = Array(questions.value.length);
</script>

<style lang="sass" scoped >

.my-form
  margin: auto
  max-width: 90vw
  width: 640px

</style>
