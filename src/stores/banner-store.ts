import { defineStore } from 'pinia';

const mensagemDefault = 'Ocorreu um erro inesperado';

export const useBannerStore = defineStore('banner', {
  state: () => ({
    aberto: false,
    mensagem: mensagemDefault,
  }),
  actions: {
    apresentarBanner(mensagem: string = mensagemDefault) {
      this.aberto = true;
      this.mensagem = mensagem;
    },
    fecharBanner() {
      this.aberto = false;
    },
  },
});
