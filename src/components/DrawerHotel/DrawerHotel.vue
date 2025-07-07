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
        <q-carousel animated v-model="slide" infinite ref="carouselRef">
          <q-carousel-slide
            v-for="(imageUrl, index) in drawerHotel.detalhes.images"
            :key="index"
            :name="index"
            :img-src="imageUrl"
          />
          <template v-slot:control>
            <q-carousel-control position="bottom" class="q-gutter-xs">
              <q-btn
                round
                dense
                color="white"
                text-color="primary"
                icon="chevron_left"
                @click="proximaImagem"
              />
              <q-btn
                round
                dense
                color="white"
                text-color="primary"
                icon="chevron_right"
                @click="imagemAnterior"
              />
            </q-carousel-control>
          </template>
        </q-carousel>
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
import { onMounted, ref } from 'vue';
import { QCarousel } from 'quasar';
import { useHoteisStore } from 'src/stores/hoteis-store';
import { type Comodidade, comodidade } from 'src/models/hotel.model';
import RatingComponent from '../Rating/RatingComponent.vue';

const drawerHotel = useHoteisStore().drawerHotel;

const comodidades = Object.values(comodidade);

const comodidadePorId = (id: Comodidade) => comodidades.find((c) => c.id === id);

const slide = ref(0);

// Controles para o carousel
const carouselRef = ref<InstanceType<typeof QCarousel> | null>(null);
const proximaImagem = () => {
  carouselRef.value?.next();
};
const imagemAnterior = () => {
  carouselRef.value?.previous();
};

onMounted(() => {
  carouselRef.value?.next();
});
</script>

<style scoped lang="scss">
h2 {
  font-weight: 600;
  color: $primary-100;
}
.q-carousel {
  height: 250px;
  border-radius: 15px;

  &__control {
    display: flex;
    justify-content: space-between;
  }
}
</style>
