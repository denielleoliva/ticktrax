<template>
  <div>
    <p class="text-h5 row justify-center text-weight-medium lt-sm" :class="!isDarkMode ? 'text-grey-9': ''">Submit Tick Photo</p>
    <p class="text-h4 row justify-center text-weight-medium gt-sm" :class="!isDarkMode ? 'text-grey-9': ''">Submit Tick Photo</p>

    <q-card class="my-card">
    <q-card-section  @dragover="dragover"
                     @dragleave="dragleave"
                     @drop="drop">

      <q-file borderless class="credit" :style="isDragging ? 'pointer-events: none;':''" color="grey" accept=".jpg, .heic" @input="manualUpload">
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
            <p class="text-caption">jpg/jpeg, or heic/heif</p>
          </div>
        </div>
      </q-file>
    </q-card-section>
  </q-card>
  <q-inner-loading
    :showing="showLoading"
    label="Please wait..."
    label-class="text-positive"
    label-style="font-size: 1.1em"
  />
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from 'vue';
import { Dark, Loading } from 'quasar';
import {extractMetaData} from "src/utils";



const isDragging = ref(false);
const files = ref([]);
const imageData = ref(null);
const isDarkMode = ref(false);
const showLoading = ref(false);
const imageMetaData = ref(null);


const emit = defineEmits(['handleUploadData'])


watch(() => Dark.isActive, val => {
  isDarkMode.value = val;
})
watch(imageData, () => {
  console.log(imageData.value, "watching!")
})



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
  console.log(e.dataTransfer.files)
  onChange();
  imageData.value = e.dataTransfer.files;
  await processImage(e.dataTransfer.files[0])
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
  console.log(imageMetaData);
  isDragging.value = false;

  emit('handleUploadData', imageMetaData);
}

function onChange() {
  console.log('onChange!');
}

async function manualUpload(e) {
  console.log('Manual upload!', e)
  await processImage(e)
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
