import { defineStore } from 'pinia';
import type { Hotel, HotelDetalhes } from 'src/models/hotel.model';
import { hoteisPorPagina, obterDetalhesHotel, obterHoteis } from 'src/services/hoteis-service';
import { abrirModalHotel } from 'src/services/modal-service';

interface HotelStoreProps {
  // Filtros relacionados a busca de hoteis
  filtros: {
    placeId: number | null;
    termoSort: 'totalPrice' | 'stars';
    nomeHotel: string;
    paginaAtual: number;
    totalPaginas: number;
  };
  hoteis: Hotel[];
  drawerHotel: (Hotel & { detalhes: HotelDetalhes }) | undefined;
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
    drawerHotel: undefined,
  }),
  actions: {
    // Busca hoteis de acordo com os filtros informados
    buscarHoteis() {
      if (this.filtros.placeId)
        obterHoteis(
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
    abrirModalHotel(hotel: Hotel) {
      if (hotel.placeId)
        obterDetalhesHotel(hotel.placeId)
          .then(({ data }) => {
            if (data[0]) {
              this.drawerHotel = {
                ...hotel,
                detalhes: data[0],
              };
              abrirModalHotel();
            }
          })
          .catch((error) => {
            console.error('Erro ao buscar detalhes do hotel:', error);
          });
    },
  },
});
