<template>
  <div>
    <p class="text-h5 row justify-center text-weight-medium lt-sm" :class="!isDarkMode ? 'text-grey-9': ''">Preview Tick Report</p>
    <p class="text-h4 row justify-center text-weight-medium gt-sm" :class="!isDarkMode ? 'text-grey-9': ''">Preview Tick Report</p>
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Information needed</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Unable to collect necessary information from image. Please make sure the image is clear,
          focused, and all required information is included.

        </q-card-section>
        <q-card-section class="q-pt-xs">
          You can manually add location and date on the map.
          If problem persists, try with a different image or contact support. Thank you.
        </q-card-section>

        <q-card-section class="q-pt-xs">
          What we need from you:
          <div class="column">
            <div class="col-4 col-md-6 text-bold q-pa-sm" v-show="date === ''">Date and time</div>
            <div class="col-4 col-md-6 text-bold q-pa-sm" v-show="coords.length === 2 && coords[0] === 0 && coords[1] === 0">Location</div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-card>
      <q-card-section class="row q-pa-lg">
        <map-element class="col q-mr-md desktop-only"
                     :user-input="coords"
                     marker-msg="Tick observed here."
                     :marker-image="metaData.pngImage"
                     @onClickedMarker="onClickedMarker"
                     :geoJson="{}" />
        <div>
          <div class="q-pr-sm" style="width: 300px">
            <div class="q-pb-md desktop-only"><q-img v-if="metaData.pngImage != null" :src="metaData.pngImage" style="height: 140px; max-width: 300px" /></div>

            <p class="text-weight-medium">Observed:</p>
            <!--            {{date}}-->
            <!--            <q-icon name="edit" class="q-pb-sm"/>-->
            <q-input filled v-model="date" class="q-pb-md" @click="hi">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale" v-if="showDate">
                <q-date v-model="date" :mask="`YYYY-MM-DD${' '.repeat(timeSpace)}HH:mm`" minimal >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="grey" flat />
                    <q-btn label="Next" color="primary" flat >
                    </q-btn>
                  </div>
                </q-date>
              </q-popup-proxy>
              <q-popup-proxy cover transition-show="scale" transition-hide="scale" v-else>
                <q-time v-model="date" :mask="`YYYY-MM-DD${' '.repeat(timeSpace)}HH:mm`" minimal>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>

              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer" color="primary">
                  <!--                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">-->
                  <!--                    <q-date v-model="date" :mask="`YYYY-MM-DD${' '.repeat(timeSpace)}HH:mm`" minimal >-->
                  <!--                      <div class="row items-center justify-end">-->
                  <!--                        <q-btn v-close-popup label="Close" color="grey" flat />-->
                  <!--                        <q-btn label="Next" color="primary" flat >-->
                  <!--                        </q-btn>-->
                  <!--                      </div>-->
                  <!--                    </q-date>-->
                  <!--                  </q-popup-proxy>-->
                </q-icon>
              </template>


              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer time-icon" color="primary">
                  <!--                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">-->
                  <!--                    <q-time v-model="date" :mask="`YYYY-MM-DD${' '.repeat(timeSpace)}HH:mm`" format24h minimal>-->
                  <!--                      <div class="row items-center justify-end">-->
                  <!--                        <q-btn v-close-popup label="Close" color="primary" flat />-->
                  <!--                      </div>-->
                  <!--                    </q-time>-->
                  <!--                  </q-popup-proxy>-->
                </q-icon>
              </template>
            </q-input>
            <map-element class="col q-mr-md mobile-only" style="height: 15rem!important;" :user-input="coords" marker-msg="Tick observed here." :geoJson="{}"  />
            <div class="q-pt-lg mobile-only"><q-img v-if="metaData.pngImage != null" :src="metaData.pngImage" style="height: 140px; max-width: 300px" /></div>
            <div class="q-pt-xs q-gutter-xl row justify-between">
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

    <q-inner-loading :showing="showLoading" label="Submitted! routing to home..." label-class="text-positive" label-style="font-size: 1.1em"/> 
        <q-dialog v-model="showThanks">
            <q-card class="row" align="center" style="width:50%; height:50%; align-self:center;" >
              <div class="row" style="align-self:center">
                Thank You! Your photo has been submitted. Would you like to submit more ticks?
              </div>
              <div class="row" style="justify-content:center">
                <q-btn color="primary" size="md" text-color="white" label="submit again" @click="goBack"/>
                <q-space/>
                <q-btn color="#F5F5DC" size="md" text-color="black" label="return to home"@click="$router.push('/')"/>
              </div>
            </q-card>
        </q-dialog>
        <q-dialog v-model="showFail">
            <q-card class="row" style="width:50%; height:50%; justify-content:center; align-content:center">
                Submission failed... please try again
            </q-card>
        </q-dialog>
  </div>
