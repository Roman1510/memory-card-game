import {ref, computed} from "vue";
import _ from "lodash";
import {generateBoard} from "./createBoard";

export default function createGame(gameList) {
    const playerNew = ref(true);

    const startGame = (size,isRestart) => {
        if(isRestart){
            gameList.value = generateBoard(size) //create new board if new game, else I leaave as is
        }
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

    const resetGame = () => {
        //this is the logic to return to the main menu
        gameList.value.splice(0)
        playerNew.value = true;
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
        resetGame,
        pairs,
        status,
    };
}
