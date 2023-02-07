import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {Match} from '../../../models/activity/matches/Match'
import {Team} from '../../../models/squad/Team'

type MatchContextProps = {
  match: Match | undefined
  setMatch: Dispatch<SetStateAction<Match | undefined>>
  teams: Team[] | undefined
  setTeams: Dispatch<SetStateAction<Team[] | undefined>>
}

const initMatchContextProps = {
  match: undefined,
  setMatch: () => {},
  teams: [],
  setTeams: () => {},
}

export const MatchContext = createContext<MatchContextProps>(initMatchContextProps)

export const useMatch = () => {
  return useContext(MatchContext)
}
