<template>
    <q-page-container class="GPL__page-container">
      <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
        <q-card class="text-white" style="width: 300px; background-color: #5CAB7D">
          <q-card-section>
            <div class="text-h6">Tick not detected</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            We can't detect the tick in your uploaded photo. Please refer to our photo tips for better results.          </q-card-section>

          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="showUnsupportedBrowserPopup" persistent transition-show="scale" transition-hide="scale">
        <q-card class="text-white" style="width: 300px; background-color: #5CAB7D">
          <q-card-section>
            <div class="text-h6">Not supported Browser</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            Your browser is currently not supported
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="OK" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <div class="q-px-md q-pb-md row items-start q-gutter-md justify-center">
        <q-card class="my-card fit q-px-xl q-pt-none" flat >
          <q-card-section class="q-pb-lg">
            <div class="text-h4 text-weight-medium q-mb-xs text-center">Tick<span class="text-primary">Sa<span class="v">vv</span>y</span> <span class="text-caption">beta</span></div>
            <div class="text-weight-medium q-mb-xs text-center">Tick Identification Service Powered by AI</div>

          </q-card-section>
          <q-separator />
          <q-card-section class="q-pt-xl">
            <upload-card :hidePageTitle="true" @handleUploadData="handleUploadData" />
          </q-card-section>
          <q-separator/>
          <q-card-section v-show="showResults">
            <p class="text-h5 text-center">Results</p>
            <div class="row q-gutter-xl">
          <img src="" alt="Uploaded tick image" ref="imageRef" class="col"  style="width:100%; height:auto">
<!--            <p class="col q-pl-lg text-h5 text-bold">{{ predictedLabel }}</p>-->
<!--            <p class="col">{{ predictionPercentage }}</p>-->
            <div class="q-pa-md col" >
              <q-list>

                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pl-lg text-h5 text-bold">{{ predictedLabel.commonName }}</q-item-label>
                    <q-item-label caption class="q-ml-lg">({{predictedLabel.scientificName }})</q-item-label>
                  </q-item-section>

                  <q-item-section side top>
                    <q-item-label caption>Confidence: <q-badge :color="getConfidenceColor" :label="predictionPercentage.toFixed(1) + '%'" /></q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator spaced inset />
                <q-item-section class="q-pl-md">
                 <p class="text-subtitle1"> {{tickContent}}</p>
                </q-item-section>
              </q-list>
            </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </q-page-container>
</template>

<script>
import {computed, onMounted, ref} from 'vue';
import {
  Loading,
  Platform
} from 'quasar'
import UploadCard from "components/uploadCard.vue";
import wwDetector from 'workerize-loader!../get-predictions.worker';
import wiki from 'wikijs';
// const wiki = require('wikijs').default;

import {classLabels, wikiPageIds} from "src/vars";

