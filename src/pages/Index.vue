<template>
  <q-page align="center">
    <div class="translateUp" style="justify-content:center; text-align:-moz-center;">

      <q-img v-if="$q.platform.is.desktop" src="../assets/mountaineers-g2a91a9e84_1920.jpg" width="100%" height="25%" :ratio="16/5">
        <div class="absolute-full text-subtitle2 flex flex-center" style="font-family:customfont; font-size:xx-large">
            <div class="br">
            Welcome to ticktrax <br></br>
            Research through Collaboration
            </div>
        </div>  
      </q-img>

      <h1 v-if="$q.platform.is.mobile" style="font-family:customfont; font-size:xx-large;">
        Welcome to ticktrax 
        <q-img src="../assets/ticktrax.png" width="50px"/>
      </h1>
      <h1 v-if="$q.platform.is.desktop" v-ekse style="font-family:customfont; font-size:xx-large;">
        <q-img src="../assets/ticktrax.png" width="50px"/>
      </h1>

      <h1 v-if="$q.platform.is.desktop" class="q-my-lg" style="font-family:customfont; font-size:xx-large; color:black">
        Our Purpose
      </h1>

      <div v-if="$q.platform.is.desktop" class="row justify-center items-center" style="background-color:##DEF2C8; font-family:'Tahoma',sans-serif">
        <div  class="col-4 q-pa-md" style="font-size:large">
          Ticks are the main carrier of Lyme Disease. To observe the activity of these insects, TickTrax was created to allow anyone to add to 
            a large database of tick images and locations. Through a Citizen Science approach, we hope to better understand the movement and spread 
            of lyme disease.
        </div>
        <div class="col-4">
          <q-img src="../assets/trees-gad9fa0b7c_1920.jpg" style="height=80%"/>
        </div>
      </div>

      <h1 class="q-my-lg" style="font-family:customfont; font-size:xx-large; background-color:#5CAB7D; color:white">
        How to get involved
      </h1>

      <div v-if="$q.platform.is.desktop" class="row justify-center items-center">
        <div class="col-4 q-pa-md">
          <div style="font-family:customfont; font-size:xx-large">Sign up</div>
          <q-img src="../assets/person_icon (2).jpg" width="30%"/>
          <figcaption style="font-family:'Tahoma', sans-serif">create an account to become a member of ticktrax</figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/register')"> Sign Up </q-btn>
        </div>

        <div class="col-4 q-pa-md"> 
          <div style="font-family:customfont; font-size:xx-large">Post</div>
          <q-img src="../assets/post_icon (2).jpg" width="30%"/>
          <figcaption style="font-family:'Tahoma', sans-serif">add to our database by posting an image of a tick</figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/form')"> post </q-btn>
        </div>

        <div class="col-4 q-pa-md">
          <div style="font-family:customfont; font-size:xx-large">learn</div>
          <q-img src="../assets/learn_icon.jpg" width="30%"/>
          <figcaption style="font-family:'Tahoma', sans-serif">see how many and what ticks are in your area </figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" disabled @click="$router.push('/form')"> heatmap </q-btn>
        </div>
      </div>

      <div v-if="$q.platform.is.mobile" class="column justify-center items-center">
        <div class="col-4 q-pa-md">
          <div style="font-family:customfont; font-size:xx-large">Sign up</div>
          <q-img src="../assets/person_icon (2).jpg" width="30%"/>
          <figcaption style="font-family:'Tahoma', sans-serif">create an account to become a member of ticktrax</figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/register')"> Sign Up </q-btn>
        </div>

        <div class="col-4 q-pa-md"> 
          <div style="font-family:customfont; font-size:xx-large">Post</div>
          <q-img src="../assets/post_icon (2).jpg" width="30%"/>
          <figcaption style="font-family:'Tahoma', sans-serif">add to our database by posting an image of a tick</figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/form')"> post </q-btn>
        </div>

        <div class="col-4 q-pa-md">
          <div style="font-family:customfont; font-size:xx-large">learn</div>
          <q-img src="../assets/learn_icon.jpg" width="30%"/>
          <figcaption style="font-family:'Tahoma', sans-serif">see how many and what ticks are in your area </figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" disabled @click="$router.push('/form')"> heatmap </q-btn>
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
      <h1 class="q-my-lg " align="center" style="font-family:customfont; font-size:xx-large;">
        Fun facts about ticks
      </h1>
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