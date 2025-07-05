<template>
  <div class="q-pa-lg">
    <q-card class="card-busca">
      <q-tabs
        v-model="tabAtual"
        inline-label
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="left"
        narrow-indicator
        no-caps
      >
        <q-tab name="aereo" label="Aéreo" icon="mdi-airplane" disable />
        <q-tab name="hotel" label="Hotel" icon="mdi-bed" />
        <q-tab name="carro" label="Carro" icon="mdi-car" disable />
        <q-tab name="onibus" label="Ônibus" icon="mdi-bus" disable />
      </q-tabs>

      <q-tab-panels v-model="tabAtual" animated>
        <q-tab-panel name="hotel">
          <form @submit.prevent="buscarHotel">
            <div class="flex justify-between f-hotel">
              <q-input
                standout
                outlined
                v-model="destino"
                placeholder="Destino"
                class="f-hotel__input"
              />
              <q-btn
                dense
                rounded
                size="md"
                color="primary"
                icon="mdi-magnify"
                label="Buscar Hotel"
                no-caps
                type="submit"
                class="f-hotel__button"
              />
            </div>
          </form>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { buscarCidades } from 'src/services/cidade-service';
import { buscarHoteisPorCidade } from 'src/services/hoteis-service';

const tabAtual = ref('hotel');
const destino = ref('');
const buscarHotel = () => buscarHoteisPorCidade(destino.value);

// Apenas busca cidades se o destino possuir 3 ou mais caracteres
watch(destino, (val) => {
  if (val.length >= 3) {
    buscarCidades(val);
  }
});
</script>

<style scoped lang="scss">
.card-busca {
  padding-top: 16px;
  border-radius: 12px;

  .f-hotel {
    background-color: #f5f5f5;
    padding: 12px;
    border-radius: 12px;

    &__button {
      border-radius: 12px;
      padding: 4px 20px;
    }
    &__input {
      width: 500px;
    }
  }
}
</style>
