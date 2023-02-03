import {Response} from '../../../_metronic/helpers'
import {CommunityQueryResponse} from './Community'

export type CommunityAccess = {
  id?: number
  community_id?: number
  type: number
  key?: number
  value?: string
}

export const initialCommunityAccess = (communityAccess?: CommunityAccess) => {
  return {
    type: communityAccess?.type || 1,
    key: communityAccess?.key || 0,
    value: communityAccess?.value || '',
  }
}

export type CommunityAccessQueryResponse = Response<Array<CommunityQueryResponse>>
