import {ID} from '../../../../_metronic/helpers'

export type ActivitySettings = {
  rounds: number
  is_cross_play: boolean
  frequency: number
  day: number
  time: number
  timezone_id: ID
  timezone: {
    id: ID
    name: string
    value: string
  }
}

export const initialActivitySettings = (activitySettings?: ActivitySettings) => {
  return {
    rounds: activitySettings?.rounds || 0,
    is_cross_play: activitySettings?.is_cross_play || false,
    frequency: activitySettings?.frequency || 0,
    day: activitySettings?.day || 0,
    time: activitySettings?.time || '',
    timezone_id: activitySettings?.timezone_id || 0,
  }
}
