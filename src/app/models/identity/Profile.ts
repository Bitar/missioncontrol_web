import {User} from '../../sections/identity/user/models/User'
import {Community} from '../../sections/community/models/Community'

export type Profile = {
  user: User
  admin: Community
}
