<template>
  <q-page class="bg-black">
  <div class="app-container">
    <tick-game-header :generation="1" @reset="" @promptStartMenu="menuPrompt = true"></tick-game-header>
    <div class="flex-main-container">
      <tick-game-photo-card
        :round="roundCount + 1"
        :answer="answer"
        :showTick="showTick"
      ></tick-game-photo-card>
      <tick-game-right-info-box :answer="answer" :showInfo="showInfo"></tick-game-right-info-box>
      <tick-game-quiz
        :ticks="ticks"
        :answer="answer"
        :players="playersJoined.filter((player) => player.nickname !== username).filter((player) => !player.hasResponded)"
        :message="message"
        :timer-at="timerAt"
        :generation="generation"
        :show-players-results="showPlayersResults"
        :players-results="playersJoined"
        :showOptions="showOptions"
        :showReset="showReset"
        :showFinalResults="showFinalResults"
        :showSinglePlayerOptions="showSinglePlayerOptions"
        @checkAnswer="checkAnswer"
        @leaveSession="leaveGameLobby"
        @playAgain="beginSoloGame"
        @mainMenu="backToMainMenu"
        @reset="reset"
      ></tick-game-quiz>
    </div>
  </div>
    <q-dialog v-model="usernamePrompt" persistent>
      <q-card class="prompt-menu">
        <q-card-section>
          <p style="margin-left: 20px; margin-top: 10px">Choose a nickname</p>
        </q-card-section>


        <q-card-section style="padding-bottom: 10px">
          <q-input style="padding-left: 20px; padding-right: 20px" dense debounce="500" v-model="username" bottom-slots :error-message="userNameErrorMessage" :error="isUsernameTaken" @input="usernameChecker" autofocus @keyup.enter="setNickname" />
        </q-card-section>

<!--        <q-card-section style="padding: 20px">-->
<!--         <picker set="emojione" />-->
<!--        </q-card-section>-->

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" style="font-size: 25px; margin-right: 30px" class="option-menu" v-close-popup />
          <q-btn flat label="Set" style="font-size: 25px; margin-right: 10px" class="option-menu" :disable="isUsernameTaken || username.length === 0" @click="setNickname"  />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="hostOrJoinGamePrompt" persistent>
      <q-card class="prompt-menu" style="width: 400px">
        <q-card-section>
          <p style="margin-left: 20px; margin-top: 10px">Join or host a game?</p>
        </q-card-section>

        <q-card-section style="padding: 20px;">


        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Back" style="font-size: 25px; margin-right: 80px" class="option-menu text-grey-7" @click="menuPrompt = true" v-close-popup />

          <q-btn flat label="Join" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="joinGamePrompt = true" v-close-popup />
          <q-btn flat label="Host" style="font-size: 25px; margin-right: 10px" class="option-menu" @click="usernamePrompt = true"  v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="joinGamePrompt" persistent>
      <q-card class="prompt-menu" style="width: 400px">
        <q-card-section>
          <p style="margin-left: 20px; margin-top: 10px">Enter game PIN</p>
        </q-card-section>

        <q-card-section style="padding: 20px;">
          <q-input style="padding-left: 20px; padding-right: 20px" dense v-model="joinGamePin" bottom-slots error-message="Game PIN not found" :error="gamePinNotFound" placeholder="Game PIN" @input="joinGamePin = joinGamePin.replaceAll(' ', '')"  autofocus  />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" style="font-size: 25px; margin-right: 25px" class="option-menu text-grey-7" v-close-popup />

          <q-btn flat label="Enter" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="enterGame" @keyup.enter="enterGame"  />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="menuPrompt" persistent>
      <q-card class="prompt-menu" style="width: 500px">
        <q-card-section>
          <p style="margin-left: 20px; margin-top: 10px; padding-right: 20px">Solo or Multiplayer?</p>
        </q-card-section>

        <q-card-section style="padding: 20px;">


        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" style="font-size: 25px; margin-right: 80px" class="option-menu text-grey-7" v-close-popup />

          <q-btn flat label="Solo" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="instructionsPrompt = true; gameMode = 'solo'" v-close-popup />
          <q-btn flat label="Multiplayer" style="font-size: 25px; margin-right: 10px" class="option-menu" @click="hostOrJoinGamePrompt = true; gameMode = 'multiplayer'" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="instructionsPrompt" persistent>
      <q-card class="prompt-menu" >
        <q-card-section>
          <p style="margin-left: 20px; margin-top: 10px; padding-right: 20px">Welcome!</p>
        </q-card-section>

        <q-card-section style="padding: 20px;">
          Get ready for an exciting virtual fieldwork experience! Your challenge is to correctly identify the type of tick you come across.
          Score 5 points for a correct identification and 0 points for an incorrect one.
          So, are you up for the challenge?
        </q-card-section>
        <q-card-section style="padding: 20px;">
          <div class="row" style="max-width: 280px">
            <q-select filled v-model="maxRounds" :options="roundOptions"

            />
            <p style="padding-left: 5px">Rounds</p>
          </div>
        </q-card-section>
        <q-card-section style="padding: 20px;">
          <p class="loading" v-if="Object.keys(tickData).length === 0">Warming up the game</p>
          <p v-else>Game is ready to be played!</p>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Back" style="font-size: 25px; margin-right: 20px" class="option-menu text-grey-7" @click="menuPrompt = true" v-close-popup />
          <q-btn flat label="Start" style="font-size: 25px; margin-right: 30px" class="option-menu" :disable="Object.keys(tickData).length === 0" @click="beginSoloGame" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="playersPrompt" persistent>
      <q-card class="prompt-menu" style="width: 450px">

        <q-card-section>
          <p style="margin-left: 20px; margin-top: 10px; padding-right: 20px">Game PIN:</p>
        </q-card-section>

        <q-card-section style="padding-left: 20px; padding-right: 20px;" >
