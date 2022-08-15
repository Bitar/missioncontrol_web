import {ID, Response} from '../../../../_metronic/helpers'

export type ActivitySchedule = {
  id?: ID
  activity_id?: ID
  registration_dates_start_date: any
  registration_dates_end_date: string
  match_play_dates_start_date: string
  match_play_date_end_date: string
  match_frequency_dates: Array<string>
  time_time_of_day: string
  time_timezone: string
}

export const initialActivitySchedule = {
  registration_dates_start_date: '',
  registration_dates_end_date: '',
  match_play_dates_start_date: '',
  match_play_date_end_date: '',
  match_frequency_dates: [],
  time_time_of_day: '',
  time_timezone: '',
}

export type ActivityScheduleQueryResponse = Response<Array<ActivitySchedule>>
