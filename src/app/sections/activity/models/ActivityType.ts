import {ID} from '../../../../_metronic/helpers'

export type ActivityType = {
  id?: ID
  name: string
}

export const initialActivityType = (activityType?: ActivityType) => {
  return {
    name: activityType?.name || '',
  }
}
