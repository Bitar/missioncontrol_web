import {Activity} from './models/Activity'
import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {Match} from './models/matches/Match'
import {User} from '../identity/user/models/User'

type ActivityContextProps = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
  matches: Match[] | undefined
  setMatches: Dispatch<SetStateAction<Match[] | undefined>>
  members: User[] | undefined
  setMembers: Dispatch<SetStateAction<User[] | undefined>>
  match: Match | undefined
  setMatch: Dispatch<SetStateAction<Match | undefined>>
}

const initActivityContextPropsState = {
  activity: undefined,
  setActivity: () => {},
  matches: undefined,
  setMatches: () => {},
  members: undefined,
  setMembers: () => {},
  match: undefined,
  setMatch: () => {},
}

export const ActivityContext = createContext<ActivityContextProps>(initActivityContextPropsState)

export const useActivity = () => {
  return useContext(ActivityContext)
}
