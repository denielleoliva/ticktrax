<template>
  <q-page align="center">
    <div class="translateUp" style="justify-content:center; text-align:-moz-center;">
      <h1 style="font-family:customfont; font-size:xx-large;">
        Welcome to ticktrax 
        <q-img src="../assets/ticktrax.png" width="50px"/>
      </h1>
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