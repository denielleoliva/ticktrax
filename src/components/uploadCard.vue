<template>
  <div>
    <div v-show="!hidePageTitle">
    <p class="text-h5 row justify-center text-weight-medium lt-sm" :class="!isDarkMode ? 'text-grey-9': ''">Submit Tick Photo</p>
    <p class="text-h4 row justify-center text-weight-medium gt-sm" :class="!isDarkMode ? 'text-grey-9': ''">Submit Tick Photo</p>
    </div>


    <q-card class="my-card" v-show="!showVideoInputAlert">
      <q-card-section  @dragover="dragover"
                       @dragleave="dragleave"
                       @drop="drop">

        <q-file borderless class="credit" :style="isDragging ? 'pointer-events: none;':''" color="grey" accept=".jpg, .jpeg .heic, .mp4, .mov" @input="manualUpload">
          <div class="absolute-bottom">
            <div class="uploadIcon row justify-center absolute-center q-pt-xs"><q-icon name="pest_control"  size="25px"  /></div>
            <div v-if="isDragging" class="row justify-center absolute-center text q-mt-xl desktop-only">
              <p class="text-bold text-positive">Release to drop photo here.</p>
            </div>

            <div v-else class="row justify-center absolute-center absolute-bottom text q-pt-xl desktop-only">
              <p class="text-bold q-pr-xs text-positive">Click to upload</p>
              <p>or drag and drop</p>
            </div>
            <div class="row justify-center absolute-center absolute-bottom text q-pt-xl mobile-only">
              <p class="text-bold q-pr-xs text-positive">Tap to upload</p>
            </div>
            <div class="row justify-center absolute-center absolute-bottom text q-mt-xl">
              <p class="text-caption">jpg/jpeg, heic/heif, or mov/mp4</p>
            </div>
          </div>
        </q-file>
      </q-card-section>
    </q-card>
    <div class="q-pt-xl" v-show="!showVideoInputAlert">
      <div class="row justify-center">
        <p class="text-h6 text-center">
          How to use?
        </p>
      </div>
      <div class="row justify-center">
        <p class="q-px-xl" style="max-width: 600px">
          To get started, please upload a photo of your tick, ideally with the top side up and centered. We only accept JPG/JPEG, HEIC/HEIF, and MOV/MP4 files, so please avoid submitting PNG files. Check out our photo tips below to ensure that you capture the best image possible. Additionally, please submit only one tick per submission.
        </p>
      </div>


      <div class="q-pt-sm row justify-center q-gutter-lg">
        <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3">
          <div class="row text-no-wrap">
            <q-icon name="recommend" class="q-mb-xs q-pr-sm" color="green" size="sm" />
            <p class="text-weight-medium">Ideal photo</p>
          </div>
          <q-img src="lonestarsamplecorrect.jpg" alt="Top view of a lone star tick" :ratio="16/16" />
        </div>
        <div class="col-lg-2 col-md-3 col-sm-3 col-xs-3">
          <div class="row text-no-wrap">
            <q-icon name="recommend" class="q-mb-xs q-pr-sm rotate-180 flip-vertical" color="red" size="sm" />
            <p class="text-weight-medium">Not ideal photo</p>
          </div>
          <q-img src="lonestarsampleincorrect.jpg" alt="Bottom view of a lone star tick" :ratio="16/16"  />
        </div>
      </div>

    </div>
    <q-inner-loading
      :showing="showLoading"
      label="Please wait..."
      label-class="text-positive"
      label-style="font-size: 1.1em"
    />

    <div v-show="showVideoInputAlert" class="q-pt-md">
      <video-card :source="video" @leaveVideoCard="leaveVideoCard" @onVideoMetaData="onVideoMetaData" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue';
import { Dark } from 'quasar';
import {extractMetaData} from "src/utils";
import VideoCard from "components/VideoCard.vue";


const isDragging = ref(false);
const files = ref([]);
const imageData = ref(null);
const isDarkMode = ref(false);
const showLoading = ref(false);

const showVideoInputAlert = ref(false);

const video = ref(null);



const emit = defineEmits(['handleUploadData']);
const props = defineProps(['hidePageTitle']);


watch(() => Dark.isActive, val => {
  isDarkMode.value = val;
});
watch(imageData, () => {
  console.log(imageData.value, "watching!")
});

function leaveVideoCard(val) {
  showVideoInputAlert.value = !val;
}



function dragover(e) {
  e.preventDefault();
  isDragging.value = true;
}

function dragleave() {
  isDragging.value = false;
}

async function drop(e) {
  e.preventDefault();
  console.log(e, 'Dropped!');
  console.log(e.dataTransfer.files);
  if (e.dataTransfer.files[0].type.includes("video/")) {
    processVideo(e.dataTransfer.files[0])
  } else {
    imageData.value = e.dataTransfer.files;
    await processImage(e.dataTransfer.files[0])
  }

}



async function processImage(file) {
  // e.preventDefault();
  // console.log(e, 'Dropped!');
  // console.log(e.dataTransfer.files)
  // onChange();
  // imageData.value = e.dataTransfer.files;

  showLoading.value = true;
  const imageMetaData = await extractMetaData(file);
  showLoading.value = false;
  isDragging.value = false;

  emit('handleUploadData', imageMetaData);
}

function onVideoMetaData(videoMetaData) {
  isDragging.value = false;
  emit('handleUploadData', videoMetaData);
}

function processVideo(e) {
  let reader = new FileReader();
  reader.readAsDataURL(e);
  reader.addEventListener('load', function(){
    video.value = reader.result;
    showVideoInputAlert.value = true;
  });
}

async function manualUpload(e) {
  console.log('Manual upload!', e.type)
  if (e.type.includes("video/")) {
    processVideo(e);
  } else {
    await processImage(e);
  }

  //e.type == ""

}

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 272px

.text
  width: 100%


.credit
  box-sizing: border-box
  padding: 16px 24px
  gap: 4px
  display: flex
  flex-direction: column
  align-items: center
  width: 100%
  height: 240px
  left: 16px
  top: 16px
  border: 1px dashed #EAECF0
  border-radius: 12px

  &:hover
    border-radius: 12px
    cursor: pointer
    border: 1px solid #21ba45


.uploadIcon
  width: 40px
  height: 40px
  background: #F2F4F7
  border: 6px solid #F9FAFB
  border-radius: 28px
  flex: none
  order: 0
  flex-grow: 0


.icon

  left: 26.33%
  top: 12.5%
  bottom: 12.5%

</style>
