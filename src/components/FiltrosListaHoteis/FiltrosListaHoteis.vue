<template>
  <div class="filtros">
    <div class="shadow-3 filtros__item">
      <q-select
        borderless
        v-model="ordenacao"
        :options="opcoes"
        :display-value="`Ordenar por: ${ordenacao ? ordenacao : '*none*'}`"
      >
        <template v-slot:prepend>
          <q-icon name="mdi-sort" size="xs" />
        </template>
      </q-select>
    </div>
    <div class="shadow-3 filtros__item">
      <q-input outlined v-model="nomeHotel" placeholder="Nome do Hotel">
        <template v-slot:prepend>
          <q-icon name="mdi-magnify" size="xs" />
        </template>
      </q-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

enum Ordenacao {
  Preco = 'Preço',
  Estrelas = 'Estrelas',
}

const ordenacao = ref(Ordenacao.Preco);
const nomeHotel = ref('');
const opcoes = [Ordenacao.Preco, Ordenacao.Estrelas];
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
