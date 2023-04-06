<template>
  <div style="padding-bottom: 10px">
    <h3 class="wide">Identify the tick</h3>
    <div class="quiz-container" v-on:scroll="handleScroll">
      <div class="row justify-between">
        <p>{{ message }}</p>

        <count-down-timer :timer-at="timerAt" :has-picked-answer="hasPickedAnswer" @onTimerComplete="onTimerComplete" @onTimerAlmostUp="onTimerAlmostUp" v-if="showOptions" />
      </div>
      <table v-if="showFinalResults">
        <tr>
          <th>Player</th>
          <th>Score</th>
        </tr>
        <tr v-for="player in playersResults">
          <td>{{ player.nickname }}</td>
          <td>{{ player.score }}</td>
        </tr>
      </table>
      <div>

        <ul v-if="showOptions" class="quiz-options">
          <li v-for="tick in ticks" :key="tick" class="quiz-option">
            <input
              type="radio"
              :value="tick"
              :id="tick"
              @change="$emit('checkAnswer', tick); hasPickedAnswer = true;"
            />
            <label :for="tick">{{ tick }}</label>
          </li>
        </ul>
        <ul v-if="showSinglePlayerOptions" class="quiz-options">
          <li>
            <input
              type="radio"
              id="reset"
              value="Play Again"
              @change="$emit('playAgain')"
            />
            <label for="reset">Play Again</label>
          </li>
          <li>
            <input
              type="radio"
              id="menu"
              value="Menu"
              @change="$emit('mainMenu')"
            />
            <label for="menu">Menu</label>
          </li>
        </ul>

      </div>

      <div class="row" v-if="showReset && players.length > 0 && !showFinalResults">
        <p class="col">Waiting on: </p>
        <p v-for="player in players" class="col loading"> {{ player.nickname }}</p>
      </div>
      <div class="row" v-if="showPlayersResults">
        <p v-for="player in playersResults" class="col"> {{ player.nickname }}: {{ player.score }}</p>
      </div>
              <ul v-if="showFinalResults" class="quiz-options gameEndList">
                <li>
                  <input
                    type="radio"
                    id="reset"
                    value="Session Menu"
                    @change="$emit('mainMenu')"
                  />
                  <label for="reset" class="textBorder text-bold">Session Menu</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="leave"
                    value="Leave Session"
                    @change="$emit('leaveSession')"
                  />
                  <label for="leave" class="textBorder text-bold">Leave Session</label>
                </li>
              </ul>
    </div>
<span class="arrow" :class="isScrolledDown ? 'scroll-down': ''"></span>
  </div>
</template>

<script>
import CountDownTimer from "components/countDownTimer.vue";
export default {
  components: {CountDownTimer},
  props: {
    ticks: {
      type: Array,
      required: true,
    },
    answer: {
      type: Object,
      required: true,
    },
    players: {
      type: Array,
      replace: false
    },
    timerAt: {
      type: Number,
      required: true
    },
    generation: {
      type: Number,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    showOptions: {
      type: Boolean,
      required: true,
    },
    playersResults: {
      type: Array,
      required: false
    },
    showSinglePlayerOptions: {
      type: Boolean,
      required: true
    },
    showPlayersResults: {
      type: Boolean,
      required: false
    },
    showFinalResults: {
      type: Boolean,
      required: false
    },
    showReset: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  data() {
    return {
      timerCount: 10,
      dasharray: this.timerCount,
      isScrolledDown: true,
      hasPickedAnswer: false,
      timerAlmostUp: new Audio("timer-almost-up.mp3")
    }
  },
  watch:{
    showFinalResults: function (newVal, oldVal) {
      if (newVal) {
        this.isScrolledDown = false;
      }
    }
  },
  methods: {
    onTimerComplete() {
      console.log("Timer complete!");
      this.$emit("checkAnswer", "");
      this.hasPickedAnswer = false;
    },
    onTimerAlmostUp(timer) {
      if (timer === 3) {
        this.timerAlmostUp.play();
      }
      console.log('hello!', timer, this.hasPickedAnswer);
    },
    handleScroll(event) {
      const el = event.target;
      const scrolledToBottom = el.scrollHeight - el.scrollTop <= el.clientHeight;
      console.log(scrolledToBottom)
      this.isScrolledDown = !(!scrolledToBottom && this.showFinalResults);
    }
  },
  mounted() {

  },

}
</script>

<style lang="scss" scoped>
@import '../assets/sass/components/_titles_and_text.scss';
h3 {
  margin-bottom: 3rem;
  @include breakpoint(min-width, 'tablet') {
    margin-bottom: 1rem;
  }
}
.quiz-container {
  background: $ui-info-data;
  overflow-y: auto;
  border-radius: 0.8rem;
  position: relative;
  margin-top: -1.5rem;
  padding: 1rem;
  height: 85%;
  p {
    font-size: 1.5rem;
    padding-top: 0.35rem;
    margin-bottom: 1rem;
    @include breakpoint(min-width, 'tablet') {
      font-size: 2rem;
    }
  }
  form {
    margin-top: 1rem;
  }


}

.gameEndList {
  animation: glow 2s infinite;
}
.textBorder {
  padding: 0 10px 0 10px;
  border: solid #494947 2px;
}

.loading::after {
 // display: inline-block;
  animation: dotty steps(1,end) 1s infinite;
  content: '';
}

@keyframes dotty {
  0%   { content: ''; }
  25%  { content: '.'; }
  50%  { content: '..'; }
  75%  { content: '...'; }
  100% { content: ''; }
}
@keyframes glow {
  0%,100% { opacity: 0.6 }
  50% { opacity: 1 }
}

td {
  padding: 0 0 0 30px;
  //width: 100%;
}

.arrow {
  &::after {
    content: "▼"; /* Add content to the pseudo-element */
    position: absolute; /* Position the arrow absolutely */
    top: 79%; /* Position the arrow at the bottom of the container */
    right: 52px; /* Position the arrow 10 pixels from the right */
    width: 0;
    height: 0;

    animation: fade-out-fade-in 2s infinite;

  }
  &.scroll-down::after {
    opacity: 0;
    content: "";
  }
}

@keyframes fade-out-fade-in {
  0%,100% { opacity: 0.5 }
  50% { opacity: 1 }
}


::-webkit-scrollbar {
  width: 6px;
  //background-color: #000;
  border-radius: 0;
}

::-webkit-scrollbar-thumb {
  background-color: #7a8194;
  border-radius: 30%;
}


</style>