export default {
  name: 'GooglePhotosLayout',
  components: {UploadCard},
  setup () {
    const leftDrawerOpen = ref(false);
    // const model = ref(null);
    // const binaryModel = ref(null);
    const imageRef = ref(null);
    const canvasRef = ref(null);
    const imageSrc = ref(null);
    const files = ref(null);
    const showResults = ref(false);
    const persistent = ref(false);
    const predictedLabel = ref({});
    const predictionPercentage = ref(0);
    const tickContent = ref("");
    const detector = ref(null);
    const isUnsupportedBrowser = ref(false);
    const showUnsupportedBrowserPopup = ref(false);


    const handleUploadData = async (file) => {
      showResults.value = false;
      if (isUnsupportedBrowser.value) {
        showUnsupportedBrowserPopup.value = true;
        return;
      }
      //console.log(imageRef.value);
      const base64String = file.pngImage; // a base64 encoded image string
      const img = new Image();
      img.src = base64String;
      img.onload = async () => {
        Loading.show({
          message: 'Processing image. Hang tight...'
        })
        //const tensor = tf.browser.fromPixels(img);
        imageRef.value.src = base64String;

        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');

        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0 );
        let imgData = context.getImageData(0, 0, img.width, img.height);


        const mlOutput = await detector.value.doPredictImage(imgData);
        if (mlOutput.isTick) {
          predictedLabel.value = mlOutput.predictedLabel;
          predictionPercentage.value = mlOutput.predictionPercentage;
            const pageId = wikiPageIds[mlOutput.predictedLabel.scientificName];

            // const wikiPage = await wiki().page(pageId);
            // const pageUrl = wikiPage.url();
            // const pageSummary = await wikiPage.summary();

            wiki().page(pageId).then(page => page.summary()).then(summary => {
              tickContent.value = summary;
            });
          showResults.value = true;
          setTimeout(() => {
            imageRef.value.scrollIntoView({ behavior: 'smooth' });
          }, 500)
        } else {
          persistent.value = true;
        }//imageSrc.value = base64String;
        // use the tensor for machine learning tasks


        Loading.hide();

      }

    };
    // watch(imageSrc, (value, oldValue) => {
    //   if (value && value !== oldValue) {
    //     console.log("called!");
    //     doPredictImage();
    //   }
    // });

    onMounted(() => {
      if (typeof Worker !== `undefined`) {
        detector.value = wwDetector();
      }
      if (Platform.is.safari) {
        isUnsupportedBrowser.value = true;
        showUnsupportedBrowserPopup.value = true;

      }
      // tf.loadGraphModel(`/models/TenClassTickClassifier_web_model/model.json`, {
      //   onProgress: (fractions) => {
      //     //console.log(fractions);
      //   },
      // }).then(async (mod) => {
      //   // warming up the model before using real data
      //   //setModel(mod);
      //   model.value = mod;
      //
      // });
      // tf.loadGraphModel(`/models/yolov8x-cls_web_model/model.json`, {
      //   onProgress: (fractions) => {
      //     //console.log(fractions);
      //   },
      // }).then(async (mod) => {
      //   // warming up the model before using real data
      //   //setModel(mod);
      //   binaryModel.value = mod;
      //
      // });
    });

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }
    // function cropImage(img) {
    //   const width = img.shape[0];
    //   const height = img.shape[1];
    //
    //   //console.log(width, height);
    //
    //   // use the shorter side as the size to which we will crop
    //   const shorterSide = Math.min(img.shape[0], img.shape[1]);
    //
    //   // calculate beginning and ending crop points
    //   const startingHeight = Math.floor((height - shorterSide) / 2);
    //   const startingWidth = Math.floor((width - shorterSide) / 2);
    //   const endingHeight = startingHeight + shorterSide;
    //   const endingWidth = startingWidth + shorterSide;
    //
    //   //console.log(startingHeight, startingWidth);
    //
    //   // return image data cropped to those points
    //   return img.slice(
    //     [startingWidth, startingHeight, 0],
    //     [endingWidth, endingHeight, 3]
    //   );
    // }
    //
    // function resizeImage(image) {
    //   return tf.image.resizeBilinear(image, [224, 224]);
    // }
    //
    // function batchImage(image) {
    //   // Expand our tensor to have an additional dimension, whose size is 1
    //   const batchedImage = image.expandDims(0);
    //
    //   // Turn pixel data into a float between -1 and 1.
    //   return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    // }
    //
    // function loadAndProcessImage(image) {
    //   const croppedImage = cropImage(image);
    //   const resizedImage = resizeImage(croppedImage);
    //   return batchImage(resizedImage);
    // }
    //
    // function notATickRandomResponse(predictedLabel) {
    //   const notTickArray = [  "It appears that there is no tick present in this image. It looks like a " + predictedLabel + ".",
    //     "I'm sorry, but I cannot detect a tick in this image. It seems to be a " + predictedLabel + ".",
    //     "After analyzing the image, I was unable to locate a tick. It appears to be a " + predictedLabel + ".",
    //     "There doesn't seem to be a tick in this image. My analysis indicates that it is a " + predictedLabel + ".",
    //     "From my analysis, it seems there is no tick in this image. It looks like a " + predictedLabel + ".",
    //     "It appears that the image does not contain a tick. My analysis suggests that it is a " + predictedLabel + ".",
    //     "I'm afraid I can't detect a tick in this image. It appears to be a " + predictedLabel+ ".",
    //     "It looks like there is no tick present in this image. My analysis suggests that it is a " + predictedLabel + ".",
    //     "There is no sign of a tick in this image. It appears to be a " + predictedLabel + ".",
    //     "My analysis suggests that there is no tick present in this image. It appears to be a " + predictedLabel + "."
    //   ];
    //
    //   return notTickArray[Math.floor(Math.random() * notTickArray.length)];
    //
    // }
    //
    // // handler while uploading single image
    // const imageHandler = (e) => {
    //   const file = e.target.files[0];
    //
    //   if (file === null || file === undefined) {
    //     return;
    //   }
    //
    //   const src = window.URL.createObjectURL(file);
    //   imageRef.current.src = src;
    //   setSingleImage.toggle();
    //
    //   imageRef.current.onload = () => {
    //     doPredictImage();
    //     window.URL.revokeObjectURL(src);
    //   };
    // };

    const getConfidenceColor = computed(() => {
      if (predictionPercentage.value < 0.25 * 100) {
        return "red";
      } else if (predictionPercentage.value < 0.5 * 100) {
        return "orange";
      } else if (predictionPercentage.value < 0.75 * 100) {
        return "warning";
      } else {
        return "green";
      }
    });

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

    // const doPredictImage = async () => {
    //   if (!model.value) return;
    //
    //   tf.engine().startScope();
    //
    //   const runModel = (myModel) => {
    //     // get width and height from model's shape for resizing image
    //     const [modelWidth, modelHeight] = myModel.inputs[0].shape.slice(1, 3);
    //     //console.log(imageRef.value, "")
    //     // pre-processing image
    //     const input = tf.tidy(() => {
    //       const imageTensor = tf.browser.fromPixels(imageRef.value);
    //       return tf.image
    //         .resizeBilinear(imageTensor, [modelWidth, modelHeight])
    //         .div(255.0)
    //         .expandDims(0);
    //     });
    //
    //     // predicting...
    //     const res = myModel.execute(input);
    //
    //     //console.log(res.arraySync()[0], "ArraySync");
    //     const processedImage = loadAndProcessImage(
    //       tf.browser.fromPixels(imageRef.value).toFloat()
    //     );
    //     const tensor = myModel.predict(input);
    //
    //     tensor.dataSync()
    //
    //     //console.log(tensor.dataSync());
    //     const labelPrediction = tensor.as1D().argMax().dataSync()[0];
    //     const values = tensor.dataSync();
    //     const percentageResult = values[labelPrediction] * 100;
    //
    //     // clear memory
    //     tf.dispose(res);
    //
    //
    //     return {
    //       labelPrediction,
    //       percentageResult,
    //     }
    //
    //   }
    //
    //   // // get width and height from model's shape for resizing image
    //   // const [modelWidth, modelHeight] = model.value.inputs[0].shape.slice(1, 3);
    //   // console.log(imageRef.value, "HELLO")
    //   // // pre-processing image
    //   // const input = tf.tidy(() => {
    //   //   const imageTensor = tf.browser.fromPixels(imageRef.value);
    //   //   return tf.image
    //   //     .resizeBilinear(imageTensor, [modelWidth, modelHeight])
    //   //     .div(255.0)
    //   //     .expandDims(0);
    //   // });
    //
    //   // predicting...
    //   // const res = model.value.execute(input);
    //   // const res2 =  binaryModel.value.execute(input);
    //
    //   let res = runModel(binaryModel.value);
    //   //console.log(res);
    //   if (res.labelPrediction !== 78) {
    //     return false;
    //   }
    //
    //   res = runModel(model.value);
    //
    //
    //
    //   // console.log(res.dataSync());
    //   // let arrRes = res.arraySync()[0];
    //   // var detections = non_max_suppression(arrRes);
    //   // const boxes =  shortenedCol(detections, [0,1,2,3]);
    //   // const scores = shortenedCol(detections, [4]);
    //   // const class_detect = shortenedCol(detections, [5]);
    //   //
    //   // renderBoxes(canvasRef.value, 0.80, boxes, scores, class_detect);
    //
    //   // console.log(res.arraySync()[0], "ArraySync", res2);
    //   // const processedImage = loadAndProcessImage(
    //   //   tf.browser.fromPixels(imageRef.value).toFloat()
    //   // );
    //   // const tensor = model.value.predict(input);
    //
    //
    //
    //   // const res = runModel(model.value);
    //   //
    //   // console.log(res.arraySync()[0], "ArraySync");
    //   // const processedImage = loadAndProcessImage(
    //   //   tf.browser.fromPixels(imageRef.value).toFloat()
    //   // );
    //   // const tensor = model.value.predict(input);
    //
    //
    //   let species = [
    //     "Amblyomma americanum",
    //     "Amblyomma maculatum",
    //     "Dermacentor marginatus",
    //     "Dermacentor occidentalis",
    //     "Dermacentor reticulatus",
    //     "Dermacentor variabilis",
    //     "Ixodes pacificus",
    //     "Ixodes ricinus",
    //     "Ixodes scapularis",
    //     "Rhipicephalus sanguineus"
    //   ];
    //
    //   let genera = [
    //     "Amblyomma",
    //     "Dermacentor",
    //     "Ixodes",
    //     "Rhipicephalus"
    //   ];
    //
    //   // console.log(labelPrediction, "label", tensor);
    //   // console.log(classLabels[labelPrediction]);
    //   // console.log(labels[labelPrediction], labelPrediction);
    //
    //   // if (classLabels[labelPrediction] !== "tick") {
    //   //   predictedLabel.value = {
    //   //     commonName: "Where's the tick?",
    //   //     scientificName: notATickRandomResponse(classLabels[labelPrediction])
    //   //   };
    //   //   return;
    //   // } else {
    //   //   predictedLabel.value = classLabels[labelPrediction];
    //   // }
    //   predictedLabel.value = {
    //     commonName: commonTickNames[species[res.labelPrediction]],
    //     scientificName: species[res.labelPrediction]
    //   };
    //   predictionPercentage.value = res.percentageResult;
    //
    //   showResults.value = true;
    //
    //   const pageId = wikiPageIds[species[res.labelPrediction]];
    //
    //   // const wikiPage = await wiki().page(pageId);
    //   // const pageUrl = wikiPage.url();
    //   // const pageSummary = await wikiPage.summary();
    //
    //
    //
    //   wiki().page(pageId).then(page => page.summary()).then(summary => {
    //     tickContent.value = summary;
    //   });
    //
    //   //setTick(labels[labelPrediction]);
    //
    //   tf.engine().endScope();
    //   return true;
    //
    // };

    function shortenedCol(arrayofarray, indexlist) {
      return arrayofarray.map(function (array) {
        return indexlist.map(function (idx) {
          return array[idx];
        });
      });
    }


    return {
      leftDrawerOpen,
      handleUploadData,
      imageRef,
      canvasRef,
      imageSrc,
      files,
      predictedLabel,
      predictionPercentage,
      getConfidenceColor,
      showResults,
      tickContent,
      persistent,
      showUnsupportedBrowserPopup,

      links1: [
        { icon: 'photo', text: 'Photos' },
        { icon: 'photo_album', text: 'Albums' },
        { icon: 'assistant', text: 'Assistant' },
        { icon: 'people', text: 'Sharing' },
        { icon: 'book', text: 'Photo books' }
      ],
      links2: [
        { icon: 'archive', text: 'Archive' },
        { icon: 'delete', text: 'Trash' }
      ],
      links3: [
        { icon: 'settings', text: 'Settings' },
        { icon: 'help', text: 'Help & Feedback' },
        { icon: 'get_app', text: 'App Downloads' }
      ],
      createMenu: [
        { icon: 'photo_album', text: 'Album' },
        { icon: 'people', text: 'Shared Album' },
        { icon: 'movie', text: 'Movie' },
        { icon: 'library_books', text: 'Animation' },
        { icon: 'dashboard', text: 'Collage' },
        { icon: 'book', text: 'Photo book' }
      ],
      toggleLeftDrawer
    }
  }
}
</script>

<style scoped lang="sass">

.v
  display: inline-block
  transition: transform 0.5s ease-in-out
  &::before
    transform: rotateX(30deg) translateZ(0)
    transition: transform 0.5s ease-in-out

  &:hover
    transform: rotateX(180deg)
    transition: transform 0.5s ease-in-out


</style>
