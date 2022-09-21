import {Activity} from './models/Activity'
import  { createContext, Dispatch, SetStateAction, useContext } from "react";
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

export const useActivity = () => useContext(ActivityContext)

// export const ActivityProvider: FC<React.PropsWithChildren<unknown>> = ({children}) => {
//   const [activity, setActivity] = useState<Activity | undefined>()
//   const [matches, setMatches] = useState<Match[] | undefined>([])
//   const [members, setMembers] = useState<User[] | undefined>([])
//   const [match, setMatch] = useState<Match | undefined>()
//
//   return (
//     <ActivityContext.Provider
//       value={{
//         activity,
//         setActivity,
//         matches,
//         setMatches,
//         members,
//         setMembers,
//         match,
//         setMatch,
//       }}
//     >
//       {children}
//     </ActivityContext.Provider>
//   )
// }
