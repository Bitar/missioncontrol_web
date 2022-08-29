import {ID, Response} from '../../../../_metronic/helpers'
import {PrizeBundle} from './PrizeBundle'
import {PrizeItem} from './PrizeItem'

export type ActivityPrize = {
  id?: ID
  type: number
  bundle?: PrizeBundle
  item?: PrizeItem
}

export const initialActivityPrize = (activityPrize?: ActivityPrize) => {
  return {
    type: activityPrize?.type || 0,
  }
}

export type ActivityLocationQueryResponse = Response<Array<ActivityPrize>>
