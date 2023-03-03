<template>
  <q-layout>

    <q-page
      :class="$q.dark.isActive ? null : 'bg-green-1'"
    >
      <!--      <FilterByLocation class="my-table"/>-->
      <!--      <map-element :key="tickMapKey" :userInput="[]" :geoJson="geoJson" />-->
      <div class="main">
        <cool-light-box
          :items="items"
          :index="index"
          :useZoomBar="true"
          @close="index = null"/>
        <div class="country-navigation q-pb-md column">
          <div class="text-h5 q-mb-xs">Tick Observations</div>
          <div id="overview-countrySelectors" class="shiny-html-output shiny-bound-output" aria-live="polite"><div>
            <q-btn no-caps flat color="primary" label="North America" @click="flyTo([-105.2551, 40.5260])" />
            <q-btn no-caps flat color="primary" label="South America" @click="flyTo([-55.4915, -9.7832])" />
            <q-btn no-caps flat color="primary" label="Europe" @click="flyTo([15.2551, 54.5260])" />
          </div>
          </div>
          <FilterSearchBars @filteredResults="getFilteredResults" />
          <stats-view :tick-count="tickCount" :isLoadingTickData="isLoadingTickData" :key="isLoadingTickData" />
        </div>
        <div class="flex">
          <!-- Map Display here -->
          <div class="map-holder">
            <div id="map"></div>
            <div id="popup" ref="htmlPopup" @click="popupClicked" style="max-width: 210px" >
              <div class="column" v-if="tickPopupInfo.scientificName">
                <div class="q-mx-auto" v-if="tickPopupInfo.commonName">
                  <span class="text-subtitle1">{{tickPopupInfo.commonName}}</span>
                </div>
                <p class="q-mx-auto">
                  <span class="text-weight-light">({{tickPopupInfo.scientificName}})</span>
                </p>
                <q-separator />
                <span class="text-weight-medium col-4 col-md-6 q-pt-sm">Observed:</span>
                <span class="date col-4 col-md-6 q-pb-sm" :title="tickPopupInfo.dateTime">{{tickPopupInfo.observedOn}}</span>
                <div class="q-gutter-sm row items-start justify-center">

                  <q-img v-for="(image, i) in tickPopupInfo.imageUrls"
                         class="enlarge-image"
                         :key="`tick-${i}`"
                         @click="index = i"
                         :src="image"
                         :alt="tickPopupInfo.commonName" />
                </div>
              </div>
            </div>
          </div>
          <!-- Coordinates Display here -->
          <q-card class="my-card" style="width: 400px">
            <q-card-section class="bg-primary text-white q-pa-xs">
            </q-card-section>
            <q-card-section>
              <div class="text-h5 text-center">Control Panel</div>

            </q-card-section>
            <q-separator inset />
            <q-toggle
              v-model="showHeatmap"
              :label="showHeatmap? 'Hide heatmap': 'Show heatmap'"
            />
            <q-card-section >
              <h3 class="text-h5">Current Coordinates</h3>
              <p class="q-pl-sm text-bold">Latitude: {{center[0]}}</p>
              <p class="q-pl-sm text-bold">Longitude: {{center[1]}}</p>
            </q-card-section>
            <q-card-section class="q-pt-none">
              <h3 class="text-h5">Current Location</h3>

              <q-input class="q-pb-md" outlined v-model="location" label="location" style="max-width: 300px" >
                <template v-slot:append v-if="isLoadingLocation">
                  <q-spinner-radio
                    color="primary"
                    size="1.5em"
                  />
                  <q-tooltip :offset="[0, 8]">QSpinnerRadio</q-tooltip>
                </template>
              </q-input>

              <q-btn color="primary" label="Get Location" @click="getLocation" />
            </q-card-section>

          </q-card>
          <tabular-view :dataTable="tableData"
                        :key="filterParameterKey"
                        v-if="Object.keys(tableData).length > 0"
                        @onImageClick="onImageClick"
                        @onLocateClick="onLocateClick"/>



          <!--          <div class="display-arena">-->
          <!--            <div class="coordinates-header">-->
          <!--              <q-toggle-->
          <!--                v-model="showHeatmap"-->
          <!--                :label="showHeatmap? 'Hide heatmap': 'Show heatmap'"-->
          <!--              />-->

          <!--&lt;!&ndash;              <q-btn v-if="showHeatmap" label="See heatmap" @click="onMapTypeClick('heatmap')" />&ndash;&gt;-->
          <!--&lt;!&ndash;              <q-btn v-else label="See regular map" @click="onMapTypeClick('regular')" />&ndash;&gt;-->
          <!--              <h3 class="text-h4">Current Coordinates</h3>-->
          <!--              <p>Latitude: {{center[0]}}</p>-->
          <!--              <p>Longitude: {{center[1]}}</p>-->
          <!--            </div>-->
          <!--            <div class="coordinates-header">-->
          <!--              <h3 class="text-h4">Current Location</h3>-->

          <!--              <q-input class="q-pb-md" outlined v-model="location" label="location" >-->
          <!--                <template v-slot:append v-if="isLoadingLocation">-->
          <!--                  <q-spinner-radio-->
          <!--                    color="primary"-->
          <!--                    size="1.5em"-->
          <!--                  />-->
          <!--                  <q-tooltip :offset="[0, 8]">QSpinnerRadio</q-tooltip>-->
          <!--                </template>-->
          <!--              </q-input>-->

          <!--              <q-btn color="positive" label="Get Location" @click="getLocation" />-->

          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </q-page>
  </q-layout>
