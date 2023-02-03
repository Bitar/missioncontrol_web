import {TimeZone} from '../misc/TimeZone'

export type ActivitySettings = {
  rounds: number
  is_cross_play: boolean
  frequency: number
  day: number
  time: number
  timezone_id: number
  timezone: TimeZone

  total_game_time: number
}

export const initialActivitySettings = (activitySettings?: ActivitySettings) => {
  return {
    rounds: activitySettings?.rounds || 0,
    is_cross_play: activitySettings?.is_cross_play || false,
    frequency: activitySettings?.frequency || 0,
    day: activitySettings?.day || 0,
    time: activitySettings?.time || '',
    timezone_id: activitySettings?.timezone_id || 0,
    total_game_time: activitySettings?.total_game_time || 0,
  }
}
