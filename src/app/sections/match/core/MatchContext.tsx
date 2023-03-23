import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {NewMatch} from '../../../models/activity/matches/Match'
import {Team} from '../../../models/squad/Team'

type MatchContextProps = {
  match: NewMatch | undefined
  setMatch: Dispatch<SetStateAction<NewMatch | undefined>>
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
