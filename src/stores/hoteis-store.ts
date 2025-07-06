import { defineStore } from 'pinia';
import type { Hotel } from 'src/models/hotel.model';
import { obterCidades } from 'src/services/hoteis-service';

export const useHoteisStore = defineStore('hoteis', {
  state: (): { hoteis: Hotel[]; placeId: number | null; termoSort: 'totalPrice' | 'stars' } => ({
    termoSort: 'totalPrice',
    placeId: null,
    hoteis: [],
  }),
  actions: {
    buscarHoteisPorCidade(placeId: number) {
      obterCidades(placeId, 'totalPrice')
        .then(({ data }) => {
          this.placeId = placeId;
          this.hoteis = data;
          console.log('Hotéis encontrados:', data);
        })
        .catch((error) => {
          console.error('Erro ao buscar hotéis:', error);
        });
    },
    ordenarHoteis(termoOrdenacao: 'totalPrice' | 'stars') {
      if (this.placeId)
        obterCidades(this.placeId, termoOrdenacao)
          .then(({ data }) => {
            this.hoteis = data;
            console.log('Hotéis encontrados:', data);
          })
          .catch((error) => {
            console.error('Erro ao buscar hotéis:', error);
          });
    },
    buscarHoterisPorCidadeNome(nome: string) {
      if (this.placeId)
        obterCidades(this.placeId, this.termoSort, nome)
          .then(({ data }) => {
            this.hoteis = data;
            console.log('Hotéis encontrados:', data);
          })
          .catch((error) => {
            console.error('Erro ao buscar hotéis:', error);
          });
    },
  },
});
