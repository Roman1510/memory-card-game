<template>
  <div class="card" @click="selectCard">
    <div v-if="visible" class="card-face is-front">
      <div>{{ value.value }}</div>
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
    position: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  setup(props,context) {
    const selectCard = () =>{
      context.emit('select-card',{
        position: props.position
      })
    }
    return {
      selectCard
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