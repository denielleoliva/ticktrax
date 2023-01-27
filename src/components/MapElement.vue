<template>
  <div class="map-container">
    <div id="map"></div>
  </div>
</template>

<script setup>
// import { ref, onMounted } from 'vue'
// import mapboxgl from "mapbox-gl";
//
// onMounted(() => {
//   initMap() // <div>
// })
// function initMap() {
//   let map = null;
//   mapboxgl.accessToken = "pk.eyJ1IjoicnN1bHRhbiIsImEiOiJjbGRjcTF1bDMwNHNiM25wNm1oZ2dzbWg2In0.yMbTf053wvYrnzJwUyqqYQ";
//   map = new mapboxgl.Map({
//     container: "map",
//     style: "mapbox://styles/mapbox/streets-v11",
//     center: [-90.96, -0.47],
//     zoom: 15,
//     // zoom: -5,
//   });
//   map.on('load', () => {
// // Add a GeoJSON source with 3 points.
//     map.addSource('points', {
//       'type': 'geojson',
//       'data': {
//         'type': 'FeatureCollection',
//         'features': [
//           {
//             'type': 'Feature',
//             'properties': {},
//             'geometry': {
//               'type': 'Point',
//               'coordinates': [-91.3952, -0.9145]
//             }
//           },
//           {
//             'type': 'Feature',
//             'properties': {},
//             'geometry': {
//               'type': 'Point',
//               'coordinates': [-90.3295, -0.6344]
//             }
//           },
//           {
//             'type': 'Feature',
//             'properties': {},
//             'geometry': {
//               'type': 'Point',
//               'coordinates': [-91.3403, 0.0164]
//             }
//           }
//         ]
//       }
//     });
// // Add a circle layer
//     map.addLayer({
//       'id': 'circle',
//       'type': 'circle',
//       'source': 'points',
//       'paint': {
//         'circle-color': '#4264fb',
//         'circle-radius': 8,
//         'circle-stroke-width': 2,
//         'circle-stroke-color': '#ffffff'
//       }
//     });
//
// // Center the map on the coordinates of any clicked circle from the 'circle' layer.
//     map.on('click', 'circle', (e) => {
//       map.flyTo({
//         center: e.features[0].geometry.coordinates
//       });
//     });
//
// // Change the cursor to a pointer when the it enters a feature in the 'circle' layer.
//     map.on('mouseenter', 'circle', () => {
//       map.getCanvas().style.cursor = 'pointer';
//     });
//
// // Change it back to a pointer when it leaves.
//     map.on('mouseleave', 'circle', () => {
//       map.getCanvas().style.cursor = '';
//     });
//   });
// }

</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 95vh;
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
