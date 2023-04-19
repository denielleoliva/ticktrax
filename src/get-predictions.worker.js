import * as tf from '@tensorflow/tfjs';

let net1, net2;
tf.loadGraphModel(`/models/TenClassTickClassifier_web_model/model.json`, {
  onProgress: (fractions) => {
    //console.log(fractions);
  },
}).then(async (mod) => {
  // warming up the model before using real data
  //setModel(mod);
  net1 = mod;

});
tf.loadGraphModel(`/models/yolov8x-cls_web_model/model.json`, {
  onProgress: (fractions) => {
    //console.log(fractions);
  },
}).then(async (mod) => {
  // warming up the model before using real data
  //setModel(mod);
  net2 = mod;

});

function cropImage(img) {
  const width = img.shape[0];
  const height = img.shape[1];

  //console.log(width, height);

  // use the shorter side as the size to which we will crop
  const shorterSide = Math.min(img.shape[0], img.shape[1]);

  // calculate beginning and ending crop points
  const startingHeight = Math.floor((height - shorterSide) / 2);
  const startingWidth = Math.floor((width - shorterSide) / 2);
  const endingHeight = startingHeight + shorterSide;
  const endingWidth = startingWidth + shorterSide;

  //console.log(startingHeight, startingWidth);

  // return image data cropped to those points
  return img.slice(
    [startingWidth, startingHeight, 0],
    [endingWidth, endingHeight, 3]
  );
}

function resizeImage(image) {
  return tf.image.resizeBilinear(image, [224, 224]);
}

function batchImage(image) {
  // Expand our tensor to have an additional dimension, whose size is 1
  const batchedImage = image.expandDims(0);

  // Turn pixel data into a float between -1 and 1.
  return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}

function loadAndProcessImage(image) {
  const croppedImage = cropImage(image);
  const resizedImage = resizeImage(croppedImage);
  return batchImage(resizedImage);
}


export async function doPredictImage(image) {
  if (!net1 && !net2) return;

  tf.engine().startScope();

  const runModel = (myModel) => {
    // get width and height from model's shape for resizing image
    const [modelWidth, modelHeight] = myModel.inputs[0].shape.slice(1, 3);
    //console.log(imageRef.value, "")
    // pre-processing image
    const input = tf.tidy(() => {
      const imageTensor = tf.browser.fromPixels(image);
      return tf.image
        .resizeBilinear(imageTensor, [modelWidth, modelHeight])
        .div(255.0)
        .expandDims(0);
    });

    // predicting...
    const res = myModel.execute(input);

    //console.log(res.arraySync()[0], "ArraySync");
    // const processedImage = loadAndProcessImage(
    //   tf.browser.fromPixels(event.data).toFloat()
    // );
    const tensor = myModel.predict(input);

    tensor.dataSync()

    //console.log(tensor.dataSync());
    const labelPrediction = tensor.as1D().argMax().dataSync()[0];
    const values = tensor.dataSync();
    const percentageResult = values[labelPrediction] * 100;

    // clear memory
    tf.dispose(res);


    return {
      labelPrediction,
      percentageResult,
    }

  }

  // // get width and height from model's shape for resizing image
  // const [modelWidth, modelHeight] = model.value.inputs[0].shape.slice(1, 3);
  // console.log(imageRef.value, "HELLO")
  // // pre-processing image
  // const input = tf.tidy(() => {
  //   const imageTensor = tf.browser.fromPixels(imageRef.value);
  //   return tf.image
  //     .resizeBilinear(imageTensor, [modelWidth, modelHeight])
  //     .div(255.0)
  //     .expandDims(0);
  // });

  // predicting...
  // const res = model.value.execute(input);
  // const res2 =  binaryModel.value.execute(input);

  let res = runModel(net2);
  //console.log(res);
  if (res.labelPrediction !== 78) {
    return {isTick: false};
  }

  res = runModel(net1);



  // console.log(res.dataSync());
  // let arrRes = res.arraySync()[0];
  // var detections = non_max_suppression(arrRes);
  // const boxes =  shortenedCol(detections, [0,1,2,3]);
  // const scores = shortenedCol(detections, [4]);
  // const class_detect = shortenedCol(detections, [5]);
  //
  // renderBoxes(canvasRef.value, 0.80, boxes, scores, class_detect);

  // console.log(res.arraySync()[0], "ArraySync", res2);
  // const processedImage = loadAndProcessImage(
  //   tf.browser.fromPixels(imageRef.value).toFloat()
  // );
  // const tensor = model.value.predict(input);



  // const res = runModel(model.value);
  //
  // console.log(res.arraySync()[0], "ArraySync");
  // const processedImage = loadAndProcessImage(
  //   tf.browser.fromPixels(imageRef.value).toFloat()
  // );
  // const tensor = model.value.predict(input);


  let species = [
    "Amblyomma americanum",
    "Amblyomma maculatum",
    "Dermacentor marginatus",
    "Dermacentor occidentalis",
    "Dermacentor reticulatus",
    "Dermacentor variabilis",
    "Ixodes pacificus",
    "Ixodes ricinus",
    "Ixodes scapularis",
    "Rhipicephalus sanguineus"
  ];

  // let genera = [
  //   "Amblyomma",
  //   "Dermacentor",
  //   "Ixodes",
  //   "Rhipicephalus"
  // ];

  const commonTickNames = {
    "Amblyomma americanum": "Lone Star Tick",
    "Amblyomma maculatum": "Gulf Coast Tick",
    "Dermacentor marginatus": "Ornate Sheep Tick",
    "Dermacentor occidentalis": "Pacific Coast Tick",
    "Dermacentor reticulatus": "Ornate Cow Tick",
    "Dermacentor variabilis": "American Dog Tick",
    "Ixodes pacificus": "Western Black-legged Tick",
    "Ixodes ricinus": "Castor Bean Tick",
    "Ixodes scapularis": "Eastern Black-legged Tick",
    "Rhipicephalus sanguineus": "Brown Dog Tick"
  }


  const predictedLabel = {
    commonName: commonTickNames[species[res.labelPrediction]],
    scientificName: species[res.labelPrediction]
  };
  const predictionPercentage = res.percentageResult;


  tf.engine().endScope();
  return {
    isTick: true,
    predictedLabel: predictedLabel,
    predictionPercentage: predictionPercentage
  };

}
