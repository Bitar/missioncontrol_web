import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import {Game} from '../../../models/game/Game'

type GameContextProps = {
  game: Game | undefined
  setGame: Dispatch<SetStateAction<Game | undefined>>
  updateGame: any
}

const initGameContextPropsState = {
  game: undefined,
  setGame: () => {},
  updateGame: () => {},
}

export const GameContext = createContext<GameContextProps>(initGameContextPropsState)

export const useGame = () => {
  return useContext(GameContext)
}
