import mapboxgl from "mapbox-gl";
import {Layer} from "./Layer"
import * as cluster from "cluster";
import { debounce } from 'quasar'


export class HeatMapLayer implements Layer {

  addSource(map: mapboxgl.Map, geoJSON: any) {
    map.addSource('ticks', {
      type: 'geojson', // Use a URL for the value for the `data` property.
      data: geoJSON,
    });
  }

  removeSource(map: mapboxgl.Map) {
    map.removeSource('ticks');
  }

  addLayers(map: mapboxgl.Map) {
    map.addLayer({
      'id': 'heatmap-ticks',
      'type': 'heatmap',
      'source': 'ticks',
      'layout': {
        'visibility': 'none',
      },
      'paint': {
// increase weight as diameter breast height increases
        'heatmap-weight': {

          'type': 'exponential',
          'stops': [
            [1, 0],
            [62, 1]
          ]
        },
        'heatmap-intensity': {
          'stops': [
            [11, 1],
            [15, 3]
          ]
        },
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.2,
          'rgb(103,169,207)',
          0.4,
          'rgb(209,229,240)',
          0.6,
          'rgb(253,219,199)',
          0.8,
          'rgb(239,138,98)',
          1,
          'rgb(178,24,43)'
        ],
// increase radius as zoom increases
        'heatmap-radius': {
          'stops': [
            [11, 15],
            [15, 20]
          ]
        },
// decrease opacity to transition into the circle layer
        'heatmap-opacity': {
          'default': 1,
          'stops': [
            [14, 1],
            [15, 0]
          ]
        }
      }
    });

  }
  removeLayers(map: mapboxgl.Map) {
    map.removeLayer('heatmap-ticks')
  }


}

export class CountryMapBounaries implements Layer {
  addSource(map: mapboxgl.Map, geoJSON: any) {
    map.addSource('ticks',{
      type: 'geojson',
        data: geoJSON,

    });
  }

  removeSource(map: mapboxgl.Map) {
    map.removeSource('ticks');
  }

  addLayers(map: mapboxgl.Map) {
    map.addLayer(
      {
        id: 'country-boundaries',
        source: {
          type: 'vector',
          url: 'mapbox://mapbox.country-boundaries-v1',
        },
        'source-layer': 'country_boundaries',
        type: 'fill',
        paint: {
          'fill-color': '#d2361e',
          'fill-opacity': 0.4,
        },
      },
      'country-label'
    );

  }
  removeLayers(map: mapboxgl.Map) {
    map.removeLayer('country-boundaries');
  }
}

export class ClusterMapLayer implements Layer {

  addSource(map: mapboxgl.Map, geoJSON: any) {
    map.addSource('ticks', {
      type: 'geojson', // Use a URL for the value for the `data` property.
      data: geoJSON,
      cluster: true,
      clusterMaxZoom: 5, // Max zoom to cluster points on
      clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });
  }

  removeSource(map: mapboxgl.Map) {
    map.removeSource('ticks');
  }


  addLayers(map: mapboxgl.Map) {
    map.addLayer({
      'id': 'clusters',
      type: 'circle',
      source: 'ticks',
      filter: ['has', 'point_count'],
      layout: {
        'visibility': 'visible',
      },
      paint: {
// Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
// with three steps to implement three types of circles:
//   * Blue, 20px circles when point count is less than 100
//   * Yellow, 30px circles when point count is between 100 and 750
//   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1'
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40
        ]
      }
    });
    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'ticks',
      filter: ['has', 'point_count'],
      layout: {
        'visibility': 'visible',
        'text-field': ['get', 'point_count_abbreviated'],
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12
      }
    });

    map.addLayer({
      'id': 'unclustered-point',
      'type': 'symbol',
      'source': 'ticks',
      'filter': ['!', ['has', 'point_count']],
      'layout': {
        'visibility': 'visible',
        'icon-image': 'tick-icon', // reference the image
        'icon-size': 0.05
      }
    });

  }

  removeLayers(map: mapboxgl.Map) {
    map.removeLayer('clusters');
    map.removeLayer('cluster-count');
    map.removeLayer('unclustered-point');
  }

  subscribeEvents(map: mapboxgl.Map) {
    // inspect a cluster on click
    map.on('click', 'clusters', (e) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ['clusters']
      });
      const clusterId = features[0].properties?.cluster_id;
      const source: mapboxgl.GeoJSONSource = map.getSource('ticks') as mapboxgl.GeoJSONSource
      source.getClusterExpansionZoom(
        clusterId,
        (err, zoom) => {
          if (err) return;

          if (features[0].geometry.type === "Point") {
            map.easeTo({
              center: [features[0].geometry.coordinates[0],features[0].geometry.coordinates[1]],
              zoom: zoom
            });
          }
        }
      );

    });


    map.on('mouseenter', 'clusters', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', () => {
      map.getCanvas().style.cursor = '';
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', 'unclustered-point', () => {
      map.getCanvas().style.cursor = 'pointer';
    });

// Change it back to a pointer when it leaves.
    map.on('mouseleave', 'unclustered-point', () => {
      map.getCanvas().style.cursor = '';
    });
  }




}

export class USCountyMap implements Layer {
  addSource(map: mapboxgl.Map, geoJSON: any) {
    // Add a vector source for admin-1 boundaries
    map.addSource('counties', {
      "type": "vector",
      "url": "mapbox://rsultan.9d4qlmns",
    });

  }

  removeSource(map: mapboxgl.Map) {
  }

  addLayers(map: mapboxgl.Map) {
    map.addLayer({
      "id": "counties",
      "type": "fill",
      "source": "counties",
      "source-layer": "county-1x6gy7",
      "paint": {
        "fill-outline-color": "hsl(123, 2%, 45%)",
        "fill-color": "rgba(0,0,0,0.1)"
      },
      'layout': {
        'visibility': 'none',
      }
    });



  }



  removeLayers(map: mapboxgl.Map) {
    map.removeLayer('counties');
  }

  subscribeEvents(map: mapboxgl.Map) {

    let popup = new mapboxgl.Popup();

    map.on('mousemove',function(e) {
      // Clean up any other popups
      popup.remove();

      let features = map.queryRenderedFeatures(e.point, {
        layers: ['counties']
      });

      if (features.length) {
        // Single out the first found feature on mouseove.
        let feature = features[0];

        let setTimeoutConst = debounce(function() {
          console.log("FEATURES:", e);
          popup.setLngLat(e.lngLat)
            .setText(feature.properties?.NAMELSAD)
            .addTo(map);
        }, 200);
        setTimeoutConst();
      }

      // Change the cursor style as a UI indicator.
      map.getCanvas().style.cursor = features.length ? 'pointer' : '';

    }); // 'mousemove'

  }

  unsubscribeEvents(map: mapboxgl.Map) {
    map.off('mousemove', this.subscribeEvents)
  }
}


