import {Response} from '../../helpers/crud-helper/models'
import {PrizeBundle} from './PrizeBundle'
import {PrizeItem} from './PrizeItem'

export type ActivityPrize = {
  id?: number
  type: number
  bundle?: PrizeBundle
  item?: PrizeItem
}

export const initialActivityPrize = (activityPrize?: ActivityPrize) => {
  return {
    type: activityPrize?.type || 1,
  }
}

export type ActivityLocationQueryResponse = Response<Array<ActivityPrize>>
