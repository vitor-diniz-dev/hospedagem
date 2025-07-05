<template>
  <PainelBusca />
  <div class="flex column justify-center container-lista">
    <FiltrosListaHoteis />
    <div class="container-lista__lista">
      <CardHotel />
    </div>
    <q-pagination v-model="paginaAtual" max="5" direction-links />
  </div>

  <q-dialog v-model="modal" persistent>
    <DrawerHotel />
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PainelBusca from '../components/PainelBusca/PainelBusca.vue';
import DrawerHotel from 'src/components/DrawerHotel/DrawerHotel.vue';
import CardHotel from '../components/CardHotel/CardHotel.vue';
import FiltrosListaHoteis from 'src/components/FiltrosListaHoteis/FiltrosListaHoteis.vue';
import { modalHotel } from 'src/services/modal-service';

const modal = modalHotel;

const paginaAtual = ref(1);
</script>

<style scoped lang="scss">
.container-lista {
  position: relative;
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 36px;
  margin-top: 40px;
  padding-bottom: 16px;
  align-items: center;

  &__lista {
    width: 100%;
    padding: 40px;
    padding-bottom: 20px;
  }
}
</style>
<style lang="scss">
.q-field .q-field__marginal {
  padding: 0 !important;
}
</style>