<!--          <p style="font-size: 62px; font-weight: bold">{{ gamePinDisplay }}</p>-->
          <q-btn style="font-size: 62px; font-weight: bold" padding="none" flat :label="gamePinDisplay" @click="copyGamePinToClipboard(gamePinDisplay)" >
            <q-tooltip anchor="bottom middle" self="center left">
              Copy game PIN to share
            </q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section style="padding: 20px;" >
          <div class="row" style="max-width: 280px">
          <q-select filled v-model="maxRounds" :options="roundOptions" @input="setGlobalRounds"

          />
            <p style="padding-left: 5px">Rounds</p>
            </div>
        </q-card-section>
        <q-card-section style="padding-left: 20px; padding-right: 20px;" >
          <p class="loading" v-show="playersJoined.length < 2">Waiting for other players</p>
          <p v-show="playersJoined.length >= 2">Players:</p>
          <div v-for="player in playersJoined" class="row">
            <p :style="{fontWeight: username === player.nickname ? 'bold':''}" class="col" :class="username !== player.nickname ? 'strikethrough': ''">{{ player.nickname }}{{player.isHost ? ' | host': ''}}</p>
            <span class="col">[<span v-if="player.isReady" class="text-green">Ready</span><span v-else class="text-red">Not ready</span>]</span>
          </div>
        </q-card-section>
        <q-card-section style="padding-left: 20px; padding-right: 20px;" v-if="gameIsStarting">
          <p>Game is starting in </p>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Leave" style="font-size: 25px; margin-right: 105px" class="option-menu" @click="cancelMultiplayerSearch" v-close-popup />

          <q-btn flat label="Ready" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="setPlayerReady(true)" v-if="!isPlayerReady" />
          <q-btn flat label="Not ready" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="setPlayerReady(false)" v-else />

          <q-btn flat label="Start" style="font-size: 25px; margin-right: 10px" class="option-menu" @click="startGame" :disable="maxRounds === null || !playersJoined.every(player => player.isReady)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="waitingLobbyPrompt" persistent>
      <q-card class="prompt-menu" style="width: 500px; padding-top: 20px">

        <q-card-section style="padding-left: 20px; padding-right: 20px;">
          <p class="loading">Waiting on host</p>
        </q-card-section>
        <q-card-section style="padding-left: 20px; padding-right: 20px;">
          <p>Rounds: {{maxRounds}}</p>
        </q-card-section>

        <q-card-section style="padding-left: 20px; padding-right: 20px;" >
          <q-separator size="0.5rem" color="grey-6" style="margin-bottom: 10px" />
          <p>Players:</p>
          <div v-for="player in playersJoined" class="row">
            <p :style="{fontWeight: username === player.nickname ? 'bold':''}" class="col">{{ player.nickname }}{{player.isHost ? ' | host': ''}}</p>
            <span class="col">[<span v-if="player.isReady" class="text-green">Ready</span><span v-else class="text-red">Not ready</span>]</span>
          </div>

        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Ready" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="setPlayerReady(true)" v-if="!isPlayerReady" />
          <q-btn flat label="Not ready" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="setPlayerReady(false)" v-else />

          <q-btn flat label="Leave" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="leaveGameLobby" v-close-popup />
        </q-card-actions>


      </q-card>
    </q-dialog>
    <q-dialog v-model="hasHostLeftOrGameCanceled">
      <q-card class="prompt-menu">
        <q-card-section>
          <p style="margin-left: 20px; margin-top: 10px; padding-right: 20px">Session has closed</p>
        </q-card-section>

        <q-card-section style="padding: 20px;">
          <p>The host has left the session.</p>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Ok" style="font-size: 25px; margin-right: 30px" class="option-menu" @click="menuPrompt = true;" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>

