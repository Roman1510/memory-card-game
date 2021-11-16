<script>
import {ref, watch} from "vue";
import Card from "./components/Card";
import {confettiStart, confettiStop} from "./utilities/confetti";
import {getGameList,generateBoard} from "./features/createBoard.js";
import createGame from "./features/createGame.js";
import restartImage from "./assets/images/buttons/restart/restart.png";
import restartImagePressed from "./assets/images/buttons/restart/restart-pressed.png";
import {
  backgroundMusic,
  chooseMusic,
  flipMusic,
  matchMusic,
} from "./features/gameMusic.js";

export default {
  name: "Memory card game",
  components: {
    Card,
  },
  setup: function () {
    const difficulty = ref(0);
    let gameList = ref(getGameList());
    window.gameList = gameList.value
    let {playerNew, startGame, pairs, status} = createGame(
        gameList
    );
    const userSelected = ref([]);

    const prepareStart = (input) => {
      if (playerNew.value !== false) {
        backgroundMusic.stop();
        backgroundMusic.play();
      }
      difficulty.value = input;
      startGame(difficulty.value);
      confettiStop();
    };

    const prepareRestart = () => {
      console.log(getGameList())
      generateBoard(0)
      console.log(getGameList())
      gameList.value = []
      playerNew.value = true
    };

    const flipCard = (selected) => {
      chooseMusic.play();
      gameList.value[selected.position].visible = true;
      if (gameList.value[selected.position].matched === false) {
        if (userSelected.value[0]) {
          if (
              userSelected.value[0].position === selected.position &&
              userSelected.value[0].faceValue === selected.faceValue
          ) {
            return;
          } else {
            userSelected.value[1] = selected;
          }
        } else {
          userSelected.value[0] = selected;
        }
      }
    };

    watch(pairs, (currValue) => {
      if (currValue === 0) {
        confettiStart();
      }
    });

    watch(
        userSelected,
        (currValue) => {
          if (currValue.length === 2) {
            const cardOne = currValue[0];
            const cardTwo = currValue[1];

            if (cardOne.faceValue === cardTwo.faceValue) {
              matchMusic.play();
              gameList.value[cardOne.position].matched = true;
              gameList.value[cardTwo.position].matched = true;
            } else {
              setTimeout(() => {
                flipMusic.play();
                gameList.value[cardOne.position].visible = false;
                gameList.value[cardTwo.position].visible = false;
              }, 1000);
            }

            userSelected.value.length = 0;
          }
        },
        {deep: true}
    );

    return {
      gameList,
      flipCard,
      userSelected,
      status,
      startGame,
      playerNew,
      difficulty,
      prepareStart,
      restartImage,
      restartImagePressed,
      prepareRestart,
    };
  },
};
// 1. refactor creategame/createBoard =>
// generateBoard, getBoard should be used only in a component, the js files should be fully encapsulated


// 2. information to the left side (floated)
// 3. add timer
// 4. add score, based on the timer value
// 5. add responsiveness
</script>

<template>
  <h1>Happy cards</h1>
  <h2>{{ status }}</h2>
  <button v-if="playerNew" @click="prepareStart(32)">hard</button>
  <button v-if="playerNew" @click="prepareStart(18)">medium</button>
  <button v-if="playerNew" @click="prepareStart(8)">easy</button>
  <button v-if="playerNew" @click="prepareStart(2)">easiest</button>
  <img
      v-else
      class="button"
      :src="restartImage"
      @click="prepareStart(difficulty)"
  />
  <img class="button" :src="restartImagePressed" @click="prepareRestart()"/>
  <transition-group
      tag="section"
      name="shuffle-animation"
      class="board"
      :class="{
      hard: difficulty === 32,
      medium: difficulty === 18,
      easy: difficulty === 8,
      easiest: difficulty === 2,
    }"
  >
    <Card
        v-for="card in gameList"
        :key="`${card.value}-${card.sort}-${card.size}}`"
        :value="card.value"
        :visible="card.visible"
        :position="card.position"
        :matched="card.matched"
        @select-card="flipCard"
    >
    </Card>
  </transition-group>
</template>

<style>
body {
  background-image: url("assets/images/backgrounds/background-clouds.png");
  background-repeat: no-repeat;
  background-size: auto;
  margin: 0;
  padding: 0;
}

h1,
h2 {
  margin-bottom: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f103a1;
}

.board {
  justify-content: center;
  margin-top: 3em;
  display: grid;
}

.hard {
  grid-template-columns: repeat(8, 80px);
  grid-template-rows: repeat(8, 80px);
  grid-column-gap: 7px;
  grid-row-gap: 7px;
}

.medium {
  grid-template-columns: repeat(6, 80px);
  grid-template-rows: repeat(6, 80px);
  grid-column-gap: 7px;
  grid-row-gap: 7px;
}

.easy {
  grid-template-columns: repeat(4, 80px);
  grid-template-rows: repeat(4, 80px);
  grid-column-gap: 7px;
  grid-row-gap: 7px;
}

.easiest {
  grid-template-columns: repeat(2, 80px);
  grid-template-rows: repeat(2, 80px);
  grid-column-gap: 7px;
  grid-row-gap: 7px;
}

button {
  margin-top: 20px;
}

.button {
  margin-top: 20px;
  height: 30px;
}

.shuffle-animation-move {
  transition: transform 0.7s ease-in;
}

.test {
  width: 100px;
  height: 100px;
}
</style>
