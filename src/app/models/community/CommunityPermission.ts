import {Response} from '../../../_metronic/helpers'
import {User} from '../../sections/iam/user/core/User'

export type CommunityPermission = {
  user: User
  is_owner: boolean
}

export type CommunityPermissionQueryResponse = Response<Array<CommunityPermission>>
