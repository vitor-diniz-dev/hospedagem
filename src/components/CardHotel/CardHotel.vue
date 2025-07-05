<!-- Card para demonstrar as informações de uma hospedagem, normalmente listada na tela de busca -->
<template>
  <q-card class="shadow-3 card-hotel" flat>
    <q-card-section class="card-hotel__main-section" horizontal>
      <!-- Seção da imagem -->
      <q-card-section class="col-3 no-padding">
        <RatingComponent />
        <q-img class="card-hotel__img" src="https://cdn.quasar.dev/img/parallax2.jpg" />
      </q-card-section>

      <!-- Seção das informações principais da hospedagem -->
      <q-card-section class="col-7 no-padding">
        <div class="card-hotel__section">
          <div>
            <h2 class="card-hotel__nome">Hotel</h2>
            <h3 class="card-hotel__localidade">Copacabana</h3>
          </div>
          <div>
            <ul class="card-hotel__lista-comodidades">
              <li><q-avatar color="info" icon="directions" size="md" /></li>
              <li><q-avatar color="info" icon="directions" size="md" /></li>
            </ul>
            <p class="q-mb-xs text-positive">
              <q-icon class="q-mr-xs" name="mdi-currency-usd" size="xs" />Reembolsável
            </p>
            <p class="q-mb-none text-positive">
              <q-icon class="q-mr-xs" name="mdi-coffee" size="xs" />Café da manhã
            </p>
          </div>
        </div>
      </q-card-section>

      <!-- Seção das diárias e valores -->
      <q-card-section class="col-2 no-padding">
        <div class="q-pa-md card-hotel__section card-hotel__section__direita">
          <div>
            <p class="text-caption q-mb-xs">Por dia</p>
            <span class="card-hotel__preco">R$ 100</span>
          </div>
          <div>
            <p class="text-weight-light text-caption q-mb-none">
              Diárias: <span class="float-right">R$ 100</span>
            </p>
            <p class="text-weight-light text-caption q-mb-none">
              Taxa: <span class="float-right">R$ 100</span>
            </p>
          </div>
          <q-btn
            dense
            rounded
            no-caps
            size="md"
            class="card-hotel__btn"
            color="primary"
            label="Ver detalhes"
            @click="visualizarDetalhes"
          />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { abrirModalHotel } from 'src/services/modal-service';
import RatingComponent from '../Rating/RatingComponent.vue';

const visualizarDetalhes = () => abrirModalHotel();
</script>

<style scoped lang="scss">
.card-hotel {
  background-color: transparent;

  &__main-section {
    gap: 4px;
  }
  &__img {
    border-top-left-radius: 12px !important;
    border-bottom-left-radius: 12px !important;
  }
  &__nome {
    font-weight: bold;
    margin-top: 0;
    margin-bottom: 4px;
  }
  &__localidade {
    font-weight: 200;
    margin: 0;
    font-size: 12px;
  }
  &__lista-comodidades {
    display: flex;
    gap: 4px;
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: 8px;
  }
  &__section {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 12px;
    background-color: #fff;
    font-weight: 600;

    &__direita {
      border-top-right-radius: 12px;
      border-bottom-right-radius: 12px;
    }
  }
  &__btn {
    line-height: 1;
    padding: 12px 0;
  }
  &__preco {
    font-size: 18px;
    color: $primary-100;
    line-height: 1;
    font-weight: bold;
  }
}
</style>
