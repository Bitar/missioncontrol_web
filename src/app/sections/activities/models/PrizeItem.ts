import {ID} from '../../../../_metronic/helpers'

export type PrizeItem = {
  id?: ID
  prize_type?: {
    id: ID
    name: string
  }
  name: string
  description: string
  value: number
  value_type?: {
    id: ID
    name: string
    symbol?: string
  }
}

export const initialPrizeItem = (prizeItem?: PrizeItem) => {
  return {
    name: prizeItem?.name || '',
    description: prizeItem?.description || '',
    value: prizeItem?.value || 0,
  }
}
