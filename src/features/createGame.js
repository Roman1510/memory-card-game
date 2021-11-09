import { ref, computed } from "vue";
import _ from "lodash";

export default function createGame(gameList,backgroundMusic) {
  const playerNew = ref(true);

  const startGame = () => {
    playerNew.value = false;
    restartGame();
  };
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

  const pairs = computed(() => {
    const cards = gameList.value.filter(
      (card) => card.matched === false
    ).length;
    return cards / 2;
  });


  const status = computed(() => {
    if (pairs.value === 0) {
      return "player wins";
    } else {
      return `remaining pairs : ${pairs.value}`;
    }
  });


  return {
      playerNew,
      startGame,
      restartGame,
      pairs,
      status
  }

}