</template>

<script setup>
import {ref, watch, defineProps, defineEmits, router} from "vue";
import {Dark} from "quasar";
import MapElement from "components/MapElement.vue";
import {dateAdapter} from "src/utils";
const isDarkMode = ref(false);
const coords = ref([]);
const date = ref('');
const alert = ref(false);
const showDate = ref(false);
const showLoading = ref(false);
const showThanks = ref(false);
const showFail = ref(false);

const props = defineProps(['metaData']);
const emit = defineEmits(['setPreviewCard']);

const timeSpace = 27;

//console.log(props.metaData, "metaData")
coords.value = [props.metaData.coords.long, props.metaData.coords.lat];
date.value = props.metaData.dateTime ? dateAdapter(props.metaData.dateTime): '';

if (date.value === '') {
  alert.value = true;
}

function hi(event){
  console.log('focused', event.target.offsetWidth, event.clientX);
  const inputBox = event.target;
  const clickX = event.offsetX;
  const clickY = event.offsetY;
  console.log(clickX, event.target.offsetWidth/2);
  showDate.value = clickX < event.target.offsetWidth / 2;
}


watch(() => Dark.isActive, val => {
  isDarkMode.value = val;

});

watch(date, (val)=> {
  console.log(val, "DAYTE")
})

function goBack() {
  emit('setPreviewCard', false)
}

function onClickedMarker(lngLat) {
  coords.value = lngLat;
}

async function onSubmit() {
  if (date.value === '' || coords.value.length > 2 || (coords.value[0] === 0 && coords.value[1] === 0)) {
    alert.value = true;
    return;
  }
  const formData = new FormData();
  formData.append('image', props.metaData.pngImage);
  formData.append('date', date.value);
  formData.append('coordinates', coords.value.join(','));
  // formData.append('tickType', tickType.value);
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ', ' + pair[1]);
  }

  console.log("Coords value:", coords.value);
  console.log( props.metaData.pngImage.replace("data:image/png;base64,", ""), "HELLO")

  //Send to backend TBD

  //photo
  //latitude
  //longitude
  //caption
  //time

  const caption = 'we do not have captions right now'

  const formattedDateTime = new Date(date.value)

  console.log(date.value)

  const url = 'http://localhost:5095/submission'

  const token = sessionStorage.getItem("token")

  const auth = `Bearer ${token}`

  showLoading.value = true

  await fetch(url, {
    //  this means we add to database
    method: 'POST',

    //  this means we are adding of type json
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : auth
      },

      //  this are the fields in json format (hopefully)
      body: JSON.stringify({photo: props.metaData.pngImage.replace("data:image/png;base64,", ""), filename: 'tickPic2' , fileType: 'png' , latitude: 0, longitude: 0, time: '2023-01-01T00:00:00'})
  })
  //  unwrap the response
  .then((response) => {
    if(response.status === 200){
      //  stops loading 
      showLoading.value = false

      //  indicate post success
      console.log("API POST SUCCESS")

      showLoading.value = true

      setTimeout(() => {
        showLoading.value = false
        //send back to home
      }, 1500);
      return
    }
    showLoading.value = false
  })

  .catch((error) => {
    //  stops loading
    showLoading.value = false

    console.log("API POST FAIL")

    showFail.value = true
    
    return
  })
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

.time-icon
  position: absolute
  margin-left: -4em


</style>
