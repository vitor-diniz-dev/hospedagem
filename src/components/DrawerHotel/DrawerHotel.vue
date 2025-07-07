<template>
  <q-card v-if="drawerHotel">
    <q-card-section>
      <div class="flex justify-between items-center">
        <h1>{{ drawerHotel.name }}</h1>
        <q-btn class="no-padding" flat icon="mdi-close" v-close-popup />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="relative-position">
        <RatingComponent v-model="drawerHotel.stars" />
        <q-img :src="drawerHotel.detalhes.images[0]" />
      </div>
      <h2>Comodidades</h2>
      <div class="row">
        <div v-for="comodidade in drawerHotel.amenities" :key="comodidade" class="col-6 q-py-xs">
          <div class="flex items-center">
            <q-icon
              class="q-mr-xs"
              :name="`mdi-${comodidadePorId(comodidade)?.icone}`"
              size="16px"
            />
            <span>{{ comodidadePorId(comodidade)?.descricao }}</span>
          </div>
        </div>
      </div>
      <h2>Localização</h2>
      <p>{{ drawerHotel.detalhes.fullAddress }}</p>
      <h2>Sobre o {{ drawerHotel.name }}</h2>
      <p>
        {{ drawerHotel.detalhes.description }}
      </p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useHoteisStore } from 'src/stores/hoteis-store';
import RatingComponent from '../Rating/RatingComponent.vue';
import { type Comodidade, comodidade } from 'src/models/hotel.model';

const drawerHotel = useHoteisStore().drawerHotel;

const comodidades = Object.values(comodidade);

const comodidadePorId = (id: Comodidade) => comodidades.find((c) => c.id === id);
</script>

<style scoped lang="scss">
h2 {
  font-weight: 600;
  color: $primary-100;
}
</style>
