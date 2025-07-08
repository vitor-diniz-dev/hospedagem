<template>
  <div class="main-container">
    <router-view />
  </div>
  <BannerComponent v-if="bannerStore.aberto" />
</template>

<script setup lang="ts">
import BannerComponent from './components/Banner/BannerComponent.vue';
import { useBannerStore } from './stores/banner-store';

const bannerStore = useBannerStore();
</script>

<style lang="scss">
.main-container {
  max-width: 1200px;
  width: 100%;
}
</style>
