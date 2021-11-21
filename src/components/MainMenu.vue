<script>

import easy from "../assets/images/buttons/difficulty/easy/easy.png"
import easyPressed from "../assets/images/buttons/difficulty/easy/easy-pressed.png"
import notSoEasy from "../assets/images/buttons/difficulty/not-so-easy/not-so-easy.png"
import notSoEasyPressed from "../assets/images/buttons/difficulty/not-so-easy/not-so-easy-pressed.png"
import easiest from "../assets/images/buttons/difficulty/easiest/easiest.png"
import easiestPressed from "../assets/images/buttons/difficulty/easiest/easiest-pressed.png"
import hard from "../assets/images/buttons/difficulty/hard/hard.png"
import hardPressed from "../assets/images/buttons/difficulty/hard/hard-pressed.png"
export default {
   name: "Main menu",
   setup: function() {
       const handleChoice = ()=>{

       }

       return {
           handleChoice,
           easy,
           easyPressed,
           notSoEasy,
           notSoEasyPressed,
           easiest,
           easiestPressed,
           hard,hardPressed
       }
   }
}
</script>
<template>
    <div>
        <img :src="easiestPressed" alt="">
    </div>
</template>
<style scoped>
    img{
        width: 13rem;
    }
</style>