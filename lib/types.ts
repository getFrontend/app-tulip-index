export interface EssentialGoods {
  coffee: number
  groceryBag: number
  lunch: number
  busTicket: number
  movieTicket: number
  book: number
}

export interface LatestPriceData {
  tulipPrice: number
  essentialGoods: EssentialGoods
}

export interface HistoricalData {
  year: number
  tulipPrice: number
  essentialGoods: EssentialGoods
}

