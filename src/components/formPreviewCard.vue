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
      <q-card-section class="row q-py-lg justify-center">
        <map-element class="col q-mr-md desktop-only"
                     :user-input="coords"
                     marker-msg="Tick observed here."
                     :marker-image="metaData.pngImage"
                     :show-red-border="showRedBorderMap"
                     @onClickedMarker="onClickedMarker"
                     :geoJson="{}" />
        <div>
          <div class="q-px-lg" style="width: 300px">
            <div class="q-pb-md desktop-only">
              <q-img v-if="metaData.pngImage != null"
                     :src="metaData.pngImage"
                     style="height: 140px; max-width: 300px" />
            </div>

            <div class="text-weight-medium q-pb-sm">Observed:</div>
            <!--            {{date}}-->
            <!--            <q-icon name="edit" class="q-pb-sm"/>-->
            <q-input filled v-model="date" :placeholder="'Date' + ' '.repeat(timeSpace + 10) +'Time'" class="q-pb-lg" @click="showDateElement" :rules="[val => !!val || 'Field is required']" :error="showRedDateInput">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale" v-if="showDate">
                <q-date v-model="date" :mask="`YYYY-MM-DD${' '.repeat(timeSpace)}HH:mm`" minimal >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Close" color="primary" flat />

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
            <map-element class="col q-mr-md mobile-only"
                         style="height: 15rem!important;"
                         :user-input="coords"
                         marker-msg="Tick observed here."
                         :show-red-border="showRedBorderMap"
                         @onClickedMarker="onClickedMarker"
                         :geoJson="{}"  />
            <div class="q-pt-lg q-pb-md mobile-only"><q-img v-if="metaData.pngImage != null" :src="metaData.pngImage" style="height: 140px; max-width: 300px" /></div>
            <div class="q-pt-sm q-gutter-xl row justify-between">
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

    <q-dialog v-model="showModal" class="" persistent rounded style="font-size:large; background-color:pink">
        <div class="q-pa-lg bg-white" align="center">
            <div class="q-pa-lg" style="font-family:customfont; font-size:x-large">Photo Submitted!</div>
            <q-btn class="bg-primary text-white q-mx-md" @click="goBack()"> Submit another photo </q-btn>
            <q-btn class="bg-grey q-mx-md text-white" @click="$router.push('/maps')">
                Check out the heatmap
            </q-btn>
        </div>
    </q-dialog>
    <q-dialog v-model="showFail" class="" persistent rounded style="font-size:large; background-color:pink">
      <div class="q-pa-lg bg-white" align="center">
          <div class="q-pa-lg" style="font-family:customfont; font-size:x-large">Photo Submission Failed... Please Try Again!</div>
          <q-btn class="bg-primary q-mx-md text-white" @click="showFail = false">
              Try Again
          </q-btn>
          <q-btn class="bg-grey text-white q-mx-md" @click="$router.push('/')"> Go back home </q-btn>
      </div>
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

const showRedBorderMap = ref(false);
const showRedDateInput = ref(false);


const showModal = ref(false);
const showThanks = ref(false);
const showFail = ref(false);

const props = defineProps(['metaData']);
const emit = defineEmits(['setPreviewCard']);

const timeSpace = 18;

//console.log(props.metaData, "metaData")
coords.value = [props.metaData.coords.long, props.metaData.coords.lat];
date.value = props.metaData.dateTime ? dateAdapter(props.metaData.dateTime): '';

if (date.value === '') {
  alert.value = true;
}

function showDateElement(event){
  console.log('focused', event.target.offsetWidth, event.clientX);
  //const inputBox = event.target;
  const clickX = event.offsetX;
  //const clickY = event.offsetY;
  console.log(clickX, event.target.offsetWidth/2);
  showDate.value = clickX < event.target.offsetWidth / 2;
  showRedDateInput.value = false;
}


watch(() => Dark.isActive, val => {
  isDarkMode.value = val;

});

watch(date, (val)=> {
  console.log(val, "DATE")
});


function goBack() {
  emit('setPreviewCard', false)
}

function onClickedMarker(lngLat) {
  showRedBorderMap.value = false;
  coords.value = lngLat;
}


async function onSubmit() {
  //  set coords to 0 for now
  let latitude = 0
  let longitude = 0

  if (date.value === '' || coords.value.length > 2 || (coords.value[0] === 0 && coords.value[1] === 0)) {
    if (coords.value.length > 2 || (coords.value[0] === 0 && coords.value[1] === 0)) {
      showRedBorderMap.value = true;
    }

    if (date.value === '') {
      showRedDateInput.value = true;
    }

    alert.value = true;
    return;
  }

  //  create formdata object to hold body of post call
  const formData = new FormData();
  formData.append('image', props.metaData.pngImage);
  formData.append('date', date.value);
  formData.append('coordinates', coords.value.join(','));

  //  grab the coordinates
  for (let pair of formData.entries()) {
    //  save coords respectively
    longitude = pair[1].substring(0, pair[1].search(','))
    latitude = pair[1].substring(pair[1].search(',') + 1)
  }

  //  grab the date part of the date time value
  const datePart = date.value.substring(0, date.value.search(' '))

  //  grab the time part of the date time value
  const timePart = date.value.substring(date.value.lastIndexOf(' ') + 1)

  //  combine both parts
  //  note: T is for server acceptance and :00 is needed because we don't take a second's time
  const dateTime = datePart + "T" + timePart + ":00"

  //  set filetype to empty string for now
  let fileType = ''

  //  if the image photodata indicates its a png
  if(props.metaData.pngImage.search('image/png') > 0)   fileType = 'png'

  //  if the image photodata indicates its a jpeg
  if(props.metaData.pngImage.search('image/jpeg') > 0)   fileType = 'jpeg'

  //  grab url
  const url = 'http://localhost:5095/submission'

  //  grab token for auth
  const token = sessionStorage.getItem("token")

  //  setup auth header
  const auth = `Bearer ${token}`

  showModal.value = true

  //  get rid of the metadata headers on the picture
  const photoData = props.metaData.pngImage.replace("data:image/png;base64,", "")

  //  we still need to grab the file name (right now its a random string)
  const fileName = Math.random().toString(36).slice(2, 7);

  //  to check for database compatibility
  console.log("photo:", photoData);
  console.log("filename: ", fileName);
  console.log("fileType: ", fileType);
  console.log("latitude: ", longitude);
  console.log("longitude: ", latitude);
  console.log("time: ", dateTime);

  await fetch(url, {
    //  this means we add to database
    method: 'POST',

    //  this means we are adding of type json
    headers: {
      'Content-Type' : 'application/json',
      'Authorization' : auth
      },

      //  this are the fields in json format (hopefully)
      body: JSON.stringify({photo: photoData, filename: fileName , fileType: fileType , latitude: latitude, longitude: longitude, time: dateTime})
  })
  //  unwrap the response
  .then((response) => {
    if(response.status === 200){
      //  stops loading
      showModal.value = false;

      //  indicate post success
      console.log("API POST SUCCESS");
      showModal.value = true;

      return
    }
    showModal.value = false;
  })

  .catch((error) => {
    //  stops loading
    showModal.value = false;

    console.log("API POST FAIL");

    showFail.value = true;


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
