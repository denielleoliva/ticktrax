<template>
  <div class="map-container">
    <div id="map">
      <MglMap @load="onMapLoaded" @dblclick="doubleClickedMap"  :accessToken="token"
              :center="coordinates" :zoom="zoom"
              :mapStyle="mapTile">

        <MglNavigationControl position="top-right" />
        <MglGeolocateControl position="top-right" />
        <MglScaleControl position="bottom-right" />
        <MglFullscreenControl position="top-left" />
        <MglMarker v-if="markerCoordinates.length > 0 && markerCoordinates[0] !== 0 && markerCoordinates[1] !== 0" draggable
                   :coordinates="markerCoordinates"
                   color="limegreen" @dragend="onMarkerdragEnd">
          <MglPopup v-if="props.markerMsg && props.markerMsg.length > 0" >
              <p>{{props.markerMsg}}</p>
          </MglPopup>
        </MglMarker>
        <MglGeojsonLayer v-if="Object.keys(props.geoJson).length > 0 && Object.keys(geoJsonLayer).length > 0"
                         :layer-id="geoJsonLayer.id"
                         :layer="geoJsonLayer"
                         :source-id="geoJsonLayer.id"
                         @click="onLayerClick"
                         @mouseenter="setPointerCursor"
                         @mouseleave="unSetPointerCursor"
        />

      </MglMap>
  </div>

  </div>
</template>

<script setup>
import { Dark } from 'quasar'
import {ref, watch, onMounted} from 'vue'
import Mapbox from "mapbox-gl";
import { Geolocation } from '@capacitor/geolocation'
import { MglMap,MglAttributionControl,
  MglNavigationControl,
  MglMarker,
  MglPopup,
  MglGeojsonLayer,
  MglGeolocateControl,
  MglFullscreenControl,
  MglScaleControl } from "vue-mapbox";


const mapTile = ref('mapbox://styles/mapbox/streets-v11');

const props = defineProps({userInput: Array, markerMsg: String, geoJson: Object, markerImage: String});

const emits = defineEmits(['onClickedMarker']);

const geoJsonLayer = {
  id: "ticks",
  type: "symbol",
  source: {
    type: "geojson",
    data: props.geoJson
  },
  layout: {
    "icon-image": "marker-15",
    "icon-size": 2.25,
    "icon-allow-overlap": true,
  }
}


watch(() => Dark.isActive, val => {
  mapTile.value = Dark.isActive ? 'mapbox://styles/mapbox/dark-v10':'mapbox://styles/mapbox/streets-v11';
})

onMounted(() => {
  mapTile.value = Dark.isActive ? 'mapbox://styles/mapbox/dark-v10':'mapbox://styles/mapbox/streets-v11';
})




const token = "pk.eyJ1IjoicnN1bHRhbiIsImEiOiJjbGRjcTF1bDMwNHNiM25wNm1oZ2dzbWg2In0.yMbTf053wvYrnzJwUyqqYQ";

const coordinates = ref([-111.549668, 39.014]);
const markerCoordinates = ref(props.userInput);
const zoom = ref(3);

async function onMapLoaded(event) {
  const asyncActions = event.component.actions;
  const coords = await getCurrentPosition();
  if (props.userInput.length > 0 && props.userInput[0] !== 0 && props.userInput[1] !== 0) {
    await asyncActions.flyTo({
      center: props.userInput,
      zoom: 13,
      speed: 1
    });
  } else {
    await asyncActions.flyTo({
      center: coords,
      zoom: 13,
      speed: 1
    });
  }



}
async function getCurrentPosition() {
  const newPosition  = await Geolocation.getCurrentPosition();
  const coords = newPosition.coords;
  return [coords.longitude, coords.latitude];
}

function doubleClickedMap(event) {
  const coords = event.mapboxEvent.lngLat;
  markerCoordinates.value = [coords.lng, coords.lat];
  emits('onClickedMarker', [coords.lng, coords.lat]);
}

function onMarkerdragEnd(event) {
  const lat = event.mapboxEvent.target._lngLat.lat;
  const lng = event.mapboxEvent.target._lngLat.lng;
  markerCoordinates.value = [lng, lat];
  emits('onClickedMarker', [lng, lat]);
}

function onLayerClick(e){
  console.log(e.feature);

}

function setPointerCursor(e) {
  e.map.getCanvas().style.cursor = 'pointer';
}
function unSetPointerCursor(e){
  e.map.getCanvas().style.cursor = '';
}





</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 19rem;
}
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
</style>
