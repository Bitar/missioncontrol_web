import {Response} from '../../helpers/crud-helper/models'
import {User} from '../iam/User'
import {Team} from '../squad/Team'

export type ActivityRegistration = {
  id?: number
  user: User
  team: Team
  payment_response_id?: number
  created_at: number
}

export type ActivityRegistrationsQueryResponse = Response<Array<ActivityRegistration>>