</template>

<script setup>
import { Dark } from 'quasar';
import {ref, watch, onMounted} from "vue";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import {formatDate, JSONtoGeoJSON} from "src/utils";
import axios from "axios";
import {Geolocation} from "@capacitor/geolocation";
import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';
import {ClusterMapLayer, HeatMapLayer} from "src/MapLayerStrategy";
import TabularView from "components/TabularView.vue";
import FilterSearchBars from "components/FilterSearchBars.vue";
import StatsView from "components/StatsView.vue";
import BarChart from "components/LineChart.vue";


const items = ref([]);
const index = ref(null);

const tableData = ref({});

const isDarkMode = ref(false);

const mapTile = ref('mapbox://styles/mapbox/streets-v11');

const tickMapKey = ref('');

const searchLoading = ref(false);

const location = ref('');

const isLoadingLocation = ref(false);
const isLoadingTickData = ref(false);

const showHeatmap = ref(false);

const filterParameterKey = ref('');

const tickPopupInfo = ref({
  commonName: '',
  scientificName: '',
  observedOn: '',
  dateTime: '',
  imageUrls: [],
})


let map = {};

watch(() => Dark.isActive, val => {
  isDarkMode.value = val;
  mapTile.value = Dark.isActive ? 'mapbox://styles/mapbox/dark-v10':'mapbox://styles/mapbox/streets-v11';
  //map.setStyle(mapTile.value);

  // newMap(showHeatmap.value ? 'heatmap': 'regular')

  switchLayer();

})


const sheetId = '1rJaYUmA0Ua26IS6sQsFIQhpTbCdSyxzT9s5W5xXLD7c';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Sheet2';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
const data = []
document.addEventListener('DOMContentLoaded', init)


const geoJson = ref({});

const tickCount = ref(0);

const htmlPopup = ref(null);
function popupClicked () {
  console.log("yes clicked!!!!");
}


watch(showHeatmap, (value) => {
  if (value) {
    onMapTypeClick('heatmap');
  } else {
    onMapTypeClick('regular');
  }
})


const center = ref([-111.549668, 39.014]);

