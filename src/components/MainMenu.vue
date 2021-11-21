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
        easiest: {default:easiest,pressed:easiestPressed, isPressed: false},
        easy: {default:easy,pressed:easyPressed, isPressed: false},
        notSoEasy: {default:notSoEasy,pressed:notSoEasyPressed, isPressed: false},
        hard:{default:hard,pressed:hardPressed, isPressed: false}
    })
    
    const handleChoice = (input) => {
      console.log(input, "handleChoice called");
    };
    const addShadow = (input) => {
      console.log(input, "addShadow called");
      buttons.value[input].isPressed=true
    };
    const removeShadow = (input) => {
      console.log(input, "removeShadow called");
      buttons.value[input].isPressed=false
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
      :src="buttons.easiest.default"
      alt=""
      @click="handleChoice(1)"
      @mousedown="addShadow('easiest')"
      @mouseup="removeShadow('easiest')"
    />
    <img
      class="btn easy"
      :src="buttons.easy.default"
      alt=""
      @click="handleChoice(2)"
      @mousedown="addShadow('easy')"
      @mouseup="removeShadow('easy')"
    />
    <img
      class="btn not-so-easy"
      :src="buttons.notSoEasy.default"
      alt=""
      @click="handleChoice(3)"
      @mousedown="addShadow('not-so-easy')"
      @mouseup="removeShadow('not-so-easy')"
    />
    <img
      class="btn hard"
      :src="buttons.hard.default"
      alt=""
      @click="handleChoice(4)"
      @mousedown="addShadow('hard')"
      @mouseup="removeShadow('hard')"
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
