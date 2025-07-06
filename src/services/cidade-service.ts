import axios from 'axios';
import type { Cidade } from 'src/models/cidade.model';

// Busca a cidade e seu estado de acordo com o termo informado
export function buscarCidades(termo: string) {
  return axios.get<Cidade[]>(`http://localhost:3000/cities?name_like=${termo}`);
}
