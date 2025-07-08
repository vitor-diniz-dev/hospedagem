<!-- Banner utilizado para reportar erros (atualmente utilzado para notificar falhas em requisições) -->
<template>
  <q-banner inline-actions class="text-white bg-red fixed-top-right q-ma-md">
    {{ bannerStore.mensagem }}
    <template v-slot:action>
      <q-btn flat color="white" label="Fechar" @click="bannerStore.fecharBanner" />
    </template>
  </q-banner>
</template>

<script setup lang="ts">
import { useBannerStore } from 'src/stores/banner-store';

const bannerStore = useBannerStore();
</script>
