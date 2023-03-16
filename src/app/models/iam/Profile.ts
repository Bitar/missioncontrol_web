import {User} from '../../sections/iam/user/core/User'
import {Community} from '../community/Community'

export type Profile = {
  user: User
  admin: Community
}
