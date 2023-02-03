import {Activity} from '../../../../models/activity/Activity'
import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {Match} from '../../../../models/activity/matches/Match'
import {Team} from '../../../../models/squad/Team'
import {ActivityRegistration} from '../../../../models/activity/ActivityRegistration'

type ActivityContextProps = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
  matches: Match[] | undefined
  setMatches: Dispatch<SetStateAction<Match[] | undefined>>
  match: Match | undefined
  setMatch: Dispatch<SetStateAction<Match | undefined>>
  registrations: ActivityRegistration[] | undefined
  setRegistrations: Dispatch<SetStateAction<ActivityRegistration[] | undefined>>
  teams: Team[] | undefined
  setTeams: Dispatch<SetStateAction<Team[] | undefined>>
}

const initActivityContextPropsState = {
  activity: undefined,
  setActivity: () => {},
  matches: undefined,
  setMatches: () => {},
  match: undefined,
  setMatch: () => {},
  registrations: undefined,
  setRegistrations: () => {},
  teams: undefined,
  setTeams: () => {},
}

export const ActivityContext = createContext<ActivityContextProps>(initActivityContextPropsState)

export const useActivity = () => {
  return useContext(ActivityContext)
}
