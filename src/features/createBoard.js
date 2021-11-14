import { ref } from "vue";
import _ from "lodash";
import fullCardsList from "../data/cards.json";
const gameList = ref([]);
const cardDataShuffled = ref(_.shuffle(fullCardsList));

const fillBoard = (size) => {
  if (size) {
    cardDataShuffled.value = cardDataShuffled.value.slice(0, size);
  }
  cardDataShuffled.value = cardDataShuffled.value.slice(0, 32);
  cardDataShuffled.value.forEach((item) => {
    {
      gameList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
        sort: 1,
        size: size || 32,
      });

      gameList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
        sort: 2,
        size: size || 32,
      });
    }
  });
};

export const generateBoard = (size) => {
  if (size === 0) {
    gameList.value.splice(0);
    updateCardPosition();
    return gameList
  }
  gameList.value.splice(0);
  fillBoard(size);
  updateCardPosition();
  return gameList
};

const updateCardPosition = () => {
  gameList.value = gameList.value.map((card, index) => {
    return {
      ...card,
      position: index,
    };
  });
};

export function createBoard() {
  return gameList
}
