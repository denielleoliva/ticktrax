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
      <h1 v-if="$q.platform.is.desktop" style="font-family:customfont; font-size:xx-large;">
        <q-img src="../assets/ticktrax.png" width="50px"/>
      </h1>

      <!-- <h1 v-if="$q.platform.is.desktop" class="q-my-lg" style="font-family:customfont; font-size:xx-large;">
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

      <div v-if="$q.platform.is.desktop" class="row justify-center items-center">
        <div class="col-4 q-pa-md">
          <div style="font-family:customfont; font-size:xx-large">Sign up</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
          </svg>
          <figcaption style="font-family:'Tahoma', sans-serif">create an account to become a member of ticktrax</figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/register')"> Sign Up </q-btn>
        </div>

        <div class="col-4 q-pa-md"> 
          <div style="font-family:customfont; font-size:xx-large">Post</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
          </svg>
          <figcaption style="font-family:'Tahoma', sans-serif">add to our database by posting an image of a tick</figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/form')"> post </q-btn>
        </div>

        <div class="col-4 q-pa-md">
          <div style="font-family:customfont; font-size:xx-large">learn</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" class="bi bi-pin-map" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
            <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
          </svg>
          <figcaption style="font-family:'Tahoma', sans-serif">see how many and what ticks are in your area </figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" disabled @click="$router.push('/form')"> heatmap </q-btn>
        </div>
      </div>

      <div v-if="$q.platform.is.mobile" class="column justify-center items-center">
        <div class="col-4 q-pa-md">
          <div style="font-family:customfont; font-size:xx-large">Sign up</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" class="bi bi-person-add" viewBox="0 0 16 16">
            <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
            <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"/>
          </svg>
          <figcaption style="font-family:'Tahoma', sans-serif">create an account to become a member of ticktrax</figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/register')"> Sign Up </q-btn>
        </div>

        <div class="col-4 q-pa-md"> 
          <div style="font-family:customfont; font-size:xx-large">Post</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" class="bi bi-send-check" viewBox="0 0 16 16">
            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
            <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z"/>
          </svg>
          <figcaption style="font-family:'Tahoma', sans-serif">add to our database by posting an image of a tick</figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/form')"> post </q-btn>
        </div>

        <div class="col-4 q-pa-md">
          <div style="font-family:customfont; font-size:xx-large">Learn</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" class="bi bi-pin-map" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8l3-4z"/>
            <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z"/>
          </svg>
          <figcaption style="font-family:'Tahoma', sans-serif">see how many and what ticks are in your area </figcaption>
          <q-btn v-if="$q.platform.is.mobile" class="bg-primary text-white" @click="$router.push('/heatmap')"> heatmap </q-btn>
        </div>
      </div>
    </div>-->

    </div> 

    

    <!-- <div class="fadeIn" >
      <q-btn color="primary">
        sign in
      </q-btn>
      <q-btn color="primary" >
        sign up
      </q-btn>
    </div> -->
    <div>
      <h1 class="q-my-lg " align="center" style="font-family:customfont; font-size:xx-large;">
        Fun facts about ticks
      </h1>
      <tick-list class="fadeIn"/>
    </div>
    <div v-if="!signedIn() && $q.platform.is.mobile">
      <div class="row fixed-center" style="width:80%">
            <q-btn class="bg-primary text-white q-ma-md" style="width:100%" @click="$router.push('/signin')">
                log in
            </q-btn>
            <q-btn class="bg-grey text-white q-ma-md" style="width:100%" @click="$router.push('/register')">
                sign up
            </q-btn>
        </div>
    </div>

  </q-page>
</template>
<script>
import {ref} from "vue";
import TickList from 'src/components/TickList.vue';

export default{
  components: {TickList},
  data () {
      return {
      }
  },
  setup () 
  {
      return {

          form: ref({
              email: ref(''),
              subject: ref(''),
              message: ref(''),
          }),
      }
  },
  methods: {
    signedIn(){
      if(sessionStorage.getItem('token')) return true
      else return false
    } 
  }
}
</script>

<!-- <script>
import TickList from 'components/TickList.vue'

export default {
  name: 'PageIndex',
  components: {
    TickList
  }
}
</script> -->

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