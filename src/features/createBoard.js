import {ref} from 'vue';

const gameList = ref([]);


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
  

  
export function createBoard(cardData, size){
    initBoard(cardData,size)
    updateCardPosition()

    return {
        gameList
    }
}