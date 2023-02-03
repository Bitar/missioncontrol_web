import {Response} from '../../helpers/crud-helper/models'

export type ActivityTeam = {
  id?: number
  activity_id?: number
  players: string
  min: string
  max: string
}

export const initialActivityTeam = {
  players: '',
  min: '',
  max: '',
}

export type ActivityTeamQueryResponse = Response<Array<ActivityTeam>>
