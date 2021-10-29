<template>
  <h1>Memory cards :)</h1>
  <section class="board">
    <Card v-for="(card,i) in gameList"
          :key="`card-${i}`"
          :value="card.value"
          :visible="card.visible"
          :position="card.position"
          @select-card="flipCard"
    >
    </Card>
  </section>
</template>

<script>
import Card from "./components/Card";
import {ref} from 'vue'

export default {
  name: 'Memory card game',
  components: {
    Card
  },
  setup() {
    const gameList = ref([])
    for (let i = 0; i < 64; i++) {
      gameList.value.push({
        value: i,
        visible: false,
        position: i
      })
    }
    const flipCard = (payload) => {
      gameList.value[payload.position].visible = true
    }

    return {
      gameList,
      flipCard
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
