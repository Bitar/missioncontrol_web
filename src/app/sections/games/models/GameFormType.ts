import {Game} from '../../../models/game/Game'

export type GameFormType = {
  title: string
  description: string
}

export const initGameFormType = (game?: Game) => {
  return {
    title: game?.title || '',
    description: game?.description || '',
  }
}
