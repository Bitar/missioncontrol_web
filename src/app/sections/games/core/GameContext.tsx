import {createContext, Dispatch, SetStateAction, useContext} from 'react'
import { Game } from "../../../models/game/Game";

type GameContextProps = {
  game: Game | undefined,
  setGame: Dispatch<SetStateAction<Game | undefined>>
}

const initGameContextPropsState = {
  game: undefined,
  setGame: () => {}
}

export const GameContext = createContext<GameContextProps>(initGameContextPropsState)

export const useGame = () => {
  return useContext(GameContext)
}