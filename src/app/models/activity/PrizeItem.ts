export type PrizeItem = {
  id?: number
  prize_type?: {
    id: number
    name: string
  }
  name: string
  description?: string
  value: number
  value_type?: {
    id: number
    name: string
    symbol?: string
  }
}

export const initialPrizeItem = (prizeItem?: PrizeItem) => {
  return {
    name: prizeItem?.name || '',
    value: prizeItem?.value || 0,
  }
}
