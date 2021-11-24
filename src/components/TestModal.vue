<template lang="">
  <div>
    <button id="show-modal" @click="showModal = true">Show Modal</button>
    <Modal v-if="showModal" @close="showModal = false">
     <template v-slot:title> Our Title </template>
      <template> Our Content </template>
      <template> Our Comments </template>
    </Modal>
  </div>
</template>
<script>
import Modal from "./Modal.vue";
export default {
  components: {
    Modal
  },
  data() {
    return {
      showModal: false,
    };
  },
};
</script>
<style scoped>
</style>
