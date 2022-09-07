import {User} from '../../sections/identity/user/models/User'
import {Subscription} from '../billing/Subscription'
import {Community} from '../../sections/community/models/Community'

export type Profile = {
  user: User
  subscription: Subscription
  admin: Community
}
