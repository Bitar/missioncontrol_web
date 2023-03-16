import {ID, Response} from '../../../helpers/crud-helper/models'
import {Round} from './Round'
import {Team} from '../../squad/Team'
import {Activity} from '../Activity'
import {User} from '../../../sections/iam/user/core/User'

export type Match = {
  id?: number
  start_date: number
  end_date: number
  timezone: string
  status: number
  teams?: Team[]
  rounds: Round[]
  additional_data?: {
    session: {
      current: number
      total: number
    }
  }
  activity?: Activity
  actions?: []
  result?: {
    id: ID
    home_team: {
      id: number
      status: number
      score: number
    }
    away_team: {
      id: number
      status: number
      score: number
    }
  }

  dispute?: {
    user: User
    message: string
  }
}

export const initialMatch = (match?: Match) => {
  return {
    start_date: match?.start_date || 0,
    end_date: match?.end_date || 0,
    timezone: match?.timezone || '',
    status: match?.status || 0,
    rounds: match?.rounds || [],
  }
}

export type MatchQueryResponse = Response<Array<Match>>
