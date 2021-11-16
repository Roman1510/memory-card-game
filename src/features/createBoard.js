import _ from "lodash";
import fullCardsList from "../data/cards.json";
let gameList = [];
let cardDataShuffled = _.shuffle(fullCardsList);

const fillBoard = (size) => {

  cardDataShuffled = _.shuffle(fullCardsList).slice(0, size);
  cardDataShuffled.forEach((item) => {
    {
      gameList.push({
        value: item,
        visible: false,
        position: null,
        matched: false,
        sort: 1,
        size: size || 32,
      });

      gameList.push({
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
const updateCardPosition = () => {
  gameList = gameList.map((card, index) => {
    return {
      ...card,
      position: index,
    };
  });
};

export const generateBoard = (size) => {
  if (size === 0) {
    gameList.splice(0);
    updateCardPosition();
    return gameList
  }
  gameList.splice(0);
  fillBoard(size);
  updateCardPosition();
  return gameList
};

export const getGameList = () =>{
  return gameList
}
