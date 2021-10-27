<template>
  <div class="card">{{value}}</div>
</template>

<script>
export default {
  name: "Card",
  props:{
    value:{
      type: String,
      default:''
    }
  }
}
</script>

<style scoped>

</style>