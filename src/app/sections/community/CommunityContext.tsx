import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {User} from '../identity/user/models/User'
import {Community} from './models/Community'

type CommunityContextProps = {
  community: Community | undefined
  setCommunity: Dispatch<SetStateAction<Community | undefined>>
  members: User[] | undefined
  setMembers: Dispatch<SetStateAction<User[] | undefined>>
}

const initCommunityContextPropsState = {
  community: undefined,
  setCommunity: () => {},
  members: undefined,
  setMembers: () => {},
}

export const CommunityContext = createContext<CommunityContextProps>(initCommunityContextPropsState)

export const useCommunity = () => {
  return useContext(CommunityContext)
}
