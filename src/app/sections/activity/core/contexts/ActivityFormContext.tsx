import {ActivityForm} from '../../models/ActivityForm'
import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {GameMode} from '../../../../models/game/GameMode'

type ActivityFormContextProps = {
  activityForm: ActivityForm | undefined
  setActivityForm: Dispatch<SetStateAction<ActivityForm>>
  gameModes: GameMode[] | undefined
  setGameModes: Dispatch<SetStateAction<GameMode[] | undefined>>
}

const initActivityFormContext = {
  activityForm: undefined,
  setActivityForm: () => {},
  gameModes: undefined,
  setGameModes: () => {},
}

export const ActivityFormContext = createContext<ActivityFormContextProps>(initActivityFormContext)

export const useActivityForm = () => {
  return useContext(ActivityFormContext)
}