export interface IDataTicketInput {
  movie: string;
  price: number;
  quantity: number;
}

export interface IDataTicketUpdateInput {
  movie?: string;
  price?: number;
  quantity?: number;
}
