<template>
  <div>
  <div class="desktop-only">
  <q-file
    v-model="image"
    @input="updateFile"
    :color="options.color"
    :multiple="options.multiple"
    accept=".jpg, .heic"
    lazy-rules
    :rules="options.required ? [(val) => !!val || 'Field is required'] : null"
  >
    <template v-slot:prepend>
      <q-icon name="photo_library" />
    </template>
  </q-file>
  </div>
    <div class="mobile-only">
      <q-btn color="positive" round icon="photo_camera"  @click="captureImage" />
    </div>
    <div v-if="showThumbnail">
    <q-img
      :src="imageUrl"
      spinner-color="white"
    ></q-img>
    </div>
    <img :src="imageUrl" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Camera, CameraResultType } from '@capacitor/camera'
const image = ref(null);
const imageSrc= ref(null);
const imageUrl = ref('');
const showThumbnail = ref(false);

let fileInput = ref(null);


function updateFile(e) {
  let reader = new FileReader();

  const file = e[0];
  const blob = new Blob([file]);

  reader.onload = (event) => {
    console.log(event.target.result);
    let blob = new Blob([event.target.result]);
    //imageUrl.value = file;

  }
  reader.onerror = e => {
    console.log(e.target.error)
  }

  imageUrl.value = URL.createObjectURL(file);

  reader.readAsArrayBuffer(file);


}
async function captureImage () {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  })

  imageSrc.value = image.webPath
}


defineEmits(['customChange']);


const props = defineProps({
  options: { multiple: Boolean },
  id: Number,
});

const handleUpload = () => {
  console.log('handleUpload is triggered?');
  if (image.value) {

    imageUrl.value = URL.createObjectURL(image.value);
  }
}


watch(image, (newValue, oldValue) => {
  console.log(newValue[0], "selected File");
});
</script>