</template>

<script setup>
import {onMounted, ref} from "vue";
import { copyToClipboard, Notify } from 'quasar';

import TickGamePhotoCard from "components/TickGamePhotoCard.vue";
import TickGameRightInfoBox from "components/TickGameRightInfoBox.vue";
import TickGameQuiz from "components/TickGameQuiz.vue";
import TickGameHeader from "components/TickGameHeader.vue";
import {getTickData} from "src/utils";
import {tickDiseases, tickNamesTrivia} from "src/vars";
import {firebaseAuth, FirebaseDB} from "src/FirebaseInit";
import {onAuthStateChanged, signInAnonymously} from "firebase/auth";
import {arrayUnion, deleteDoc, doc, getDoc, onSnapshot, serverTimestamp, setDoc, updateDoc} from "firebase/firestore";
import {setTimeout} from 'worker-timers';
import JSConfetti from 'js-confetti';

const jsConfetti = new JSConfetti();

const usernamePrompt = ref(false);
const menuPrompt = ref(true);
const playersPrompt = ref(false);
const hostOrJoinGamePrompt = ref(false);
const joinGamePrompt = ref(false);
const waitingLobbyPrompt = ref(false);
const instructionsPrompt = ref(false);

const gameMode = ref('solo');
const roundCount = ref(0);
const roundOptions = [5, 10, 20];
const maxRounds = ref(5);
const timerAt = ref(10);

const tickData = ref({});
const ticks = ref([]);
const answer = ref({});
const showTick = ref(false);
const showOptions = ref(false);
const showReset = ref(false);
const showPlayersResults = ref(false);
const showSinglePlayerOptions = ref(false);
const showFinalResults = ref(false);
const showInfo = ref(false);
const message = ref(``);
const generation = ref(1);
const username = ref('');
const isUsernameTaken = ref(false);
const userNameErrorMessage = ref('This nickname is taken!');
const currentTickIndex = ref(null);
const roundStartingAudio = new Audio('race-start.mp3');
const correctAnswerAudio = new Audio('right-answer-audio.mp3');
const incorrectAnswerAudio = new Audio('wrong-answer-sound.mp3');
const playerId = ref('');

const gamePinDisplay = `${getGamePin(2)} ${getGamePin(3)}`;
const gamePin = gamePinDisplay.replace(' ', '');
const joinGamePin = ref('');
const gamePinNotFound = ref(false);
const unsub = ref(null);
const playersJoined = ref([]);
const isPlayerReady = ref(false);
const hasHostLeftOrGameCanceled = ref(false);
const gameIsStarting = ref(false);
const singlePlayerScoreEarned = ref(0);


Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})


onMounted(async () => {
  initUser();
  loadingMessage();
  tickData.value = await getTickData();
  //initGame();
  //stringToIntHash()
});

