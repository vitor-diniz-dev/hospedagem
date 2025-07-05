<template>
  <div class="rating">
    <q-rating v-model="rating" size="16px" color="primary" readonly />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const rating = ref(4);
</script>

<style scoped lang="scss">
.rating {
  top: 10px;
  left: 10px;
  position: absolute;
  z-index: 1;
  background-color: white;
  border-radius: 20px;
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