watch(geoJson, (value)=> {
  console.log('changed!', value);
  tickMapKey.value = geoJson.value
  tickCount.value = value.features.length;
})
function init() {
  return new Promise((resolve, reject) => {
    isLoadingTickData.value = true;
    fetch(url)
      .then(res => res.text())
      .then(rep => {
        //Remove additional text and extract only JSON:
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));


        const table = JSONtoGeoJSON(jsonData);
        //tableData.value = jsonData.table.rows;
        tableData.value = table.features;
        console.log(table, 'table')
        isLoadingTickData.value = false;
        resolve(table);
      });
  })

}



onMounted(() => {
  getCurrentPosition().then((coords) => {
    center.value = coords;
  })
  initMap();
  createMap('regular');

});

function initMap() {

  try {
    mapboxgl.accessToken = "pk.eyJ1IjoicnN1bHRhbiIsImEiOiJjbGRjcTF1bDMwNHNiM25wNm1oZ2dzbWg2In0.yMbTf053wvYrnzJwUyqqYQ";

    map = new mapboxgl.Map({
      container: "map",
      style: mapTile.value,
      center: center.value,
      zoom: 3,
    });

    let geocoder = new MapboxGeocoder({
      accessToken: "pk.eyJ1IjoicnN1bHRhbiIsImEiOiJjbGRjcTF1bDMwNHNiM25wNm1oZ2dzbWg2In0.yMbTf053wvYrnzJwUyqqYQ",
      mapboxgl: mapboxgl,
      marker: false,
      placeholder: 'Search places, find ticks',

    });

    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });

    map = map.addControl(geocoder);
    map = map.addControl(geolocate, "bottom-right");

    geocoder.on("result", (e) => {
      new mapboxgl.Marker({
        draggable: true,
        color: "#21ba45",
      })
        .setLngLat(e.result.center)
        .addTo(map);
      center.value = e.result.center;
      marker.on("dragend", (e) => {
        center.value = Object.values(e.target.getLngLat());
      });
    });

  } catch (e) {
    console.log("error init map", e);
  }

}

function getFilteredResults(payload) {
  //const features = map.queryRenderedFeatures({ layers: ['unclustered-point'] });

  //console.log(geoJson.value.features, "features");

  filterParameterKey.value = JSON.stringify(payload);

  let filteredResults = geoJson.value.features;
  console.log(payload, "params");
  if (payload.selectedTick) {
    filteredResults = filteredResults.filter(function (el) {
      return el.properties.commonName === payload.selectedTick;

    });
  }

  if (typeof payload.dateRange === "object" &&
    payload.dateRange !== null &&
    !Array.isArray(payload.dateRange) &&
    payload.dateRange.from !== '' &&
    payload.dateRange.to !== '') {
    filteredResults = filteredResults.filter(function (el) {
      let date = new Date(el.properties.observedOn);
      date.setHours(0,0,0,0);
      return date >= new Date(payload.dateRange.from) && date <= new Date(payload.dateRange.to);
    });
  }


  tickCount.value = filteredResults.length;
  tableData.value = filteredResults;
  map.getSource('ticks').setData({id: 'ticks', type: 'FeatureCollection', features: filteredResults});

  console.log(filteredResults);



}

function setLayerSource (layerId, source, sourceLayer) {
  const oldLayers = map.getStyle().layers;
  const layerIndex = oldLayers.findIndex(l => l.id === layerId);
  const layerDef = oldLayers[layerIndex];
  const before = oldLayers[layerIndex + 1] && oldLayers[layerIndex + 1].id;
  layerDef.source = source;
  if (sourceLayer) {
    layerDef['source-layer'] = sourceLayer;
  }
  map.removeLayer(layerId);
  map.addLayer(layerDef, before);
}


