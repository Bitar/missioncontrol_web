import {User} from './User'
import {Community} from '../community/Community'

export type Profile = {
  user: User
  admin: Community
}
