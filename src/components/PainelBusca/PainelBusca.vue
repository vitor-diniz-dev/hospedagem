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
              <q-select
                class="f-hotel__select"
                v-model="destino"
                outlined
                use-input
                hide-selected
                fill-input
                hide-dropdown-icon
                input-debounce="500"
                placeholder="Destino"
                emit-value
                map-options
                :options="options"
                option-value="placeId"
                :option-label="optionLabel"
                @filter="buscaCidades"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"> Nenhuma cidade encontrada </q-item-section>
                  </q-item>
                </template>
              </q-select>
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
import { ref } from 'vue';
import { buscarCidades } from 'src/services/cidade-service';
import { useHoteisStore } from 'src/stores/hoteis-store';
import type { Ref } from 'vue';
import type { QSelectProps } from 'quasar';
import type { Cidade } from 'src/models/cidade.model';

const tabAtual = ref('hotel');
const destino = ref();
const options: Ref<Cidade[]> = ref([]);
const hoteisStore = useHoteisStore();

const buscarHotel = () => {
  hoteisStore.buscarHoteisPorCidade(destino.value);
};

// Tratativa para tratar as opções corretamente no select
const optionLabel = (opt: { name: string; state: string; placeId: number }) =>
  Object(opt) === opt && 'name' in opt && 'state' in opt ? `${opt.name}, ${opt.state}` : '-';

const buscaCidades: QSelectProps['onFilter'] = (texto, update, abort) => {
  // Ignora a busca se o texto for menor que 3 caracteres
  if (texto.length < 3) {
    abort();
    return;
  }

  update(() => {
    options.value.length = 0;

    buscarCidades(texto)
      .then(({ data }) => {
        options.value.push(...data);
        console.log('Cidades encontradas:', options.value);
      })
      .catch((error) => {
        console.error('Erro ao buscar cidades:', error);
      });
  });
};
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
    &__select {
      width: 500px;
    }
  }
}
</style>
