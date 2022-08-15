import {ID} from '../../../../../_metronic/helpers'

export interface UserMeta {
  id?: ID
  user_id?: ID
  image: string
  username?: string
  date_of_birth?: number
  rng?: string
  city?: string
}

export const initialUserMeta = (userMeta?: UserMeta) => {
  return {
    image: userMeta?.image || '',
    username: userMeta?.username || '',
    city: userMeta?.city ? userMeta?.city : '',
    date_of_birth: userMeta?.date_of_birth || 0,
  }
}
