<script>
export default {
   name: "Main menu",
   setup: function() {
       const handleChoice = (input)=>{
           console.log(input)
       }

       return {
           handleChoice
       }
   }
}
</script>
<template>
    <div>
        <button @click="handleChoice(1)">1</button>
        <button @click="handleChoice(2)">2</button>
        <button @click="handleChoice(3)">3</button>
        <button @click="handleChoice(4)">4</button>
    </div>
</template>
<style scoped>
    
</style>