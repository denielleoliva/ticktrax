<template>
  <div class="timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <rect  class="base-timer__path-elapsed" x="10" y="10" width="80" height="80" style="fill:none"></rect>
      </g>
      <path  id="base-timer-path-remaining4" :stroke-dasharray="`${dasharray} 320`" class="base-timer__path-remaining gold" d="M10,90 10,10 90,10 90,90 10,90" style="fill:none;"></path>
    </svg>
    <div class="timer__label">{{ myTimer }}</div>
  </div>
</template>

<script>
import { clearInterval, clearTimeout, setInterval, setTimeout } from 'worker-timers';
export default {
  name: "countDownTimer",
  props: ["timerAt"],
  emits: ["onTimerComplete", "onTimerAlmostUp"],
  data() {
    return {
      timerCount: this.timerAt,
      tenSecondsFromNow: null,
      myTimer: this.timerAt,
      dasharray: this.myTimer,
    }
  },
  mounted() {
    this.tenSecondsFromNow = new Date(new Date().getTime() + 11 * 1000);
    this.runTimer();
  },
  methods: {
    runTimer() {
      let timerInterval = setInterval(() => {
        const currentTime = new Date();
        let distance = this.tenSecondsFromNow.getTime() - currentTime.getTime();
        this.myTimer = Math.floor((distance % (1000 * 60)) / 1000);
        this.dasharray = (this.myTimer < 1 ? 1: this.myTimer) * 39 - 30;
        if (this.myTimer <= 3 && this.myTimer > 0) {
          this.$emit("onTimerAlmostUp", this.myTimer);
        }
        if (this.myTimer < 0) {
          clearInterval(timerInterval);
          this.$emit("onTimerComplete");
        }
      }, 500);



    },
  },

  watch: {
    // myTimer: {
    //   handler(value) {
    //     let timerInterval = setInterval(() => {
    //       const currentTime = new Date();
    //       let distance = this.tenSecondsFromNow.getTime() - currentTime.getTime();
    //       console.log(this.myTimer);
    //       this.myTimer = Math.floor((distance % (1000 * 60)) / 1000);
    //     }, 1000);
    //
    //     console.log(this.myTimer < 0);
    //     if (this.myTimer < 0) {
    //       clearInterval(timerInterval);
    //     }
    //
    //
    //
    //   },
    //   immediate: true
    //
    // },
    // timerCount: {
    //   handler(value) {
    //
    //     if (value > 0) {
    //       setTimeout(() => {
    //         this.timerCount--;
    //         this.dasharray = this.timerCount * 39 - 30
    //       }, 1000);
    //     } else {
    //       //this.$emit('onTimerComplete');
    //     }
    //
    //   },
    //   immediate: true // This ensures the watcher is triggered upon creation
    // }

  }

}
</script>

<style lang="scss" scoped>
@import "../assets/sass/_main.scss";


.timer {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
}

.timer__label {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;


}

.base-timer__path-remaining {

  transition: stroke-dasharray 1s linear;
  stroke-width: 5px;
}

.base-timer__path-remaining.gold {
  stroke: #494947;;
}

svg {
  filter: drop-shadow(1.5px 2.5px 1px #d0d0c8);
}



</style>
