import {ID} from '../../../../_metronic/helpers'

export type ActivitySettings = {
  rounds: number
  is_cross_play: boolean
  frequency: number
  day: number
  time: string
  timezone: ID
}

export const initialActivitySettings = (activitySettings?: ActivitySettings) => {
  return {
    rounds: activitySettings?.rounds || 0,
    is_cross_play: activitySettings?.is_cross_play || false,
    frequency: activitySettings?.frequency || 0,
    day: activitySettings?.day || 0,
    time: activitySettings?.time || '',
    timezone: activitySettings?.timezone || 0,
  }
}
