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
  emits:['difficulty-select'],
  setup: function (props, context) {
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
      //
      context.emit("difficulty-select", input);
    };
    const addShadow = (input) => {
      buttons.value[input].isPressed = true;
    };
    const removeShadow = (input) => {
      buttons.value[input].isPressed = false;
    };

    return {
      handleChoice,
      addShadow,
      removeShadow,
      mainMenu,
      buttons,
    };
  },
};
</script>
<template>
  <div class="back"></div>
  <div class="image-wrapper">
    <img class="main-menu" :src="mainMenu" alt="" />
    <!-- here the buttons go -->
  </div>
  <div class="buttons-wrapper">
    <img
      class="btn easiest"
      :class="buttons.easiest.isPressed ? 'pressed' : ''"
      :src="
        buttons.easiest.isPressed
          ? buttons.easiest.pressed
          : buttons.easiest.default
      "
      alt=""
      @click.prevent="handleChoice(2)"
      @mousedown="addShadow('easiest')"
      @mouseup="removeShadow('easiest')"
      @mouseleave="removeShadow('easiest')"
    />
    <img
      class="btn easy"
      :class="buttons.easy.isPressed ? 'pressed' : ''"
      :src="
        buttons.easy.isPressed ? buttons.easy.pressed : buttons.easy.default
      "
      alt=""
      @click.prevent="handleChoice(8)"
      @mousedown="addShadow('easy')"
      @mouseup="removeShadow('easy')"
      @mouseleave="removeShadow('easy')"
    />
    <img
      class="btn not-so-easy"
      :class="buttons.notSoEasy.isPressed ? 'pressed' : ''"
      :src="
        buttons.notSoEasy.isPressed
          ? buttons.notSoEasy.pressed
          : buttons.notSoEasy.default
      "
      alt=""
      @click.prevent="handleChoice(18)"
      @mousedown="addShadow('notSoEasy')"
      @mouseup="removeShadow('notSoEasy')"
      @mouseleave="removeShadow('notSoEasy')"
    />
    <img
      class="btn hard"
      :class="buttons.hard.isPressed ? 'pressed' : ''"
      :src="
        buttons.hard.isPressed ? buttons.hard.pressed : buttons.hard.default
      "
      alt=""
      @click.prevent="handleChoice(32)"
      @mousedown="addShadow('hard')"
      @mouseup="removeShadow('hard')"
      @mouseleave="removeShadow('hard')"
    />
  </div>
</template>
<style scoped>
.image-wrapper {
  margin-top: 3vh;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  
  align-items: center;
}
.back{
  position: absolute;
  top:0;
  left:0;
  background-color: rgba(148, 147, 147, 0.4);
}
.buttons-wrapper {
  width: 100%;
  height: 100%;
  padding-top:10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn {
  position: relative;
  width: 30vh;
  height: 9vh;
  z-index: 1;
  margin-top: 7vh;
}
.pressed {
  -webkit-filter: drop-shadow(3px 3px 3px rgb(70, 69, 69));
  filter: drop-shadow(3px 3px 3px rgb(70, 69, 69));
}

.main-menu {
  position: fixed;
  width: 65vh;
  height: 90vh;
}
</style>
