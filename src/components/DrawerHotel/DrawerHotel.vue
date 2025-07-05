<template>
  <q-card>
    <q-card-section>
      <div class="flex justify-between items-center">
        <h1>Copacabana Palace</h1>
        <q-btn flat icon="mdi-close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="relative-position">
        <RatingComponent />
        <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" />
      </div>
      <h2>Comodidades</h2>
      <div class="row">
        <div class="col">
          <div class="flex items-center">
            <q-icon class="q-mr-xs" name="mdi-wifi" size="16px" />
            <span>Wi-Fi</span>
          </div>
        </div>
        <div class="col">
          <div class="flex items-center">
            <q-icon class="q-mr-xs" name="mdi-wifi" size="16px" />
            <span>Wi-Fi</span>
          </div>
        </div>
      </div>
      <h2>Localização</h2>
      <p>Rua Copacabana, 123</p>
      <h2>Sobre o Hotel Atlantico</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et porttitor eros. Sed non
        semper felis. Ut sed interdum velit, et condimentum leo. Proin leo diam, elementum ut libero
        pulvinar, cursus sagittis justo. Morbi interdum nisi ac risus ultricies, ac suscipit lacus
        aliquam. Mauris ut tortor ac elit vehicula tempor a tempor mi. Nulla et orci libero. In
        egestas malesuada odio sodales efficitur. Aliquam eget aliquet massa.
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import RatingComponent from '../Rating/RatingComponent.vue';
</script>

<style scoped lang="scss">
h2 {
  font-weight: 600;
  color: $primary-100;
}
</style>
