import {Response} from '../../../_metronic/helpers'

export type CommunityData = {
  in_active_league: boolean
  players_count: number
  leagues_count: number
  activities_in_progress: number
  open_registrations: number
}

export type CommunityDataQueryResponse = Response<Array<CommunityData>>
