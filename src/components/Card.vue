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
      return {
        front: require("../assets/images/cards/" + pic + ".png"),
        back: require("../assets/images/card-backs/cardback1.png"),
      };
    };

    const flippedStyles = computed(() => {
      return props.visible;
    });

    const smallIcon = computed(() => {
      return props.isSmall;
    });

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
    };
  },
};
//the implementation of img for both cases doesn't make any sense, should refactor this one...
</script>
<template>
  <div
    class="card-wrapper"
    @click="selectCard"
    :class="{ 'icon-checkmark': matched, 'is-flipped': visible }"
  >
    <div
      v-if="visible"
      class="card-face is-front"
      :class="{
        'image-shake': !matched && flippedStyles,
      }"
    >
      <img
        :src="getImgUrl(value).front"
        :alt="value"
        :class="{ 'smaller-image': smallIcon, 'default-image': !smallIcon }"
      />
    </div>
    <div v-else class="card-face is-back">
      <img
        :src="getImgUrl(value).back"
        :alt="value"
        :class="{ 'smaller-image': smallIcon, 'default-image': !smallIcon }"
      />
    </div>
  </div>
</template>
<style scoped>
.card-wrapper {
  /* placeholder for the card */
  border: 1px solid #253f84;
  border-radius: 50%;
  position: relative;
  transition: 0.3s ease;
  transform-style: preserve-3d;
  cursor: pointer;
}
.card-wrapper > .card-face {
  /* this is needed to center the card face inside a wrapper */
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}
.card-face {
  /* this is needed for correct display of the card-back when not clicked */
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
/* .card-face img {
  transform: rotateY(180deg);
} */
.default-image {
  height: 72px;
  width: 72px;
}
.smaller-image {
  height: 54px;
  width: 54px;
}

.icon-checkmark {
  border: #e5e200 solid 5px;
  animation: glow 1s alternate-reverse;
}

.card-wrapper.is-flipped {
  transform: rotateY(180deg);
}

.image-shake {
  animation: shake 0.5s infinite;
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
