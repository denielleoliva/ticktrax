<template>
  <q-layout>

    <q-page
      :class="$q.dark.isActive ? null : 'bg-green-1'"
    >
      <div class="q-pa-md q-gutter-xs my-form">
        <form-preview-card v-if="showPreviewCard && coords.length > 0" :metaData="metaData" @setPreviewCard="setPreviewCard"  />
       <upload-card v-else @handleUploadData="handleUploadData"  />
      </div>
    </q-page>

  </q-layout>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { Dark } from 'quasar';

import UploadCard from "components/uploadCard.vue";
import FormPreviewCard from "components/formPreviewCard.vue";
import Cookies from 'js-cookie';




const isDarkMode = ref(false);
const metaData = ref({});
const coords = ref([]);
const showPreviewCard = ref(false);



Cookies.set('foo', 'bar')

watch(() => Dark.isActive, val => {
  isDarkMode.value = val;
  //console.log(Cookies.get('foo'))
});




function setPreviewCard(state) {
  showPreviewCard.value = state
}

function handleUploadData(inputData) {
  metaData.value = inputData;
  coords.value = [metaData.value.coords.long, metaData.value.coords.lat]

  showPreviewCard.value = true;
}



</script>

<style lang="sass" scoped>

.my-form
  margin: auto
  max-width: 1140px
  width: 100%

</style>
