<script>
import _ from "lodash";
import Card from "./components/Card";
import { ref, watch, computed } from "vue";
import { launchConfetti } from "./utilities/confetti";
import {Howl} from 'howler';
import backgroundMusic from './audio/background1.wav'
export default {
  name: "Memory card game",
  components: {
    Card,
  },
  setup: function () {

    const gameList = ref([]);
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


    var sound = new Howl({
      src: [backgroundMusic],
      loop:true,
      onload(){
        console.log('has been loaded')
      },
      onloaderror(e,msg){
        console.log('some error happened: '+e+" "+msg)
      }
    });
    const restartGame = () => {
      sound.stop()
      sound.play()
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

    const cardItems = (function () {
      let result = [];
      for (let i = 1; i <= 32; i++) {
        result.push(i);
      }
      return result;
    })();

    cardItems.forEach((item) => {
      {
        gameList.value.push({
          value: item,
          visible: false,
          position: null,
          matched: false,
          sort: 1,
        });

        gameList.value.push({
          value: item,
          visible: false,
          position: null,
          matched: false,
          sort: 2,
        });
      }
    });

    gameList.value = gameList.value.map((card, index) => {
      return {
        ...card,
        position: index,
      };
    });

    const flipCard = (payload) => {
      gameList.value[payload.position].visible = true;
      if (userSelected.value[0]) {
        if (
          userSelected.value[0].position === payload.position &&
          userSelected.value[0].faceValue === payload.faceValue
        ) {
          return;
        } else {
          userSelected.value[1] = payload;
        }
      } else {
        userSelected.value[0] = payload;
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
            gameList.value[cardOne.position].matched = true;
            gameList.value[cardTwo.position].matched = true;
          } else {
            setTimeout(() => {
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
      restartGame
    };
  },
};

// 1. making the start of the game button
// 2. cut it into different components
// 3. make the board adjustable
// 4. add sounds, and background music
// 5. add flickering animation when it's complete
// 6. add responsiveness
// 7. add timer
// 8. add score, based on the timer value
</script>

<template>
  <h1>Memory cards :)</h1>
  <h2>{{ status }}</h2>
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

  <button @click="restartGame">Start over!</button>
</template>

<style>
body {
  background-image: url("/images/background-wood.jpg");
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
</style>
