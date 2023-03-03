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
      let coords = DMStoDD(photoMetadata);
      let dateTime = photoMetadata['DateTime'];




      if (file.name.toLowerCase().endsWith(".heic")) {
        HEICToPNG(event).then(src => resolve({coords: coords, dateTime: dateTime, pngImage: src, sourceFile: e[0]}));

      } else {
        let imageSrc = base64ArrayBuffer(event.target.result);
        resolve({coords: coords, dateTime: dateTime, pngImage: "data:image/png;base64," + imageSrc, sourceFile: event.target.result})
      }
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
    if (i === 3200) {
      //break;
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
        photoUrls = row.c[6].v;
      } catch (err) {}


    let attribution = '';
    try {
      attribution = row.c[7].v;
    } catch (err) {}

    let feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [longitude, latitude]
      },
    }



    let properties = {
      "commonName": commonName,
      "scientificName": scientificName,
      "location": location,
      "observedOn": dateObserved,
      "imageUrls": photoUrls,
      "attribution": attribution
    }

    geoJson.features.push(
      {
        ...feature,
        properties
      }
    );

  }

  console.log(geoJson);

  return geoJson;

}

export function formatDate(date) {

  const inputDate = new Date(date);
  console.log('hello?', typeof inputDate)
  if (!(inputDate instanceof Date) || isNaN(inputDate.valueOf())) {
    return '';
  }

// define options for formatting the date and time
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    timeZoneName: 'short'
  };

// create a formatter with the desired options
  const formatter = new Intl.DateTimeFormat('en-US', options);

  let formattedDate = formatter.format(inputDate);

  const lastCommaIndex = formattedDate.lastIndexOf(',');

  if (lastCommaIndex !== -1) {
    // replace the last comma with a · character
    formattedDate = formattedDate.substring(0, lastCommaIndex) + ' ·' + formattedDate.substring(lastCommaIndex + 1);
  }

// format the input date using the formatter
  return formattedDate; // output: Feb 7, 2023 · 9:33:49 PM EAT

}

function base64ArrayBuffer(arrayBuffer) {
  let base64 = '';
  const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  const bytes = new Uint8Array(arrayBuffer);
  const byteLength = bytes.byteLength;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;

  let a, b, c, d;
  let chunk;

  // Main loop deals with bytes in chunks of 3
  for (let i = 0; i < mainLength; i = i + 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

    // Use bitmasks to extract 6-bit segments from the triplet
    a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
    b = (chunk & 258048)   >> 12 // 258048   = (2^6 - 1) << 12
    c = (chunk & 4032)     >>  6 // 4032     = (2^6 - 1) << 6
    d = chunk & 63               // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder === 1) {
    chunk = bytes[mainLength]

    a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    b = (chunk & 3)   << 4 // 3   = 2^2 - 1

    base64 += encodings[a] + encodings[b] + '=='
  } else if (byteRemainder === 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

    a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
    b = (chunk & 1008)  >>  4 // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    c = (chunk & 15)    <<  2 // 15    = 2^4 - 1

    base64 += encodings[a] + encodings[b] + encodings[c] + '='
  }

  return base64
}
