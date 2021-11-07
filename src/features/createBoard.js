import {ref} from 'vue';
const gameList = ref([]);
const cardItems = (function () {
    let result = [];
    for (let i = 1; i <= 32; i++) {
      result.push(i);
    }
    return result;
  })();

  const initBoard = (cardsData)=>{
    cardsData.forEach((item) => {
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
  }

  
  const updateCardPosition = ()=>{
    gameList.value = gameList.value.map((card, index) => {
        return {
          ...card,
          position: index,
        };
      });
  }
  

  
export function createBoard(){
    initBoard(cardItems)
    updateCardPosition()

    return {
        gameList
    }
}