import {ID, Response} from '../../../../_metronic/helpers'

export type ActivityFee = {
  id?: ID
  activity_id?: ID
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