window.addEventListener('beforeunload', async function (e) {
  // Remove players when they leave the page
  //await deleteDoc(doc(FirebaseDB, "players", playerId.value));
  await deleteDoc(doc(FirebaseDB, "games", gamePin));
});






function getGamePin(digits) {
  let gen = n => [...Array(n)].map(_=>Math.random()*10|0).join``;

// first number can't be zero - so we generate it separatley
  return (1 + Math.random() * 9 | 0) + gen(digits);
}





function initUser() {
  onAuthStateChanged(firebaseAuth, async (user) => {

    if (user) {
      playerId.value = user.uid;
      // await setDoc(doc(FirebaseDB, "players", uid), {
      //   id: uid,
      //   nickname: null,
      //   score: 0,
      // });

      //console.log(uid);
    } else {
      //signed out

    }


  })
  signInAnonymously(firebaseAuth).then((user) => {
    // Signed in..
    //console.log('user', user);

  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage);

    });
}

async function usernameChecker(val) {
  isUsernameTaken.value = false;
  //console.log(val);

  if (joinGamePin.value) {
    const docRef = doc(FirebaseDB, "games", joinGamePin.value);
    const docSnap = await getDoc(docRef);
    //console.log(docSnap.data());
    const players = docSnap.data().players;
    if (players.some(e => e.nickname === username.value)) {
      isUsernameTaken.value = true;
    }
  }


  // const querySnapshot = await getDocs(collection(FirebaseDB, "players"));
  // console.log(querySnapshot);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data().nickname);
  //   // doc.data() is never undefined for query doc snapshots
  //   if (doc.data().nickname === val && playerId.value !== doc.id) {
  //     console.log('Already taken!');
  //     userNameErrorMessage.value = 'This nickname is taken!';
  //     isUsernameTaken.value = true;
  //   }
  //
  //   if (doc.data().nickname === val && playerId.value === doc.id) {
  //     console.log('Already set!');
  //     userNameErrorMessage.value = 'This is your current nickname!';
  //     isUsernameTaken.value = true;
  //   }
  //
  // });
}

async function enterGame() {
  gamePinNotFound.value = false;
  const docRef = doc(FirebaseDB, "games", joinGamePin.value);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    gamePinNotFound.value = true;
    return;
  }
  // const data = {
  //   players: arrayUnion({uid: playerId.value, isHost: false})
  // };
  // const status = await updateDoc(docRef, data);
  // console.log(status);
  usernamePrompt.value = true;
}

async function setGameStatus(shouldStart) {
  const docRef = doc(FirebaseDB, "games", gamePin);
  const updated_at_timestamp = serverTimestamp();
  //const docSnap = await getDoc(docRef);
  const data = {
    start: shouldStart,
    updatedAt: updated_at_timestamp
  };
  await updateDoc(docRef, data);

}

async function setPlayerReady(isReady){
  const docRef = doc(FirebaseDB, "games", joinGamePin.value ? joinGamePin.value: gamePin);
  const docSnap = await getDoc(docRef);
  let players = docSnap.data().players;
  const playerIndex = players.findIndex((player) => player.nickname === username.value);
  players[playerIndex].isReady = isReady;
  const data = {
    players: players
  };
  await updateDoc(docRef, data);
  isPlayerReady.value = isReady;
}

async function setGlobalRounds(val) {
  await setDoc(doc(FirebaseDB, "games", gamePin), {
    rounds: val,
    currentRound: 0
  });
}

async function setStartingRoundAudio() {
  const docRef = doc(FirebaseDB, "games", gamePin);
  const data = {
    playStartingRoundAudio: true
  };
  await updateDoc(docRef, data);

  //await audio.play();
}

async function startGame() {
  roundCount.value = 0;
  await setRandomTick();
  //await setGameStatus(true);
  await setStartingRoundAudio();


}

function onTimerComplete() {
  checkAnswer("");

}

function copyGamePinToClipboard(gamePIN) {
  copyToClipboard(gamePIN)
    .then(() => {
      Notify.create("Game PIN copied!");
    });
}

