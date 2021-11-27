<script>
import { computed } from "vue";
export default {
  name: "Card",
  props: {
    position: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    matched: {
      type: Boolean,
      required: true,
      default: false,
    },
    isSmall: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  setup(props, context) {
    const getImgUrl = (pic) => {
      return require("../assets/images/cards/" + pic + ".png");
    };

    const flippedStyles = computed(() => {
      return props.visible;
    });

    const smallIcon = computed(() => {
      return props.isSmall;
    });

    const smallBackground = () => {
      console.log("that was used");
      return {
        "background-size": "60px",
      };
    };

    const smallSize = () => {
      return {
        width: "54px", //80/72 = 0.9, that's why 60* 0.9 is 54 (based on the App.vue)
        height: "54px",
      };
    };

    const selectCard = () => {
      context.emit("select-card", {
        position: props.position,
        faceValue: props.value,
      });
    };

    return {
      selectCard,
      getImgUrl,
      flippedStyles,
      smallIcon,
      smallBackground,
      smallSize,
    };
  },
};
</script>
<template>
  <div
    class="card"
    @click="selectCard"
    :class="{ 'icon-checkmark': matched, 'is-flipped': flippedStyles }"
  >
    <div
      v-if="visible"
      :style="{
        width: '54px',
        height: '54px',
      }"
      class="card-face is-front"
      :class="{
        'image-shake': !matched && flippedStyles,
      }"
    >
      <img
        :src="getImgUrl(value)"
        :alt="value"
        :class="{
          'small-size': smallIcon,
        }"
      />
    </div>
    <div
      v-else
      class="card-face is-back"
      :class="{ 'small-background': smallIcon }"
    ></div>
  </div>
</template>
<style scoped>
.small-size {
  width: 54px !important;
  height: 54px !important;
}
.small-background {
  background-size: 60px !important;
}
.card {
  border: 1px solid #253f84;
  border-radius: 50%;
  position: relative;
  transition: 0.3s ease;
  transform-style: preserve-3d;
  cursor: pointer;
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

.card-face.is-front img {
  height: 72px;
  width: 72px;
  transform: rotateY(180deg);
}

.card-face.is-back {
  background-image: url("../assets/images/card-backs/cardback1.png");
  background-size: 80px;
  color: white;
  transform: rotateY(180deg);
}

.icon-checkmark {
  border: #e5e200 solid 5px;
  animation: glow 1s alternate-reverse;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.image-shake {
  animation: shake 0.7s infinite;
  animation-delay: 0.3s;
}

@keyframes glow {
  from {
    box-shadow: 0 0 10px -10px #aef4af;
  }
  to {
    box-shadow: 0 0 10px 10px #aef4af;
  }
}
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
