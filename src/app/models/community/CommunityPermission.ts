import {Response} from '../../../_metronic/helpers'
import {User} from '../iam/User'

export type CommunityPermission = {
  user: User
  is_owner: boolean
}

export type CommunityPermissionQueryResponse = Response<Array<CommunityPermission>>
