<script>
import { ref } from "@vue/reactivity";
import mainMenu from "../assets/images/menu/main-menu.png";
import easy from "../assets/images/buttons/difficulty/easy/easy.png";
import easyPressed from "../assets/images/buttons/difficulty/easy/easy-pressed.png";
import notSoEasy from "../assets/images/buttons/difficulty/not-so-easy/not-so-easy.png";
import notSoEasyPressed from "../assets/images/buttons/difficulty/not-so-easy/not-so-easy-pressed.png";
import easiest from "../assets/images/buttons/difficulty/easiest/easiest.png";
import easiestPressed from "../assets/images/buttons/difficulty/easiest/easiest-pressed.png";
import hard from "../assets/images/buttons/difficulty/hard/hard.png";
import hardPressed from "../assets/images/buttons/difficulty/hard/hard-pressed.png";
export default {
  name: "Main menu",
  setup: function () {
    const buttons = ref({
      easiest: { default: easiest, pressed: easiestPressed, isPressed: false },
      easy: { default: easy, pressed: easyPressed, isPressed: false },
      notSoEasy: {
        default: notSoEasy,
        pressed: notSoEasyPressed,
        isPressed: false,
      },
      hard: { default: hard, pressed: hardPressed, isPressed: false },
    });

    const handleChoice = (input) => {
      console.log(input, "handleChoice called");
    };
    const addShadow = (input) => {
      console.log(buttons.value);
      buttons.value[input].isPressed = true;
    };
    const removeShadow = (input) => {
      console.log(input, "removeShadow called");
      buttons.value[input].isPressed = false;
    };
    const changeImage = (input) => {
      console.log(input, "changeImage called");
    };

    return {
      handleChoice,
      addShadow,
      removeShadow,
      changeImage,
      mainMenu,
      buttons
    };
  },
};
</script>
<template>
  <div>
    <img class="main-menu" :src="mainMenu" alt="" />
    <!-- here the buttons go -->
    <img
      class="btn easiest"
      :class="buttons.easiest.isPressed ? 'pressed': ''"
      :src="
        buttons.easiest.isPressed
          ? buttons.easiest.pressed
          : buttons.easiest.default
      "
      alt=""
      @click.prevent="handleChoice(1)"
      @mousedown="addShadow('easiest')"
      @mouseup="removeShadow('easiest')"
      @mouseleave="removeShadow('easiest')"
    />
    <img
      class="btn easy"
      :class="buttons.easy.isPressed ? 'pressed': ''"
      :src="
        buttons.easy.isPressed ? buttons.easy.pressed : buttons.easy.default
      "
      alt=""
      @click.prevent="handleChoice(2)"
      @mousedown="addShadow('easy')"
      @mouseup="removeShadow('easy')"
      @mouseleave="removeShadow('easy')"
    />
    <img
      class="btn not-so-easy"
      :class="buttons.notSoEasy.isPressed ? 'pressed': ''"
      :src="
        buttons.notSoEasy.isPressed
          ? buttons.notSoEasy.pressed
          : buttons.notSoEasy.default
      "
      alt=""
      @click.prevent="handleChoice(3)"
      @mousedown="addShadow('notSoEasy')"
      @mouseup="removeShadow('notSoEasy')"
      @mouseleave="removeShadow('notSoEasy')"
    />
    <img
      class="btn hard"
      :class="buttons.hard.isPressed ? 'pressed': ''"
      :src="
        buttons.hard.isPressed ? buttons.hard.pressed : buttons.hard.default
      "
      alt=""
      @click.prevent="handleChoice(4)"
      @mousedown="addShadow('hard')"
      @mouseup="removeShadow('hard')"
      @mouseleave="removeShadow('hard')"
    />
  </div>
</template>
<style scoped>
.btn {
  position: absolute;
  width: 30vh;
  height: 9vh;
  z-index: 1;
  left: 18vh;
}
.pressed {
  -webkit-filter: drop-shadow(3px 3px 3px rgb(70, 69, 69));
  filter: drop-shadow(3px 3px 3px rgb(70, 69, 69));
}
.easiest {
  top: 20vh;
}
.easy {
  top: 35vh;
}
.not-so-easy {
  top: 50vh;
}
.hard {
  top: 65vh;
}
.main-menu {
  position: absolute;
  width: 65vh;
  height: 90vh;
}
</style>
