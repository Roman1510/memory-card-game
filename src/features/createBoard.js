import { ref } from "vue";
import _ from "lodash";

const gameList = ref([]);
const cardsDataTemp = ref([]);
const initBoard = (cardsData, size) => {
  const cardDataShuffled = _.shuffle(cardsData);
  cardDataShuffled.forEach((item) => {
    {
      gameList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
        sort: 1,
        size: size || 64,
      });

      gameList.value.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
        sort: 2,
        size: size || 64,
      });
    }
  });
};

const changeSize = (size) => {
  console.log(size)
  console.log(gameList.value)
};

const updateCardPosition = () => {
  gameList.value = gameList.value.map((card, index) => {
    return {
      ...card,
      position: index,
    };
  });
};

export function createBoard(cardData) {
  gameList.value=[]
  initBoard(cardData);
  updateCardPosition();
  cardsDataTemp.value = JSON.parse(JSON.stringify(cardData));
  return {
    gameList,
    changeSize,
  };
}
