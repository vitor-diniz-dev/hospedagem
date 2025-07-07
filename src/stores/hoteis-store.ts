import { defineStore } from 'pinia';
import type { Hotel } from 'src/models/hotel.model';
import { hoteisPorPagina, obterCidades } from 'src/services/hoteis-service';

export interface HotelStoreProps {
  // Filtros relacionados a busca de hoteis
  filtros: {
    placeId: number | null;
    termoSort: 'totalPrice' | 'stars';
    nomeHotel: string;
    paginaAtual: number;
    totalPaginas: number;
  };
  hoteis: Hotel[];
}

export const useHoteisStore = defineStore('hoteis', {
  state: (): HotelStoreProps => ({
    filtros: {
      paginaAtual: 1,
      totalPaginas: 0,
      termoSort: 'totalPrice',
      placeId: null,
      nomeHotel: '',
    },
    hoteis: [],
  }),
  actions: {
    // Busca hoteis de acordo com os filtros informados
    buscarHoteis() {
      if (this.filtros.placeId)
        obterCidades(
          this.filtros.placeId,
          this.filtros.termoSort,
          this.filtros.paginaAtual,
          this.filtros.nomeHotel,
        )
          .then(({ data, headers }) => {
            this.hoteis = data;
            this.filtros.totalPaginas = Math.ceil(headers['x-total-count'] / hoteisPorPagina);
            console.log('Hotéis encontrados:', data);
          })
          .catch((error) => {
            console.error('Erro ao buscar hotéis:', error);
          });
    },
  },
});
