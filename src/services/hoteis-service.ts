import axios from 'axios';
import type { Hotel } from 'src/models/hotel.model';

// Busca lista de hotéis de acordo com a cidade informada
export function buscarHoteisPorCidade(placeId: number) {
  console.log(`Buscando hotéis para a cidade: ${placeId}`);
  return axios.get<Hotel[]>(`http://localhost:3000/hotels?placeId=${placeId}`);
}
