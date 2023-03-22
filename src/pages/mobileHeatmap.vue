<template>
    <div ref="mapView" id="map"></div>

</template>

<script setup>
import { ref, onMounted } from "vue";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {HeatMapLayer} from "src/MapLayerStrategy";
import {JSONtoGeoJSON} from "src/utils";

const mapTile = ref('mapbox://styles/mapbox/streets-v11');
const center = ref([-111.549668, 39.014]);
const isLoadingTickData = ref(false);
const geoJson = ref({});

const sheetId = '1rJaYUmA0Ua26IS6sQsFIQhpTbCdSyxzT9s5W5xXLD7c';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'Sheet2';
const query = encodeURIComponent('Select *');
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = [];



let map = {};

onMounted(() => initMap());

function initMap() {
  try {
    mapboxgl.accessToken = "pk.eyJ1IjoicnN1bHRhbiIsImEiOiJjbGRjcTF1bDMwNHNiM25wNm1oZ2dzbWg2In0.yMbTf053wvYrnzJwUyqqYQ";

    map = new mapboxgl.Map({
      container: 'map', // container ID
// Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: mapTile.value, // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });


    map.on('load', async () => {

      const geoJ = await init();
      geoJson.value = geoJ;
      const heatmap = new HeatMapLayer();
      heatmap.addSource(map, geoJ);
      heatmap.addLayers(map);
      map.setLayoutProperty('heatmap-ticks', 'visibility', 'visible');

    });


  } catch (e) {
    console.log("error init map", e);
  }

}

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
        //console.log(table, 'table')
        isLoadingTickData.value = false;
        resolve(table);
      });
  });

}

</script>

<style lang="sass" scoped>


#map
  position: absolute
  top: 0
  bottom: 0
  width: 100%

</style>