function resetState() {
  usernamePrompt.value = false;
  menuPrompt.value = true;
  playersPrompt.value = false;
  hostOrJoinGamePrompt.value = false;
  joinGamePrompt.value = false;
  waitingLobbyPrompt.value = false;
  instructionsPrompt.value = false;

  gameMode.value = 'solo';
  roundCount.value = 0;
  maxRounds.value = 5;
  timerAt.value = 10;

  showTick.value = false;
  showOptions.value = false;
  showReset.value = false;
  showPlayersResults.value = false;
  showSinglePlayerOptions.value = false;
  showFinalResults.value = false;
  showInfo.value = false;
  message.value = '';

  singlePlayerScoreEarned.value = 0;
}

function clearTextView() {
  answer.value = {};
  showTick.value = false;
  showOptions.value = false;
  showReset.value = false;
  showPlayersResults.value = false;
  showSinglePlayerOptions.value = false;
  showFinalResults.value = false;
  showInfo.value = false;
  message.value = '';
}

async function setNickname() {
  // const docRef = doc(FirebaseDB, "players", playerId.value);
  // const data = {
  //   nickname: username.value
  // };
  // await updateDoc(docRef, data);



  if (!joinGamePin.value) {
    await setDoc(doc(FirebaseDB, "games", gamePin), {
      players: [{uid: playerId.value, nickname: username.value, isHost: true, score: 0, hasResponded: false, isReady: false}]
    });
  } else {
    gamePinNotFound.value = false;
    const docRef = doc(FirebaseDB, "games", joinGamePin.value);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      gamePinNotFound.value = true;
      return;
    }
    const data = {
      players: arrayUnion({uid: playerId.value, nickname: username.value, isHost: false, score: 0, hasResponded: false, isReady: false})
    };
    const status = await updateDoc(docRef, data);
    console.log(status);

  }



  if (!joinGamePin.value) {
    setUpSnapshotEventListener(gamePin);
    usernamePrompt.value = false;
    playersPrompt.value = true;
  } else {
    setUpSnapshotEventListener(joinGamePin.value);
    usernamePrompt.value = false;
    joinGamePrompt.value = false;

    waitingLobbyPrompt.value = true;
  }


}

// document.addEventListener('visibilitychange', async function (event) {
//   if (gameMode.value !== 'multiplayer') {
//     return;
//   }
//   if (document.hidden) {
//     console.log('not visible');
//   } else {
//     // const docRef = doc(FirebaseDB, "games", joinGamePin.value ? joinGamePin.value: gamePin);
//     // const docSnap = await getDoc(docRef);
//     // if (docSnap.data().players) {
//     //   playersJoined.value = docSnap.data().players;
//     // }
//     console.log('is visible');
//
//   }
// });


