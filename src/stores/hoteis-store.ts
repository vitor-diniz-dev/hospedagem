import { defineStore } from 'pinia';
import type { Hotel } from 'src/models/hotel.model';
import { buscarHoteisPorCidade } from 'src/services/hoteis-service';

export const useHoteisStore = defineStore('hoteis', {
  state: (): { hoteis: Hotel[] } => ({
    hoteis: [],
  }),
  actions: {
    buscarHoteisPorCidade(placeId: number) {
      buscarHoteisPorCidade(placeId)
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
