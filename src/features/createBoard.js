import { ref } from "vue";
import _ from "lodash";
import fullCardsList from "../data/cards.json";
const gameList = ref([]);
const cardDataShuffled = ref(_.shuffle(fullCardsList));


const initBoard = (size) => {
  console.log(size)
  if(size){
    cardDataShuffled.value = cardDataShuffled.value.slice(0,size)
  }
  cardDataShuffled.value = cardDataShuffled.value.slice(0,16)
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

const resize =  (size)=>{
  gameList.value.splice(0)
  initBoard(size);
  updateCardPosition();
}

const updateCardPosition = () => {
  gameList.value = gameList.value.map((card, index) => {
    return {
      ...card,
      position: index,
    };
  });
}; 

export function createBoard() {
  gameList.value.splice(0)
  initBoard();
  updateCardPosition();
  return {
    gameList,
    resize
  };
}
