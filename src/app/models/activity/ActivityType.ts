import {Response} from '../../helpers/crud-helper/models'

export type ActivityType = {
  id?: number
  name: string
}

export const initialActivityType = (activityType?: ActivityType) => {
  return {
    name: activityType?.name || '',
  }
}

export type ActivityTypeQueryResponse = Response<Array<ActivityType>>
