interface Hotel {
  id: number;
  name: string;
  stars: number;
  totalPrice: number;
  dailyPrice: number;
  tax: number;
  thumb: string;
  amenities: number[];
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  district: string;
  placeId: number;
}

export type { Hotel };