function switchLayer() {
  // switchLayer fn will be called once on layer switched
  map.once("styledata", () => {
    const marker = isDarkMode.value ? 'pest_darkmode.png': 'pest.png';

    map.loadImage(
      marker,
      (error, image) => {
        if (error) throw error;
        map.addImage('tick-icon', image);
      });
    const clusterMap = new ClusterMapLayer();
    clusterMap.addSource(map, geoJson.value);
    clusterMap.addLayers(map);
    clusterMap.subscribeEvents(map);

    const heatmap = new HeatMapLayer();
    heatmap.addLayers(map);
    if (showHeatmap.value) {
      newMap('heatmap');
    }
  });
  map.setStyle(mapTile.value);
}
function createMap(mapType) {
  console.log(mapType);
  try {
    map.on('load', async () => {
      const geoJ = await init();
      geoJson.value = geoJ;
      map.loadImage(
        'pest.png',
        (error, image) => {
          if (error) throw error;
          map.addImage('tick-icon', image);
        });

      const clusterMap = new ClusterMapLayer();
      clusterMap.addSource(map, geoJ);
      clusterMap.addLayers(map);
      clusterMap.subscribeEvents(map);

      const heatmap = new HeatMapLayer();
      heatmap.addLayers(map);


      // location of the feature, with description HTML from its properties.
      map.on('click', 'unclustered-point', (e) => {
// Copy coordinates array.
        renderListings(e);

      });


    });


  } catch (err) {
    console.log("map error", err);
  }
}

function newMap(mapType) {
  const style = map.getStyle()

  if (mapType === 'heatmap') {
    style.sources.ticks.cluster = false;
    if (map.hasImage('tick-icon')) map.removeImage('tick-icon');
    map.setStyle(style)

    map.setLayoutProperty('clusters', 'visibility', 'none');
    map.setLayoutProperty('cluster-count','visibility', 'none');
    map.setLayoutProperty('unclustered-point','visibility', 'none');
    console.log(style.sources.ticks);


    map.setLayoutProperty('heatmap-ticks', 'visibility', 'visible');
  } else {
    style.sources.ticks.cluster = true;
    map.setStyle(style);
    if (!map.hasImage('tick-icon')) {
      map.loadImage(
        'pest.png',
        (error, image) => {
          if (error) throw error;
          map.addImage('tick-icon', image);
        });
    }

    map.setLayoutProperty('clusters', 'visibility', 'visible');
    map.setLayoutProperty('cluster-count','visibility', 'visible');
    map.setLayoutProperty('unclustered-point','visibility', 'visible');
    //clusterMap.subscribeEvents(map);
    map.setLayoutProperty('heatmap-ticks', 'visibility', 'none');
  }

}

function renderListings(e) {
  console.log(e.features[0].properties, "hello?");

  const coordinates = e.features[0].geometry.coordinates.slice();

  const commonName = e.features[0].properties.commonName;

  const scientificName = e.features[0].properties.scientificName;

  const dateTime = e.features[0].properties.observedOn;

  const imageUrls = e.features[0].properties.imageUrls.split(',');

  const attribution = e.features[0].properties.attribution;

  items.value = imageUrls.map(url => {
    // const largeImage = url.replace(re, "/medium" + ext);
    return {
      src: url.replace("square", "medium"),
      title: commonName,
      description: attribution

    }});

  let observedOn = formatDate(dateTime);
  if (observedOn === '') {
    observedOn = 'Unknown';
  }

  tickPopupInfo.value = {
    commonName,
    scientificName,
    dateTime,
    observedOn,
    imageUrls,
    attribution
  };

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  new mapboxgl.Popup()
    .setLngLat(coordinates)
    //.setHTML(description)
    .setDOMContent(htmlPopup.value)
    .addTo(map);
}




