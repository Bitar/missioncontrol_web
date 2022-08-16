import {ID, Response} from '../../../../_metronic/helpers'

export type ActivityLocation = {
  id?: ID
  activity_id?: ID
  type: string
  location: string
}

export const initialActivityLocation = (activityLocation?: ActivityLocation) => {
  return {
    type: activityLocation?.type || 1,
    location: activityLocation?.location || '',
  }
}

export type ActivityLocationQueryResponse = Response<Array<ActivityLocation>>
