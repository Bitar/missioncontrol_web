import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {User} from '../../../models/iam/User'
import {Community} from '../../../models/community/Community'

type CommunityContextProps = {
  community: Community | undefined
  setCommunity: Dispatch<SetStateAction<Community | undefined>>
  updateCommunity: () => void
  members: User[] | undefined
  setMembers: Dispatch<SetStateAction<User[] | undefined>>
  link?: string
}

const initCommunityContextPropsState = {
  community: undefined,
  setCommunity: () => {},
  updateCommunity: () => {},
  members: undefined,
  setMembers: () => {},
  link: '',
}

export const CommunityContext = createContext<CommunityContextProps>(initCommunityContextPropsState)

export const useCommunity = () => {
  return useContext(CommunityContext)
}