async function getLocation() {
  isLoadingLocation.value = true;
  const coordinates = await getCurrentPosition();
  center.value
  try {
    searchLoading.vaulue = true;
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=pk.eyJ1IjoicnN1bHRhbiIsImEiOiJjbGRjcTF1bDMwNHNiM25wNm1oZ2dzbWg2In0.yMbTf053wvYrnzJwUyqqYQ`
    );
    console.log('hello', response)
    searchLoading.value = false;
    location.value = response.data.features[0].place_name;
  } catch (err) {
    searchLoading.value = false;
    console.log(err);
    isLoadingLocation.value = false;
  }
  isLoadingLocation.value = false;
}

async function getCurrentPosition() {
  const newPosition  = await Geolocation.getCurrentPosition();
  const coords = newPosition.coords;
  return [coords.longitude, coords.latitude];
}

function onMapTypeClick(mapType) {
  showHeatmap.value = mapType === 'heatmap';
  //createMap(mapType);
  newMap(mapType);
}

function flyTo(coords, zoom = 3) {
  map.flyTo({
    center: coords,
    essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    zoom,
  });
}


function onImageClick(row) {
  console.log(' clicked from tablar view', row);
  const commonName = row.commonName;
  const imageUrls = row.imageUrls.split(',');
  const attribution = row.attribution;
  items.value = imageUrls.map(url => {
    return {
      src: url.replace("square", "medium"),
      title: commonName,
      description: attribution

    }});

  index.value = 0;
}

function onLocateClick(lngLat) {
  console.log('locating...', lngLat)
  flyTo(lngLat, 11);
}

</script>

<style lang="sass" scoped>
.main
  padding: 45px 50px
.flex
  display: flex
  flex-direction: row
  justify-content: space-evenly
.map-holder
  width: 65%
#map
  height: 70vh
.display-arena
  background: #ffffff
  box-shadow: 0px -3px 10px rgba(0, 58, 78, 0.1)
  border-radius: 5px
  padding: 20px 30px
  width: 25%
.coordinates-header
  margin-bottom: 50px
  h3
    color: #1f2a53
    font-weight: 600
  p
    color: rgba(13, 16, 27, 0.75)
    font-weight: 600
    font-size: 0.875rem
.form-group
  position: relative
.location-control
  height: 30px
  background: #ffffff
  border: 1px solid rgba(31, 42, 83, 0.25)
  box-shadow: 0 0 10px rgba(73, 165, 198, 0.1)
  border-radius: 4px
  padding: 0 10px
  width: 90%
  &:focus
    outline: none
.location-btn
  margin-top: 15px
  padding: 10px 15px
  background: #d80739
  box-shadow: 0 4px 10px rgba(73, 165, 198, 0.1)
  border-radius: 5px
  border: 0
  cursor: pointer
  color: #ffffff
  font-size: 0.875rem
  font-weight: 600
  &:focus
    outline: none
.disabled
  background: #db7990
  cursor: not-allowed
.copy-btn
  background: #f4f6f8 0 0 no-repeat padding-box
  border: 1px solid #f4f6f8
  border-radius: 0 3px 3px 0
  position: absolute
  color: #5171ef
  font-size: 0.875rem
  font-weight: 500
  height: 30px
  padding: 0 10px
  cursor: pointer
  right: 3.5%
  top: 5%
  &:focus
    outline: none


.date
  line-height: 20px
  color: #333
  font-family: Whitney,"Trebuchet MS",Arial,sans-serif
  box-sizing: border-box
  font-size: 13px


.overview-page
  background: #F4F5F5
  height: 100vh
  width: 100vw
  padding: 20px
  display: grid
  gap: 20px
  grid-template-areas: "nav nav"
  grid-template-columns: 1.6fr 1fr
  grid-template-rows: 55px 105px 1fr 290px
  .filters
    display: grid
    grid-area: filters
    grid-template-columns: 2fr 1.5fr
    gap: 20px
  .tick-cases-card
    .cases-widget
      display: grid
      grid-template-columns: 30px 1fr
      grid-template-rows: 40px 1fr 20px
      grid-template-areas: 'icon metric'

      padding-left: 20px
      color: #1B4942
.overview-page .tick-cases-card #overview-cases_card_ui, .overview-page .tick-cases-card .cases-widget
  height: 100%
  width: 100%

.country-navigation
  display: flex
  align-items: center
  margin: -20px -20px 0 25px
  .page-title
    font-family: Arnhem, serif
    font-style: normal
    font-weight: 300
    font-size: 32px
    line-height: 118%
    padding-right: 20px
    padding-left: 20px

</style>
