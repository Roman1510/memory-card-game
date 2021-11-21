<script>
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
    const handleChoice = () => {};

    const mainMenuStyle = {
      backgroundImage: `url(${mainMenu})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      height: 200,
      width: 1200,
      display: "block",
      position: "relative",
    };

    return {
      handleChoice,
      easy,
      easyPressed,
      notSoEasy,
      notSoEasyPressed,
      easiest,
      easiestPressed,
      hard,
      hardPressed,
      mainMenu,
      mainMenuStyle,
    };
  },
};
</script>
<template>
    <div>
        <img class="main-menu" :src="mainMenu" alt="">
        <img class="btn easiest" :src="easiest" alt="">
        <img class="btn easy" :src="easy" alt="">
        <img class="btn not-so-easy" :src="notSoEasy" alt="">
        <img class="btn hard" :src="hard" alt="">
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
.easy {
    top: 20vh;
}
.easiest {
    top: 35vh;
}
.not-so-easy {
    top: 50vh;
}
.hard {
    top: 65vh;
}
.main-menu{
    position: absolute;
    width:  65vh;
    height: 90vh;
}
</style>
