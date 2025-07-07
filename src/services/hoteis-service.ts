import axios from 'axios';
import { URL_API_DEV } from 'src/environments/environment';
import type { Hotel, HotelDetalhes } from 'src/models/hotel.model';

const hoteisPorPagina = 4;

// Busca lista de hotéis de acordo com a cidade informada
function obterHoteis(
  placeId: number,
  ordenacao: 'totalPrice' | 'stars',
  pagina: number,
  nomeHotel?: string,
) {
  return axios.get<Hotel[]>(`${URL_API_DEV}/hotels`, {
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

function obterDetalhesHotel(idHotel: number) {
  return axios.get<HotelDetalhes[]>(`${URL_API_DEV}/hotels_details?idHotel=${idHotel}`);
}

export { obterHoteis, obterDetalhesHotel, hoteisPorPagina };
