import {doc, getDoc, updateDoc} from "firebase/firestore";
import {FirebaseDB} from "src/FirebaseInit";

export function expensive(gamePin, username) {
  const tenSecondsFromNow = new Date(new Date().getTime() + 11 * 1000);
  let timerInterval = setInterval(async () => {
    const currentTime = new Date();
    let distance = tenSecondsFromNow.getTime() - currentTime.getTime();
    console.log(this.myTimer < 0);
    let myTimer = Math.floor((distance % (1000 * 60)) / 1000);
    if (myTimer < 0) {
      clearInterval(timerInterval);
      console.log("Complete!");
      await sendAns(gamePin, username);
      //this.$emit('onTimerComplete');
    }
  }, 1000);
}


async function sendAns(gamePin, username) {
    const docRef = doc(FirebaseDB, "games", gamePin);
    const docSnap = await getDoc(docRef);
    //const data = docSnap.data().players.filter((player) => player.nickname !== username.value);
    let players = docSnap.data().players;
    const playerIndex = players.findIndex((player) => player.nickname === username);
    players[playerIndex].hasResponded = true;
  await updateDoc(docRef, {
    players: players
  });
}
