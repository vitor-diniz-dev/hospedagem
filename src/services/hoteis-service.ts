import axios from 'axios';
import type { Hotel } from 'src/models/hotel.model';

export const hoteisPorPagina = 4;

// Busca lista de hotéis de acordo com a cidade informada
export function obterCidades(
  placeId: number,
  ordenacao: 'totalPrice' | 'stars',
  pagina: number,
  nomeHotel?: string,
) {
  return axios.get<Hotel[]>('http://localhost:3000/hotels', {
    params: {
      placeId,
      name_like: nomeHotel,
      _sort: ordenacao,
      _order: 'desc',
      _page: pagina,
      _limit: hoteisPorPagina,
    },
  });
}
