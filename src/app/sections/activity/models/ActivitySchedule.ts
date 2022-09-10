import {ID, Response} from '../../../../_metronic/helpers'

export type ActivitySchedule = {
  id?: ID
  activity_id?: ID
  registration_dates_start_date: number
  registration_dates_end_date: number
  matchplay_dates_start_date: number
  match_play_date_end_date: number
  match_frequency_dates: Array<string>
  time_time_of_day: string
  time_timezone: string
}

export const initialActivitySchedule = (activitySchedule?: ActivitySchedule) => {
  return {
    registration_dates_start_date: activitySchedule?.registration_dates_start_date || 0,
    registration_dates_end_date: '',
    matchplay_dates_start_date: '',
    match_play_date_end_date: '',
    match_frequency_dates: [],
    time_time_of_day: '',
    time_timezone: '',
  }
}

export type ActivityScheduleQueryResponse = Response<Array<ActivitySchedule>>
