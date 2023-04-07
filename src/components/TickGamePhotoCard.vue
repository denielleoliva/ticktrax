<template>
  <div>
    <div class="container">
      <div>
        <span v-if="showTick">RND:{{round}}</span>
        <span v-else>RND:{{round}}</span>
        <h2 v-if="showTick">{{ answer.commonName }}</h2>
        <h2 v-else>&nbsp;</h2>
      </div>

      <div class="picture">
        <q-img :src="answer.src"  style="max-width: 300px;max-height: 300px"  />
      </div>
    </div>
  </div>
</template>

<script>
import CountDownTimer from "components/countDownTimer.vue";

export default {
  components: {CountDownTimer},
  props: {
    answer: {
      type: Object,
      required: true,
    },
    round: {
      type: Number,
      required: true
    },
    showTick: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../assets/sass/_main.scss";
.container {
  border: 0.4rem solid $app-bg;
  height: 100%;
  background: $ui-purple;
  display: flex;
  flex-flow: column;
  padding: 0.4rem 0.2rem;
  @include breakpoint(min-width, 'tablet') {
    border-right: 0.4rem solid $app-bg;
    border-bottom: 0.4rem solid $app-bg;
    border-top: none;
    border-left: none;
  }
  div:first-child {
    min-height: 35px;
    display: flex;
    justify-content: space-between;
    h2,
    span {
      color: $text-light;
      @include text-shadow($text);
    }
  }
  .picture {
    border: 4px solid $ui-purple-border;
    border-radius: 5px;
    background-image: url('../assets/img/grey-bg.png');
    background-repeat: repeat;
    background-position: top left;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
img {
  max-height: 10rem;
  max-width: 15rem;
  display: block;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  @include breakpoint(min-width, 'tablet') {
    max-height: 15rem;
    max-width: 20rem;
  }
  &.hidden {
    filter: brightness(0);
  }
}
</style>
