<template>
  <div class="card">
    <div v-if="visible" class="card-face is-front">
      <div>{{ value }}</div>
    </div>
    <div v-else class="card-face is-back">
      back
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  setup() {
    const visible = true;

    return {
      visible
    }
  }
}
</script>

<style scoped>
.card {
  border: 2px solid #253f84;
  border-radius: 50%;
  position: relative;
}
.card div {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.card-face {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  position: absolute;
}

.card-face.is-front {
  background-color: red;
  color: white;
}

.card-face.is-back {
  background-color: black;
  color: white;
}
</style>