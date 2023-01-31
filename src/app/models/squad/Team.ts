import {ID, Response} from '../../../_metronic/helpers'
import {User} from '../../sections/identity/user/models/User'

export type Team = {
  id?: number
  name: string
  image: string
  captain_id: number
  users: User[]
  status: number
  is_home?: boolean
  share_link?: string
}

export type TeamQueryResponse = Response<Array<Team>>

export const getTeamStatus = (statusId: number) => {
  let color: string
  let status: string

  if (statusId === 1) {
    status = 'Complete'
    color = 'success'
  } else if (statusId === 2) {
    status = 'Pending'
    color = 'danger'
  } else {
    status = 'Unknown'
    color = 'secondary'
  }

  return {status, color}
}
