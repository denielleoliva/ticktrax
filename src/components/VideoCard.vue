<template>
  <div class="my-card">
    <q-card>
      <q-card-section>
        <div class="text-h6">Capture a video frame to proceed</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="row q-gutter-md">
          <div class="col-lg col-sm">
            <p class="text-weight-medium">Video</p>
            <div class="q-video videoWrapper">
              <video ref="video" :src="$props.source" type="video/mp4" controls></video>
            </div>
            <q-btn outline color="primary" @click="capture">Capture</q-btn>
          </div>
          <div class="col-lg col-sm">
            <p class="text-weight-medium">Captured frame</p>
            <div class="videoWrapper">
            <canvas ref="canvas" class="skeleton"></canvas>
            </div>
            <q-btn outline color="grey" @click="removeCanvas" :disable="isDisabledRemoveBtn">Remove</q-btn>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <div class="q-gutter-md q-pa-sm">
        <q-btn outline label="Cancel" color="grey" @click="alert = true" />
        <q-btn  label="Proceed" color="primary" :disable="isDisabledRemoveBtn" @click="onProceed" />
        </div>
      </q-card-actions>
    </q-card>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Leave page?</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          This will remove the uploaded video and any captured frame.
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Leave" color="grey" @click="onLeaveVideoCard" v-close-popup  />
          <q-btn flat label="Stay"  v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

</template>

<script setup>

import {ref, defineProps, defineEmits} from "vue";

const video = ref(null);
const canvas = ref(null);
const image = ref(null);
const isDisabledRemoveBtn = ref(true);
const alert = ref(false);

const props = defineProps(['source']);
const emits = defineEmits(['leaveVideoCard', 'onVideoMetaData'])



const removeCanvas = () => {
  canvas.value.width += 0;
  isDisabledRemoveBtn.value = true;
}

const onLeaveVideoCard = () => {
  canvas.value.width += 0;
  emits('leaveVideoCard', true);
}

const onProceed = () => {
  const img = canvas.value.toDataURL('image/png');
  console.log(img);
  const payload = {coords: {lat: 0, long: 0}, dateTime: undefined, pngImage: img, sourceFile: null};

  emits('onVideoMetaData', payload);

}


const capture = () => {
  isDisabledRemoveBtn.value = false;

  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;
  canvas
    .value
    .getContext("2d")
    .drawImage(video.value, 0, 0, video.value.videoWidth, video.value.videoHeight);

  /** Code to merge image **/
  /** For instance, if I want to merge a play image on center of existing image **/
  // const playImage = new Image();
  // playImage.src = "path to image asset";
  // playImage.onload = () => {
  //   const startX = video.value.videoWidth / 2 - playImage.width / 2;
  //   const startY = video.value.videoHeight / 2 - playImage.height / 2;
  //   canvas
  //     .value
  //     .getContext("2d")
  //     .drawImage(playImage, startX, startY, playImage.width, playImage.height);
  //   canvas.value.toBlob((blob) => {
  //     const img = new Image();
  //     img.src = window.URL.createObjectURL(blob);
  //     image.value.src = img.src;
  //   });
  // };
  /** End **/
};



</script>

<style lang="scss" scoped>
.videoWrapper > video,
.videoWrapper > canvas {
  min-height: 297px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  &.skeleton {
    background-color: #e2e5e7;
    background-image:
      linear-gradient(
          90deg,
          rgba(#fff, 0),
          rgba(#fff, 0.5),
          rgba(#fff, 0)
      );
    background-size: 40px 100%;
    background-repeat: no-repeat;
    background-position: left -40px top 0;
    animation: shine 2.5s ease infinite;
  }
}

.my-card {
  width: 100%;
  height: 272px;
}



@keyframes shine {
  0% {
    background-position: left -40px top 0;
  }
  50% {
    background-position: right -40px top 0;
  }
  100% {
    background-position: left -40px top 0;
  }
}





</style>
