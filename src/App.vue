<script>
import { ref, watch } from "vue";
import Card from "./components/Card";
import MainMenu from "./components/MainMenu.vue";
import { confettiStart, confettiStop } from "./utilities/confetti";
import { getGameList } from "./features/createBoard.js";
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
    MainMenu,
  },
  emits: ["difficulty-select"],
  setup: function () {
    const difficulty = ref(0);
    let gameList = ref(getGameList());
    let { playerNew, startGame, pairs, status, resetGame } =
      createGame(gameList);
    const userSelected = ref([]);

    const prepareStart = (input) => {
      if (playerNew.value !== false) {
        backgroundMusic.stop();
        backgroundMusic.play();
      }
      difficulty.value = input;
      startGame(difficulty.value, gameList.value.length == 0);
      confettiStop();
    };

    const backToMenu = () => {
      resetGame();
      playerNew.value = true;
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
      if (currValue === 0 && gameList.value.length > 0) {
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
      { deep: true }
    );

    return {
      flipCard,
      backToMenu,
      prepareStart,
      gameList,
      status,
      playerNew,
      difficulty,
      restartImage,
      restartImagePressed,
    };
  },
};
//current tasks
// fix the music reset #1
// 1. add blurred background to the app when main menu is active + parallax
// 2. information to the left side (floated)
// 3. fix the button to restart
// 4. fix the button to shuffle

// future improvements
// 1. add timer (timer will be from 0 to inf), the quantity of open/closes will be limited (by experiments)
// 2. add score, based on the timer value (i have to think about how Im gonna count points)
// 3. add responsiveness
</script>

<template>
  <h2>{{ status }}</h2>
  <MainMenu
    v-if="playerNew"
    @difficulty-select="
      (input) => {
        prepareStart(input);
      }
    "
  ></MainMenu>
  <div v-else>
    <img class="button" :src="restartImage" @click="prepareStart(difficulty)" />
    <img class="button" :src="restartImagePressed" @click="backToMenu()" />
    <div class="center">
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
          :isSmall="difficulty === 32"
        >
        </Card>
      </transition-group>
    </div>
  </div>
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
.center {
  display: flex;
  justify-content: center;
}
.board {
  justify-content: center;
  margin-top: 3em;
  display: grid;
}

.hard {
  grid-template-columns: repeat(8, 60px);
  grid-template-rows: repeat(8, 60px);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
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
