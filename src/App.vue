<script>
import { ref, watch, computed } from "vue";
import Card from "./components/Card";
import _ from "lodash";
import { launchConfetti } from "./utilities/confetti";
import { Howl } from "howler";
import {createBoard} from "./features/createBoard.js"
import cardData from "./data/cards.json";
import backgroundMusicPath from "./assets/audio/background1.wav";
import chooseMusicPath from "./assets/audio/choose.mp3";
import flipMusicPath from "./assets/audio/flip.mp3";
import matchMusicPath from "./assets/audio/match.mp3";


export default {
  name: "Memory card game",
  components: {
    Card,
  },
  setup: function () {
    const playerNew= ref(false)
    const {gameList} = createBoard(cardData)
    const userSelected = ref([]);
    const status = computed(() => {
      if (pairs.value === 0) {
        return "player wins";
      } else {
        return `remaining pairs : ${pairs.value}`;
      }
    });
    const pairs = computed(() => {
      const cards = gameList.value.filter(
        (card) => card.matched === false
      ).length;
      return cards / 2;
    });
    const backgroundMusic = new Howl({
      src: [backgroundMusicPath],
      loop: true,
      volume: 0.7,
    });
    const chooseMusic = new Howl({
      src: [chooseMusicPath],
      volume: 0.8,
    });
    const flipMusic = new Howl({
      src: [flipMusicPath],
      volume: 0.8,
    });
    const matchMusic = new Howl({
      src: [matchMusicPath],
      volume: 0.8,
    });
    const restartGame = () => {
      backgroundMusic.stop();
      backgroundMusic.play();
      gameList.value = _.shuffle(gameList.value);

      gameList.value = gameList.value.map((card, index) => {
        return {
          ...card,
          matched: false,
          visible: false,
          position: index,
        };
      });
    };


    const startGame = ()=>{
      playerNew.value = true
      restartGame()
    }

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
        launchConfetti();
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
      gameList,
      flipCard,
      userSelected,
      status,
      restartGame,
      startGame
    };
  },
};

// 1. making the start of the game button
// 2. cut it into different components
// 3. make the board adjustable
// 6. add responsiveness
// 7. add timer
// 8. add score, based on the timer value
</script>

<template>
  <h1>Happy cards</h1>
  <h2>{{ status }}</h2>
  <button v-if="playerNew" @click="restartGame">Restart over</button>
  <button v-else @click="startGame">Start game</button>
  <transition-group tag="section" name="shuffle-animation" class="board">
    <Card
      v-for="card in gameList"
      :key="`card-${card.value}-${card.sort}`"
      :value="String(card.value)"
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
  grid-template-columns: repeat(8, 80px);
  grid-template-rows: repeat(8, 80px);
  grid-column-gap: 7px;
  grid-row-gap: 7px;
}
button {
  margin-top: 20px;
}

.shuffle-animation-move {
  transition: transform 0.7s ease-in;
}

.test {
  width: 100px;
  height:100px;
}


</style>