function setUpSnapshotEventListener(pin){
  const docRef = doc(FirebaseDB, "games", pin);
  unsub.value = onSnapshot(docRef, (doc) => {
    //console.log("Current data: ", doc.data(), new Date().toDateString());
    if (!doc.data()) {
      waitingLobbyPrompt.value = false;
      if (joinGamePin.value) {
        hasHostLeftOrGameCanceled.value = true;
      }
    }
    if (doc.data().players) {
      playersJoined.value = doc.data().players.sort((a) => {
        if (a.nickname === username.value) {
          return -1;
        }
        return 0;
      });

    }

    if (doc.data().rounds && maxRounds.value !== doc.data().rounds) {
      maxRounds.value = doc.data().rounds;
    }

    if (doc.data().playStartingRoundAudio && doc.data().currentRound === 0) {
      updateDoc(docRef, {
        playStartingRoundAudio: false
      }).then(()=> {
        message.value = `Get ready for round ${doc.data().currentRound + 1}!`;
        roundStartingAudio.play();

        setTimeout(() => {
          setGameStatus(true);
        }, 3000);
      })
    }



    if (doc.data().start) {
      // if (doc.data().playStartingRoundAudio && doc.data().currentRound === 0) {
      //   audio.play();
      // }
      setGameStatus(false);
      //console.log("Start game!", doc.data());
      waitingLobbyPrompt.value = false;
      //console.log(doc.data().currentRound);
      initGame(doc.data().gameRounds[doc.data().currentRound].tickChoices, doc.data().gameRounds[doc.data().currentRound].selectedRow);


    } else {
      //console.log("Don't start game!");
    }

    if (doc.data().players && doc.data().players.every((player) => player.hasResponded) && (doc.data().currentRound < doc.data().rounds)) {
      updateDoc(docRef, {
        currentRound: doc.data().currentRound + 1,
        players: doc.data().players.map((player) => {
          return {
            ...player,
            hasResponded: false
          }
        })
      }).then(() => {
        if (doc.data().currentRound + 1 > maxRounds.value - 1) {
          //playersJoined.value = [];
          showPlayersResults.value = false;
          const maxPlayers = doc.data().players.reduce((acc, current) => {
            if (current.score > acc[0].score) {
              return [current];
            } else if (current.score === acc[0].score) {
              acc.push(current);
            }
            return acc;
          }, [doc.data().players[0]]);

          const winnerPlayers = Array.from(new Set(maxPlayers.map(player => player.nickname)));

          message.value = `The winner is ${winnerPlayers.length > 1 ? "a tie.": ""} ${winnerPlayers.join(", ")}!`;
          showFinalResults.value = true;
          if (winnerPlayers.length === 1 && winnerPlayers[0] === username.value) {
            jsConfetti.addConfetti();
          }

          return;
        }
        message.value = `Get ready for round ${doc.data().currentRound + 2}!`;
        roundStartingAudio.play();

        setTimeout(() => {
          roundCount.value = doc.data().currentRound + 1;
          setGameStatus(true);
        }, 3000);

      });
    }
  });
}



async function joinGameSetNickName() {
  const docRef = doc(FirebaseDB, "games", joinGamePin.value);
  const docSnap = await getDoc(docRef);
  //console.log(docSnap);

}

async function cancelMultiplayerSearch() {
  //console.log(gamePin);
  await deleteDoc(doc(FirebaseDB, "games", gamePin));
  menuPrompt.value = true;
}

async function leaveGameLobby() {
  clearTextView();
  if (!joinGamePin.value) {
    await cancelMultiplayerSearch();
    return;
  }
  const docRef = doc(FirebaseDB, "games", joinGamePin.value);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data().players.filter((player) => player.nickname !== username.value);
  await updateDoc(docRef, {
    players: data
  });

}


async function backToMainMenu() {
  clearTextView();
  if (gameMode.value === "solo") {
    instructionsPrompt.value = true;
    return;
  }
  showFinalResults.value = false;
  showPlayersResults.value = false;
  await setPlayerReady(false);
  if (joinGamePin.value) {
    waitingLobbyPrompt.value = true;
  } else {
    playersPrompt.value = true;
  }
}

