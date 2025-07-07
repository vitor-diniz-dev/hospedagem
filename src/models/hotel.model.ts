interface Hotel {
  id: number;
  name: string;
  stars: number;
  totalPrice: number;
  dailyPrice: number;
  tax: number;
  thumb: string;
  amenities: Comodidade[];
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  district: string;
  placeId: number;
}

interface HotelDetalhes {
  description: string;
  fullAddress: string;
  images: string[];
}

enum Comodidade {
  SERVICO_QUARTO = 1,
  AR_CONDICIONADO = 2,
  WI_FI = 3,
  PISCINA = 4,
  ACESSIBILIDADE = 5,
  RESTAURANTE = 6,
}

const comodidade = {
  SERVICO_QUARTO: {
    id: Comodidade.SERVICO_QUARTO,
    descricao: 'Serviço de Quarto',
    icone: 'room-service',
  },
  AR_CONDICIONADO: {
    id: Comodidade.AR_CONDICIONADO,
    descricao: 'Ar Condicionado',
    icone: 'snowflake',
  },
  WI_FI: {
    id: Comodidade.WI_FI,
    descricao: 'Wi-Fi',
    icone: 'wifi',
  },
  PISCINA: {
    id: Comodidade.PISCINA,
    descricao: 'Piscina',
    icone: 'swim',
  },
  ACESSIBILIDADE: {
    id: Comodidade.ACESSIBILIDADE,
    descricao: 'Acessibilidade',
    icone: 'wheelchair',
  },
  RESTAURANTE: {
    id: Comodidade.RESTAURANTE,
    descricao: 'Restaurante',
    icone: 'glass-cocktail',
  },
};

export type { Hotel, HotelDetalhes };
export { comodidade, Comodidade };
