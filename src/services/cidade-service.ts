import axios from 'axios';
import { URL_API_DEV } from 'src/environments/environment';
import type { Cidade } from 'src/models/cidade.model';

// Busca a cidade e seu estado de acordo com o termo informado
export function buscarCidades(termo: string) {
  return axios.get<Cidade[]>(`${URL_API_DEV}/cities?name_like=${termo}`);
}
