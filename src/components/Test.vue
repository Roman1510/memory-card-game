<script>
import MainMenu from "./MainMenu.vue";
export default {
  name: "test",
  components: {
    MainMenu,
  },
  emits: {
    difficulty: {
      type: Number,
    },
  },
  setup: function () {

      const handleDifficulty = (e)=>{
          console.log(e)
      }

    return {
      MainMenu,
      handleDifficulty
    };
  },
};
</script>

<template lang="">
  <div class="shit">
    <MainMenu @difficulty="handleDifficulty"></MainMenu>
  </div>
</template>

<style lang=""></style>
