import {findEXIFinHEIC, findEXIFinJPEG} from "src/exif-heic";
import worker from 'workerize-loader!./worker';

export function extractMetaData(e) {
  let reader = new FileReader();

  const file = e;
  reader.readAsArrayBuffer(file);

  return new Promise((resolve,reject) => {
    reader.onload = (event) => {
      console.log(event.target.result);
      let photoMetadata = null;
      if (file.name.toLowerCase().endsWith(".heic")) {
        photoMetadata = findEXIFinHEIC(event.target.result);
      } else {
        photoMetadata = findEXIFinJPEG(event.target.result);
      }

      console.log(photoMetadata);
      const coords = DMStoDD(photoMetadata);
      const dateTime = photoMetadata['DateTime'];

      HEICToPNG(event).then(src => resolve({coords: coords, dateTime: dateTime, pngImage: src, sourceFile: e[0]}));

      //resolve({coords: coords, dateTime: dateTime, imageFile: e[0]});
    }
    reader.onerror = e => {
      console.log(e.target.error)
      reject(e.target.error);
    }

  });

}

export function DMStoDD(metaData) {
  let decimalDegrees = {lat: 0, long: 0};
  if (metaData.GPSLatitude && metaData.GPSLatitude.length > 0) {
    decimalDegrees.lat = metaData.GPSLatitude[0].value + metaData.GPSLatitude[1].value / 60 + metaData.GPSLatitude[2].value / 3600;
    if (metaData.GPSLatitudeRef === 'S') {
      decimalDegrees.lat *= -1
    }
  }

  if (metaData.GPSLongitude && metaData.GPSLongitude.length > 0) {
    decimalDegrees.long = metaData.GPSLongitude[0].value + metaData.GPSLongitude[1].value / 60 + metaData.GPSLongitude[2].value / 3600;
    if (metaData.GPSLongitudeRef === 'W') {
      decimalDegrees.long *= -1
    }
  }

  return decimalDegrees;

}

function HEICToPNG(event) {
  let instance = worker();
  return new Promise((resolve, reject) => {
    instance.convertHeicToPNG(Buffer.from(event.target.result)).then((src) => {
      resolve(src);
    }).catch((error) => {
      reject(error);
    });
  });

}

export function dateAdapter(dateString) {
  const re = /(?<year>\d{4}):(?<month>\d{2}):(?<day>\d{2})\s(?<hour>\d{2}):(?<minute>\d{2}):(?<seconds>\d{2})/;
  const {year, month, day, hour, minute} = dateString.match(re).groups;

  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
}

export function JSONtoGeoJSON(jsonData) {

  let geoJson = {
    id: "ticks",
    type: "FeatureCollection",
    features: []
  }
  let i = 0;
  for (let row of jsonData.table.rows) {
    i ++;
    if (i === 32) {
      break;
    }
    let latitude = '';
    try {
      latitude = row.c[3].v;
    } catch(err) {
      continue;
    }
      const longitude = row.c[4].v;

      const scientificName = row.c[1].v;

      let dateObserved = '';
      let commonName = '';

      try {
        commonName = row.c[2].v;
        dateObserved = row.c[0].v;
      } catch (err) {}

      let location = '';
      try {
        location = row.c[5].v;
      } catch(err) {}

      let photoUrls = '';
      try {
        photoUrls = row.c[6].v
      } catch (err) {}

    let feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
    }

    let properties = {
      "Common name": commonName,
      "Scientific name": scientificName,
      "location": location,
      "Observed on": dateObserved,

    }

    geoJson.features.push(
      {
        ...feature,
        properties
      }
    );

  }

  return geoJson;

}
