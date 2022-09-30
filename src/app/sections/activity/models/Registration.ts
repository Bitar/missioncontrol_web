import {ID, Response} from '../../../helpers/crud-helper/models'
import {User} from '../../identity/user/models/User'
import {Team} from '../../../models/squad/Team'

export type Registration = {
  id?: ID
  user: User
  team: Team
  payment_response_id?: ID
  created_at: number
}

export type RegistrationsQueryResponse = Response<Array<Registration>>
