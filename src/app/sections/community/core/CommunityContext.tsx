import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {User} from '../../iam/user/core/User'
import {Community} from '../../../models/community/Community'

type CommunityContextProps = {
  community: Community | undefined
  setCommunity: Dispatch<SetStateAction<Community | undefined>>
  updateCommunity: () => void
  members: User[] | undefined
  setMembers: Dispatch<SetStateAction<User[] | undefined>>
}

const initCommunityContextPropsState = {
  community: undefined,
  setCommunity: () => {},
  updateCommunity: () => {},
  members: undefined,
  setMembers: () => {},
}

export const CommunityContext = createContext<CommunityContextProps>(initCommunityContextPropsState)

export const useCommunity = () => {
  return useContext(CommunityContext)
}
