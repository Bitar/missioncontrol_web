import { ID, Response } from "../../../../_metronic/helpers";
import {User} from '../../identity/user/models/User'
import {Team} from '../../../models/squad/Team'

export type ActivityRegistration = {
  id?: ID
  user: User
  team: Team
  payment_response_id?: number
  created_at: number
}

export type ActivityRegistrationsQueryResponse = Response<Array<ActivityRegistration>>