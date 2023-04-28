import {Response} from '../../../_metronic/helpers'

export type TimeZone = {
  id?: number
  name: string
  abbreviation: string
  value: string
  offset?: string
}

export type TimeZoneCollection = Response<Array<TimeZone>>
