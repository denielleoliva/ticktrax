import mapboxgl from "mapbox-gl";

export interface Layer {
  addSource(map: mapboxgl.Map, geoJSON: any): void;

  removeSource(map: mapboxgl.Map): void;
  addLayers(map: mapboxgl.Map): void;
  removeLayers(map: mapboxgl.Map): void;

  subscribeEvents?(map: mapboxgl.Map): void;
  unsubscribeEvents?(map: mapboxgl.Map): void;



}
