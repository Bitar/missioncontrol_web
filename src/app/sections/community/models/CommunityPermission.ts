import {Response} from '../../../../_metronic/helpers'
import {User} from '../../identity/user/models/User'

export type CommunityPermission = {
  user: User
  is_owner: boolean
}

export type CommunityPermissionQueryResponse = Response<Array<CommunityPermission>>
