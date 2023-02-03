export interface UserMeta {
  id?: number
  user_id?: number
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
    city: userMeta?.city || '',
    date_of_birth: userMeta?.date_of_birth || 0,
  }
}
