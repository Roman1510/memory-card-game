import { ref, computed } from "vue";
import _ from "lodash";
import { generateBoard } from "./createBoard";

export default function createGame(gameList) {
  const playerNew = ref(true);

  const startGame = (size) => {

    generateBoard(size)
    playerNew.value = false;
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

  const restartGame = ()=>{

  }

  const pairs = computed(() => {
    const cards = gameList.value.filter(
      (card) => card.matched === false
    ).length;
    return cards / 2;
  });

  const status = computed(() => {
    if (pairs.value === 0 && gameList.value.length > 0) {
      return "player wins";
    } else if (pairs.value !== 0) {
      return `remaining pairs : ${pairs.value}`;
    }
    return "";
  });

  return {
    playerNew,
    startGame,
    restartGame,
    pairs,
    status,
  };
}
