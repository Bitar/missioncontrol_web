import {ID, Response} from '../../../_metronic/helpers'

export type TimeZone = {
  id?: ID
  name: string
  value: string
  offset?: string
}

export type TimeZoneCollection = Response<Array<TimeZone>>
