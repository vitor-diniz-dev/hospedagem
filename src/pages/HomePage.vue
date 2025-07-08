<template>
  <PainelBusca />
  <div class="flex column justify-center container-lista">
    <FiltrosListaHoteis />
    <ul v-if="hoteisStore.hoteis.length" class="container-lista__lista">
      <li v-for="(hotel, index) in hoteisStore.hoteis" :key="index">
        <CardHotel :hotel="hotel" />
      </li>
    </ul>
    <q-pagination
      v-if="hoteisStore.hoteis.length"
      v-model="hoteisStore.filtros.paginaAtual"
      :max="hoteisStore.filtros.totalPaginas"
      direction-links
      @update:model-value="hoteisStore.buscarHoteis"
    />
  </div>

  <q-dialog v-model="modal" persistent>
    <DrawerHotel />
  </q-dialog>
</template>

<script setup lang="ts">
import PainelBusca from '../components/PainelBusca/PainelBusca.vue';
import DrawerHotel from 'src/components/DrawerHotel/DrawerHotel.vue';
import CardHotel from '../components/CardHotel/CardHotel.vue';
import FiltrosListaHoteis from 'src/components/FiltrosListaHoteis/FiltrosListaHoteis.vue';
import { modalHotel } from 'src/services/modal-service';
import { useHoteisStore } from 'src/stores/hoteis-store';

const modal = modalHotel;

const hoteisStore = useHoteisStore();
</script>

<style scoped lang="scss">
.container-lista {
  position: relative;
  width: 100%;
  min-height: 900px;
  background-color: #f5f5f5;
  border-radius: 36px;
  margin-top: 40px;
  padding-bottom: 16px;
  align-items: center;
  justify-content: space-between;

  &__lista {
    width: 100%;
    padding: 40px;
    padding-bottom: 20px;
    list-style: none;

    li:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}
</style>
<style lang="scss">
.q-field .q-field__marginal {
  padding: 0 !important;
}
</style>
