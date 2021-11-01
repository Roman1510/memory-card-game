<template>
  <div class="card" @click="selectCard" :class="{'icon-checkmark': matched}">
    <div v-if="visible" class="card-face is-front">
      <img :src="`/images/${value}.png`" :alt="value">
    </div>
    <div v-else class="card-face is-back">
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
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    matched: {
      type: Boolean,
      required: true,
      default:false
    }
  },
  setup(props, context) {
    const selectCard = () => {
      context.emit('select-card', {
        position: props.position,
        faceValue: props.value
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
  border: 1px solid #253f84;
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

.card-face.is-front img{
  height: 70px;
  width: 70px;
}

.card-face.is-back {
  background-image: url("/images/enotik.png");
  background-size: 80px;
  color: white;
}

.icon-checkmark{
  border: brown solid 5px;
}

</style>