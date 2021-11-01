<template>
  <h1>Memory cards :)</h1>
  <section class="board">
    <Card v-for="(card,i) in gameList"
          :key="`card-${i}`"
          :value="card.value"
          :visible="card.visible"
          :position="card.position"
          :matched="card.matched"
          @select-card="flipCard"
    >
    </Card>
  </section>
  <h2>{{ status }}</h2>
  <button @click="restartGame"></button>
</template>

<script>
import _ from 'lodash';
import Card from "./components/Card";
import {ref, watch, computed} from 'vue'

export default {
  name: 'Memory card game',
  components: {
    Card
  },
  setup: function () {
    const gameList = ref([])
    const userSelected = ref([])
    const status = computed(() => {
      if (pairs.value === 0) {
        return 'player wins'
      } else {
        return `remaining pairs : ${pairs.value}`
      }
    })
    const pairs = computed(() => {
      const cards = gameList.value.filter((card) => card.matched === false).length
      return cards / 2
    })

    const randomizeCards = () => {
      gameList.value = _.shuffle(gameList.value)
    }

    const restartGame = () =>{
      randomizeCards()

      gameList.value = gameList.value.map((card,index)=>{
        return {
          ...card,
          matched: false,
          visible:false,
          position:index
        }
      })
    }

    const cardItems = (function(){
      let result = []
      for (let i = 1; i <= 32; i++) {
        result.push(i)
      }
      return result
    }())

    console.log(cardItems)
    cardItems.forEach(item=>{{
      gameList.value.push({
        value:item,
        visible:true,
        position: null,
        matched:false
      })


      gameList.value.push({
        value:item,
        visible:true,
        position: null,
        matched:false
      })
    }})

      gameList.value = gameList.value.map((card,index)=>{
        return{
          ...card,
          position: index
        }
      })

    const flipCard = (payload) => {
      gameList.value[payload.position].visible = true
      if (userSelected.value[0]) {
        userSelected.value[1] = payload
      } else {
        userSelected.value[0] = payload
      }
    }

    watch(userSelected, (currValue) => {
      if (currValue.length === 2) {

        const cardOne = currValue[0]
        const cardTwo = currValue[1]

        if (cardOne.faceValue === cardTwo.faceValue) {
          gameList.value[cardOne.position].matched = true
          gameList.value[cardTwo.position].matched = true
        } else {
          gameList.value[cardOne.position].visible = false
          gameList.value[cardTwo.position].visible = false
        }


        userSelected.value.length = 0
      }
    }, {deep: true})

    return {
      gameList,
      flipCard,
      userSelected,
      status,
      randomizeCards,
      restartGame
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


.board {
  justify-content: center;
  margin-top: 5em;
  display: grid;
  grid-template-columns: repeat(8, 70px);
  grid-template-rows: repeat(8, 70px);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}
</style>
