<template>
  <div>
    <p class="text-h5 row justify-center text-weight-medium lt-sm" :class="!isDarkMode ? 'text-grey-9': ''">Preview Tick Report</p>
    <p class="text-h4 row justify-center text-weight-medium gt-sm" :class="!isDarkMode ? 'text-grey-9': ''">Preview Tick Report</p>
    <q-card>
      <q-card-section class="row q-pa-lg">
        <map-element class="col q-mr-md desktop-only" :user-input="coords" marker-msg="Tick observed here." :geoJson="{}" />
        <div>
          <div class="q-pl-lg" style="max-width: 300px">
            <div class="q-pb-md desktop-only"><q-img v-if="metaData.pngImage != null" :src="metaData.pngImage" style="height: 140px; max-width: 300px" /></div>

            <p class="text-weight-medium">Observed:</p>
<!--            {{date}}-->
<!--            <q-icon name="edit" class="q-pb-sm"/>-->
            <q-input filled v-model="date" class="q-pb-md">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date" mask="YYYY-MM-DD HH:mm">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="date" mask="YYYY-MM-DD HH:mm" format24h>
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <map-element class="col q-mr-md mobile-only" style="height: 15rem!important;" :user-input="coords" marker-msg="Tick observed here." :geoJson="{}"  />
            <div class="q-pt-lg mobile-only"><q-img v-if="metaData.pngImage != null" :src="metaData.pngImage" style="height: 140px; max-width: 300px" /></div>
            <div class="q-pt-md q-gutter-xl row justify-between">
              <q-btn color="white" size="md" text-color="black" label="back" @click="goBack" />
              <q-btn color="positive" size="md" label="Submit" @click="onSubmit" />
            </div>
          </div>
          </div>
      </q-card-section>
<!--      <q-card-actions align="center" class="mobile-only row justify-around" >-->
<!--        <div class="q-pb-md q-gutter-xl">-->
<!--        <q-btn color="white" size="md" text-color="black" label="back" @click="goBack" />-->
<!--        <q-btn color="positive" size="md" label="Submit" />-->
<!--        </div>-->
<!--      </q-card-actions>-->
    </q-card>


  </div>
</template>

<script setup>
import {ref, watch, defineProps, defineEmits} from "vue";
import {Dark} from "quasar";
import MapElement from "components/MapElement.vue";
import {dateAdapter} from "src/utils";
const isDarkMode = ref(false);
const coords = ref([]);
const date = ref('');

const props = defineProps(['metaData']);
const emit = defineEmits(['setPreviewCard'])

coords.value = [props.metaData.coords.long, props.metaData.coords.lat];
date.value = dateAdapter(props.metaData.dateTime);

watch(date, ()=> {
  console.log(date.value)
})
watch(() => Dark.isActive, val => {
  isDarkMode.value = val;
  console.log(props.metaData);

})

function goBack() {
  emit('setPreviewCard', false)
}

function onSubmit() {
  const formData = new FormData();
  formData.append('image', props.metaData.pngImage);
  formData.append('date', date.value);
  formData.append('coordinates', coords.value.join(','));
 // formData.append('tickType', tickType.value);
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
  }

  //Send to backend TBD
}


</script>

<style lang="sass" scoped>

.my-card
  width: 800px

.text
  width: 100%


.container
  display: grid
  grid-template-columns: 1.3fr 1.3fr
  grid-template-rows: 0.8fr 0.8fr
  gap: 0 0
  border: 1px dotted red
  z-index: 999

  grid-auto-flow: row
  grid-template-areas: "Picture Map"

.Picture
  grid-area: Picture
.Map
  grid-area: Map

.grid-view
  grid-column: 1/span all
  grid-row: 1/span all



.parent
  display: grid
  grid-template-columns: repeat(5, 1fr)
  grid-template-rows: repeat(5, 1fr)
  grid-column-gap: 0
  grid-row-gap: 0
.div1
  grid-area: 1 / 1 / 4 / 3
.div2
  grid-area: 1 / 3 / 4 / 6
.div3
  grid-area: 4 / 3 / 5 / 6


</style>
