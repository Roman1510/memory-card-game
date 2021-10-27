<template>
  <h1>Memory cards :)</h1>
  <section class="board">
    <Card v-for="(card,i) in cardList"
          :key="`card-${i}`"
          :value="card">{card}</Card>
  </section>
</template>

<script>
import Card from "./components/Card";

export default {
  name: 'Memory card game',
  components: {
    Card
  },
  data() {
    return {
      cardList: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16]
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
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(8, 50px);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
}

.board .card {
  padding: 2px;
  border: 2px solid brown;
  border-radius: 50%;
}
</style>
