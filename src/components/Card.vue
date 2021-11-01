<template>
  <div class="card" @click="selectCard" :class="{'icon-checkmark': matched, 'is-flipped':flippedStyles}" >
    <div v-if="visible" class="card-face is-front">
      <img :src="`/images/${value}.png`" :alt="value">
    </div>
    <div v-else class="card-face is-back">
    </div>
  </div>
</template>

<script>

import {computed} from "vue";

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

    const flippedStyles = computed(() =>{
      return props.visible
    })

    const selectCard = () => {
      context.emit('select-card', {
        position: props.position,
        faceValue: props.value
      })
    }
    return {
      selectCard,
      flippedStyles
    }
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #253f84;
  border-radius: 50%;
  position: relative;
  transition: 0.3s ease;
  transform-style: preserve-3d;
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
  height: 72px;
  width: 72px;
  transform: rotateY(180deg);
}

.card-face.is-back {
  background-image: url("/images/enotik.png");
  background-size: 80px;
  color: white;
  transform: rotateY(180deg);
}

.icon-checkmark{
  border: brown solid 5px;
}

.card.is-flipped{
  transform: rotateY(180deg);
}

</style>