<template>
  <h1>Memory cards :)</h1>
  <section class="board">
    <Card v-for="(card,i) in 64"
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
