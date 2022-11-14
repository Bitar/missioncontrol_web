import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {User} from '../models/User'

type UserContextProps = {
  user: User | undefined
  setUser: Dispatch<SetStateAction<User | undefined>>
}

const initUserContextPropsState = {
  user: undefined,
  setUser: () => {},
}

export const UserContext = createContext<UserContextProps>(initUserContextPropsState)

export const useUser = () => {
  return useContext(UserContext)
}
