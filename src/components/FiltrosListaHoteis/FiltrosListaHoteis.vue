<template>
  <div class="filtros">
    <div class="shadow-3 filtros__item">
      <q-select
        borderless
        v-model="ordenacao"
        :options="opcoes"
        option-value="termoSort"
        option-label="label"
        :display-value="`Ordenar por: ${ordenacao ? ordenacao.label : '*none*'}`"
        @update:model-value="ordenacaoAlterada"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-sort" size="xs" />
        </template>
      </q-select>
    </div>
    <div class="shadow-3 filtros__item">
      <q-input
        outlined
        v-model="hotelStore.filtros.nomeHotel"
        placeholder="Nome do Hotel"
        debounce="500"
        @update:model-value="nomeHotelAlterado"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-magnify" size="xs" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHoteisStore } from 'src/stores/hoteis-store';
import { ref } from 'vue';

interface Ordenacao {
  label: string;
  termoSort: 'totalPrice' | 'stars';
}
const OrdenacaoPreco: Ordenacao = {
  label: 'Preço',
  termoSort: 'totalPrice',
};
const OrdenacaoEstrelas: Ordenacao = {
  label: 'Estrelas',
  termoSort: 'stars',
};

const ordenacao = ref(OrdenacaoPreco);
const opcoes = [OrdenacaoPreco, OrdenacaoEstrelas];
const hotelStore = useHoteisStore();

const ordenacaoAlterada = () => {
  hotelStore.filtros.termoSort = ordenacao.value.termoSort;
  hotelStore.buscarHoteis();
};
const nomeHotelAlterado = () => {
  hotelStore.buscarHoteis();
};
</script>

<style scoped lang="scss">
.filtros {
  position: absolute;
  display: flex;
  justify-content: space-between;
  gap: 40px;
  left: 50%;
  transform: translate(-50%, 50%);
  bottom: 100%;

  &__item {
    background-color: #fff;
    padding: 8px;
    border-radius: 12px;
  }
}
</style>

<!-- Necessário ser estilo fora do scoped para aplicar ao componente do QuasarUI -->
<style lang="scss">
.q-field .q-field__marginal {
  padding: 0 !important;
}
</style>
