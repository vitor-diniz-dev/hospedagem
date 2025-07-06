import axios from 'axios';
import type { Hotel } from 'src/models/hotel.model';

// Busca lista de hotéis de acordo com a cidade informada
export function obterCidades(
  placeId: number,
  ordenacao: 'totalPrice' | 'stars',
  nomeHotel?: string,
) {
  return axios.get<Hotel[]>('http://localhost:3000/hotels', {
    params: {
      placeId,
      _sort: ordenacao,
      _order: 'desc',
      name_like: nomeHotel,
    },
  });
}
