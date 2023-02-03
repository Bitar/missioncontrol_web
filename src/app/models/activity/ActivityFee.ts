import {ID, Response} from '../../helpers/crud-helper/models'

export type ActivityFee = {
  id?: number
  activity_id?: number
  type: number
  amount: number
}

export const initialActivityFee = (activityFee?: ActivityFee) => {
  return {
    type: activityFee?.type || 1,
    amount: activityFee?.amount || 0,
  }
}

export type ActivityFeeQueryResponse = Response<Array<ActivityFee>>