async function setRandomTick() {
  const gameRounds = [];
  //for (let i = 0; i < maxRounds.value; i++) {
    let i = 0;
    while (i < maxRounds.value) {
      const randomTickIndex = Math.floor(Math.random() * tickData.value.rows.length);
      //const docSnap = await getDoc(docRef);

      //console.log(tickData.value.rows[randomTickIndex].c);
      const row = tickData.value.rows[randomTickIndex].c;

      if (row[2] != null && !row[2].hasOwnProperty('v')) {
        continue;
      }

      let tickChoices = tickNamesTrivia
        .map(value => ({value, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(({value}) => value).slice(0, 4);


      try {

        if (!tickChoices.includes(row[2].v)) {
          const randomIndex = Math.floor(Math.random() * 4);
          tickChoices[randomIndex] = row[2].v;
        }

      }catch (e) {
        continue;
      }
      i++;

      gameRounds.push({
        randomTickIndex: randomTickIndex,
        tickChoices: tickChoices,
        selectedRow: row,
      });

    }

  //}

  const docRef = doc(FirebaseDB, "games", gamePin);
  const data = {
    //start: true,
    gameRounds,
    rounds: maxRounds.value,
    currentRound: 0
  };
  await updateDoc(docRef, data);

  // ticks.value = tickChoices;
  // currentTickIndex.value = randomTickIndex;


}

function getRandomTick() {
  return {
    randomTickIndex: currentTickIndex.value,
    tickChoices: ticks.value,
    selectedRow: tickData.value.rows[currentTickIndex.value].c
  }
}

function initSoloPlayer() {
  showSinglePlayerOptions.value = false;

  if (maxRounds.value <= roundCount.value) {
    return;
  }
  const randomTickIndex = Math.floor(Math.random() * tickData.value.rows.length);
  //const docSnap = await getDoc(docRef);

  //console.log(tickData.value.rows[randomTickIndex].c);
  const row = tickData.value.rows[randomTickIndex].c;

  let tickChoices = tickNamesTrivia
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value).slice(0, 4);

  if (!tickChoices.includes(row[2].v)) {
    const randomIndex = Math.floor(Math.random() * 4);
    tickChoices[randomIndex] = row[2].v;
  }

  initGame(tickChoices, row);

}

async function initGame(answerChoices, selectedTickRow) {
  ticks.value = answerChoices;
  answer.value = {};
  showTick.value = false;
  showOptions.value = true;
  showReset.value = false;
  showInfo.value = false;
  showFinalResults.value = false;
  message.value = `What's that tick?`;

  // const randomTickIndex = Math.floor(Math.random() * tickData.value.rows.length);
  // console.log(tickData.value.rows[randomTickIndex].c);
  // const row = tickData.value.rows[randomTickIndex].c;
  //
  //
  // ticks.value = tickNamesTrivia
  //   .map(value => ({ value, sort: Math.random() }))
  //   .sort((a, b) => a.sort - b.sort)
  //   .map(({ value }) => value).slice(0, 4);
  //
  // if (!ticks.value.includes(row[2].v)) {
  //   const randomIndex = Math.floor(Math.random() * 4);
  //   ticks.value[randomIndex] = row[2].v;
  // }
  //
  //await setRandomTick();

  const row = selectedTickRow;

  answer.value = {
    commonName: row[2].v,
    scientificName: row[1].v,
    type: ['Hard Shelled'],
    abilities: tickDiseases[row[2].v].split(','),
    src: row[6].v.split(',')[0].replace('square', 'medium')
  };




}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function beginSoloGame() {
  showSinglePlayerOptions.value = false;
  roundCount.value = 0;
  singlePlayerScoreEarned.value = 0;
    message.value = `Get ready for round ${roundCount.value + 1}!`;
    roundStartingAudio.play();
    sleep(3000).then(() => {
      initSoloPlayer();
    })
}

async function checkAnswer(ans) {
  showOptions.value = false;
  message.value = '';
  loadingMessage();

  if (gameMode.value === "multiplayer") {
    const activeGamePin = joinGamePin.value ? joinGamePin.value: gamePin;
    const docRef = doc(FirebaseDB, "games", activeGamePin);
    const docSnap = await getDoc(docRef);
    //const data = docSnap.data().players.filter((player) => player.nickname !== username.value);
    let players = docSnap.data().players;
    //console.log(players);
    const playerIndex = players.findIndex((player) => player.nickname === username.value);
    players[playerIndex].hasResponded = true;
    if (ans === answer.value.commonName) {
      players[playerIndex].score += 5;
    }

    const status = await updateDoc(docRef, {
      players: players
    });

    showPlayersResults.value = true;
  }


  if (ans === answer.value.commonName) {
    await correctAnswerAudio.play();
    displayMessage('correct');
    singlePlayerScoreEarned.value += gameMode.value === "solo" ? 5:0;
  }
  else {
    await incorrectAnswerAudio.play();
    displayMessage('incorrect');
  }
  showTick.value = true;
  showInfo.value = true;
  showReset.value = true;


  if (gameMode.value === "solo") {
    if (roundCount.value + 2 > maxRounds.value) {
      message.value = `You scored a total of ${singlePlayerScoreEarned.value} points out of ${maxRounds.value * 5} points possible.`;
      if (singlePlayerScoreEarned.value === maxRounds.value * 5) {
        jsConfetti.addConfetti();
      }
      showSinglePlayerOptions.value = true;
      return;
    }
    sleep(3000).then(async () => {
      message.value = `Get ready for round ${roundCount.value + 2}!`;
      await roundStartingAudio.play();
      sleep(3000).then(() => {
        roundCount.value += 1;
        initSoloPlayer();
      })
    });
  }

  // setTimeout(() => {
  //   if (ans === answer.value.commonName) displayMessage('correct');
  //   else displayMessage('incorrect');
  //   showTick.value = true;
  //   showInfo.value = true;
  //   showReset.value = true;
  // }, 800);
}

function loadingMessage(inc = 1) {
  setTimeout(() => {
    message.value += `. `;
    inc = inc + 1;
    if (inc <= 4) {
      loadingMessage(inc);
    }
  }, 200);
}


function isFollowedByVowel(word) {
  return ["a", "e", "i", "o", "u"].includes(word.trim().toLowerCase().charAt(0));
}

function displayMessage(type) {
  switch (type) {
    case 'correct':
      message.value = `Correct! It's ${isFollowedByVowel(answer.value.commonName) ? 'an': 'a'} ${answer.value.commonName}`;
      break
    case 'incorrect':
      message.value = `Whoops! It's a ${answer.value.commonName}`;
      break
  }
}

function reset() {
  showPlayersResults.value = false;
  initSoloPlayer();
}

</script>

<style lang="scss" scoped>
@import "../assets/sass/_main.scss";
.app-container {
    padding-top: 20px;
    width: calc(100vmin - 1.2rem);
    height: 100%;
    position: relative;
    margin: auto;
    overflow: hidden;
    @include breakpoint(min-width, 'tablet') {
      margin-top: 2%;
    }
    @include breakpoint(min-width, 'laptop') {
      margin-top: 0;
      width: calc(100vmin + 8rem);
      height: 100vmin;
    }

}

.flex-main-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  height: 80%;
  background-image: url('../assets/img/green-bg.png');
  background-repeat: repeat;
  background-position: left top;
  @include breakpoint(min-width, 'tablet') {
    border: 0.4rem solid $app-bg;
    flex-direction: row;
    flex-wrap: wrap;
  }
  & > div:nth-child(1) {
    order: 1;
    flex: 1 0 auto;
    align-self: auto;
    width: 100%;
    @include breakpoint(min-width, 'tablet') {
      width: 50%;
    }
  }
  & > div:nth-child(2) {
    order: 3;
    flex: 1 0 auto;
    align-self: auto;
    width: 100%;
    height: 60%;
    @include breakpoint(min-width, 'tablet') {
      width: 50%;
      order: 2;
      border-top: 0.4rem solid #ffebd6;
      border-left: 0.4rem solid #ffebd6;
    }
  }
  & > div:nth-child(3) {
    order: 2;
    flex: 0 0 100%;
    height: 40%;
    padding: 0.5rem 0.3rem;
    @include breakpoint(min-width, 'tablet') {
      order: 3;
      background-image: linear-gradient(to right, #ffebd6 50%, transparent 50%);
      background-position: top left;
      background-repeat: no-repeat;
      background-size: 100% 0.4rem;
      border-left: 0.4rem solid#ffebd6;
    }
  }
}

.prompt-menu {
  background: $ui-info-data;
  overflow-y: scroll;
  border-radius: 0.8rem;

}
.option-menu {
  cursor: pointer;
  position: relative;
  font-size: 1.6rem;
  @include breakpoint(min-width, 'tablet') {
    font-size: 2.2rem;
  }
  @include breakpoint(min-width, 'laptop') {
    font-size: 2.0rem;
  }

  &::before {
    content: '';
    font-family: 'Material Icons', serif;
    position: absolute;
    top: 0;
    left: -2rem;
    color: $text;
    @include breakpoint(min-width, 'tablet') {
      top: 2px;
      left: -2.5rem;
    }
  }

  &:hover::before {
    content: '\e037';
    margin-top: 8px;
  }
}

.loading::after {
  display: inline-block;
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

.strikethrough:hover {
  text-decoration: line-through;
  cursor: pointer;
}

.selectInput {
  padding-left: 100px;
}

</style>
