<template>
  <q-page align="center">
    <div class="translateUp" style="justify-content:center; text-align:-moz-center;">

      <q-img src="../assets/mountaineers-g2a91a9e84_1920.jpg" width="100%" height="50%">
        <div class="absolute-full text-subtitle2 flex flex-center" style="font-family:customfont; font-size:xx-large">
            Research through Collaboration
        </div>
      </q-img>

      <h1 style="font-family:customfont; font-size:xx-large;">
        welcome to ticktrax 
        <q-img src="../assets/ticktrax.png" width="50px"/>
      </h1>

      <div class="row justify-center items-center" style="background-color:#C8CDCD; font-family:'Tahoma',sans-serif">
        <div class="col-4 q-pa-md" style="font-size:large">
          Ticks are the main carrier of Lyme Disease. To observe the activity of these insects, TickTrax was created to allow anyone to add to 
            a large database of tick images and locations. Through a Citizen Science approach, we hope to better understand the movement and spread 
            of lyme disease.
        </div>
        <div class="col-4">
          <q-img src="../assets/trees-gad9fa0b7c_1920.jpg" style="height=80%"/>
        </div>
      </div>
    
     </div>

    </div>

    

    <!-- <div class="fadeIn" >
      <q-btn color="primary">
        sign in
      </q-btn>
      <q-btn color="primary" >
        sign up
      </q-btn>
    </div> -->
    <tick-list class="fadeIn"/>
  </q-page>
</template>

<script>
import TickList from 'components/TickList.vue'

export default {
  name: 'PageIndex',
  components: {
    TickList
  }
}
</script>

<style>

.translateUp{
  position: relative;
  animation-name: translate;
  animation-duration: 1s;
  animation-direction: reverse;
}

.fadeIn{
  animation-name: fadeIn;
  animation-duration: 2s;
}

@keyframes translate {
  0% {  }
  100% {  transform: translateY(200%) }
}

@keyframes fadeIn {
  0% {  opacity:0;  }
  100% {  opacity:1;  }
}
</style>