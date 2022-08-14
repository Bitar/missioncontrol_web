import {ID, Response} from '../../../_metronic/helpers'
import {User} from '../../sections/identity/user/models/User'

export type Team = {
  id?: ID
  name: string
  image: string
  users: User[]
  status: number
  is_home?: boolean
  share_link?: string
}

export const teamInitial = (team?: Team) => {
  return {
    name: team?.name || '',
    image: team?.image || '',
    users: team?.users || [],
    status: team?.status || 0,
    is_home: team?.is_home || false,
  }
}

export type TeamQueryResponse = Response<Array<Team>>
