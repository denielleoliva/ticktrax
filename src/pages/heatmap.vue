<template >
    <q-page :class="$q.dark.isActive ? null : 'bg-green-1'">
        <div>
            <div align="center" style="font-family:customfont; font-size:xx-large">Tick Heatmap</div>
            <cool-light-box :items="items" :index="index" :useZoomBar="true" @close="index = null"/>
            <!-- Map Display here -->
            <div ref="mapView" id="map"></div>
        </div>
        <q-page-container>
            <div align="center" style="font-family:customfont">Zoom in and select a tick to see pictures of it here:</div>
            <!-- <div v-else-if="items !== null"> {{ tickPopupInfo.commonName }}s</div> -->
            <div>
                <q-img v-for="(image, i) in tickPopupInfo.imageUrls"
                class="enlarge-image" :key="`tick-${i}`" 
                :src="image" :alt="tickPopupInfo.commonName" 
                @click="index = i"/>       
            </div>
        </q-page-container>
    </q-page>
</template>
  
  
  <script setup>
import { Dark, Notify } from 'quasar';
import {ref, watch, onMounted, reactive, toRefs} from "vue";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";

import {formatDate, JSONtoGeoJSON} from "src/utils";
import axios from "axios";
import {Geolocation} from "@capacitor/geolocation";
import CoolLightBox from 'vue-cool-lightbox';
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css';
import {ClusterMapLayer, CountryMapBounaries, HeatMapLayer, USCountyMap} from "src/MapLayerStrategy";
import TabularView from "components/TabularView.vue";
import FilterSearchBars from "components/FilterSearchBars.vue";
import StatsView from "components/StatsView.vue";
import ChartViz from "components/ChartViz.vue";
import {lymeCasesOptions, lymeCasesSeries} from "src/lymeDiseasesVars";
import {getChartInputs} from "src/tickReportingTrendsVars";
import {lymeDiseaseByGenderChartInputs} from "src/lymeDiseaseByGenderVars";
import {getLymeDiseaseByCountiesData, requestPermission} from "src/FirebaseInit";
  
    
  const items = ref([]);
  const index = ref(null);
  
  const tableData = ref([]);
  const lymeDiseaseTableData = ref([]);
  const statsSubtitle = ref('Ticks reported');
  const statsLoadingMsg = ref('Collecting ticks...');
  
  const isDarkMode = ref(false);
  
  const mapTile = ref('mapbox://styles/mapbox/streets-v11');
  
  const tickMapKey = ref('');
  
  const searchLoading = ref(false);
  
  const location = ref('');
    
  const isLoadingLocation = ref(false);
  const isLoadingTickData = ref(false);
  
  const showHeatmap = ref(false);
  const showLymeDiseaseMap = ref(false);
  const lymeDiseaseSelectedYear = ref(2019);
  const yearToYearIsPlaying = ref(false);
  
  
  const filterParameterKey = ref('');
  
  const mapView = ref(null);
  
  const tickReportsHistogram = ref(null);
  
  const tickPopupInfo = ref({
    commonName: '',
    scientificName: '',
    observedOn: '',
    dateTime: '',
    imageUrls: [],
  })
  
  
  let map = {};
  
  watch(() => Dark.isActive, async val => {
    isDarkMode.value = val;
    mapTile.value = Dark.isActive ? 'mapbox://styles/mapbox/dark-v10':'mapbox://styles/mapbox/streets-v11';
    //map.setStyle(mapTile.value);
  
   // newMap(showHeatmap.value ? 'heatmap': 'regular')
  
    switchLayer();
    tickReportsHistogram.value = await getChartInputs();
  
  });
  
  
  const sheetId = '1rJaYUmA0Ua26IS6sQsFIQhpTbCdSyxzT9s5W5xXLD7c';
  const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
  const sheetName = 'Sheet2';
  const query = encodeURIComponent('Select *');
  const url = `${base}&sheet=${sheetName}&tq=${query}`
  document.addEventListener('DOMContentLoaded', init);
  
  
  
  const geoJson = ref({});
  
  const tickCount = ref(0);
  
  const htmlPopup = ref(null);
  
  
  
  watch(showHeatmap, (value) => {
    if (value) {
      onMapTypeClick('heatmap');
    } else {
      onMapTypeClick('regular');
    }
  });
  
  watch(showLymeDiseaseMap, async (value) => {
    if (value) {
      await showLymeDiseaseCaseMap();
    } else {
      resetLymeDiseaseCaseMap();
      onMapTypeClick('regular');
    }
  });
  
  watch(lymeDiseaseSelectedYear, (year, oldYear) => {
    if (year === oldYear) {
      return;
    }
    changeLymeDiseaseYearMap(year);
  
  });
  
  
  const center = ref([-111.549668, 39.014]);
  
  watch(geoJson, (value)=> {
    tickMapKey.value = geoJson.value
    tickCount.value = value.features.length;
  })
  function init() {
    return new Promise((resolve, reject) => {
      isLoadingTickData.value = true;
      const cacheName = 'cache-tickData';
      fetch(url, {
        headers: {
          'Cache-Control': 'max-age=3600'
        }
      })
        .then(res => res.clone().text())
        .then(rep => {
          //Remove additional text and extract only JSON:
          const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
  
  
          const table = JSONtoGeoJSON(jsonData);
          //tableData.value = jsonData.table.rows;
          tableData.value = table.features;
          //console.log(table, 'table')
          isLoadingTickData.value = false;
          resolve(table);
        });
    });
  
  }
  
  
  
  
  onMounted(async () => {
    getCurrentPosition().then((coords) => {
      center.value = coords;
    })
    initMap();
    createMap('regular');
    tickReportsHistogram.value = await getChartInputs();
  
  //   const resp = await getLymeDiseaseByCountiesData();
  //   const reader = new FileReader();
  //
  // // This fires after the blob has been read/loaded.
  //   reader.addEventListener('loadend', (e) => {
  //     const text = e.srcElement.result;
  //     console.log(text.split(','));
  //   });
  //
  //   reader.readAsText(resp);
    console.log(await requestPermission());
  
    const channel = new window.BroadcastChannel("sw-messages");
    console.log('channel');
    channel.addEventListener('message', (event) => {
      console.log(event.data.notification, "hello")
      Notify.create({
        message: event.data.notification.title,
        caption: event.data.notification.body,
        color: 'primary'
      })
  
    });
  
  
  
  
  
  });

  function onImageClick(row) {

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
  
  function changeLymeDiseaseYearMap(year) {
    resetLymeDiseaseCaseMap();
    const countyMap = new USCountyMap(year.toString());
    countyMap.addSource(map);
    countyMap.addLayers(map);
    //countyMap.subscribeEvents(map);
    map.setLayoutProperty('counties','visibility', 'visible');
  
    setLymeCases(year);
  }
  
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
      if (showLymeDiseaseMap.value) {
        showLymeDiseaseCaseMap();
        //changeLymeDiseaseYearMap(lymeDiseaseSelectedYear.value);
      }
    });
    map.setStyle(mapTile.value);
  }
  function createMap(mapType) {
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
  
        const countyMap = new USCountyMap(lymeDiseaseSelectedYear.value.toString());
        countyMap.subscribeEvents(map);
  
  
  
  
  
  
  
  
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
    const style = map.getStyle();
  
    if (mapType === 'heatmap') {
      style.sources.ticks.cluster = false;
      if (map.hasImage('tick-icon')) map.removeImage('tick-icon');
      map.setStyle(style)
  
      map.setLayoutProperty('clusters', 'visibility', 'none');
      map.setLayoutProperty('cluster-count','visibility', 'none');
      map.setLayoutProperty('unclustered-point','visibility', 'none');
      //console.log(style.sources.ticks);
  
  
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
  
  function resetLymeDiseaseCaseMap() {
    map.removeLayer('counties');
    map.removeSource('counties');
  
    tickCount.value = geoJson.value.features.length;
    statsSubtitle.value = 'Ticks reported';
    statsLoadingMsg.value = 'Collecting ticks...';
  }
  
  function lymeDiseaseCaseMapPrep() {
    map.setLayoutProperty('clusters', 'visibility', 'none');
    map.setLayoutProperty('cluster-count','visibility', 'none');
    map.setLayoutProperty('unclustered-point','visibility', 'none');
  
    map.setLayoutProperty('heatmap-ticks', 'visibility', 'none');
  
    return () => {
      const countyMap = new USCountyMap(lymeDiseaseSelectedYear.value.toString());
      countyMap.addSource(map);
      countyMap.addLayers(map);
      //countyMap.subscribeEvents(map);
      map.setLayoutProperty('counties','visibility', 'visible');
  
  
  
    }
  
  }
  
  function playLymeDiseaseYearToYear() {
    if (!yearToYearIsPlaying.value) {
      yearToYearIsPlaying.value = true;
    } else {
      yearToYearIsPlaying.value = false;
      return;
    }
  
    const selectYear = (nextYear) => {
      if (nextYear === 2020) {
        yearToYearIsPlaying.value = false;
        return;
      }
      lymeDiseaseSelectedYear.value = nextYear;
  
  
      setTimeout(() => {
        if (!yearToYearIsPlaying.value) {
          return;
        }
        selectYear(nextYear + 1);
      }, 1500);
  
    }
  
    if (lymeDiseaseSelectedYear.value === 2019) {
      lymeDiseaseSelectedYear.value = 2000;
    }
  
    selectYear(lymeDiseaseSelectedYear.value);
  }
  
  
  function setLymeCases(year){
    const caseCount = lymeDiseaseTableData.value.filter((item) => item.YEAR === year).reduce((acc, item) => acc + item.CASES, 0);
    statsSubtitle.value = 'Cases reported';
    tickCount.value = caseCount;
  } 
  
  async function showLymeDiseaseCaseMap(year = 2019) {
    lymeDiseaseSelectedYear.value = 2019;
    let registerLymeMap = lymeDiseaseCaseMapPrep();
    registerLymeMap();
    const resp = await getLymeDiseaseByCountiesData();
    lymeDiseaseTableData.value = JSON.parse(await resp.text());
    setLymeCases(year);
  }
  
  function renderListings(e) {
    //console.log(e.features[0].properties)
  
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
  
  function onLocateClick(lngLat) {
    mapView.value.scrollIntoView({ behavior: 'smooth' });
    flyTo(lngLat, 11);
    let popup = new mapboxgl.Popup()
      .setLngLat(lngLat)
      .setHTML('<p class="text-caption">I\'m here!</p>')
      .addTo(map);
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
    height: 75vh
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
  
  
  .body--dark #popup
    background: #1D1D1D
    border-color: red
  
  .q-toggle
    &.disabled
      background: white !important
  
  .map-overlay
    position: absolute
    bottom: 0
    right: 0
    background: rgba(255,255,255,0.8)
    margin-right: 12px
    font-family: Arial, sans-serif
    overflow: auto
    border-radius: 3px
  .body--dark .map-overlay
    background: #1D1D1D
  #legend
    padding: 10px
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1)
    line-height: 18px
    height: 150px
    bottom: 90px
  
  
  
  .legend-key
    display: inline-block
    border-radius: 20%
    width: 10px
    height: 10px
    margin-right: 5px
  
  .wrapper
    position: relative
  
  </style>
<style lang="sass">
.body--dark
.mapboxgl-popup-content
    background: #1D1D1D
.mapboxgl-popup-close-button
    color: #FFFFFF
<style>