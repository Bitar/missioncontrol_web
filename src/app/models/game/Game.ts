import {ID, Response} from '../../../_metronic/helpers'
import {Platform} from './Platform'
import {GameMode} from './GameMode'

export type Game = {
  id?: ID
  title: string
  description?: string
  is_featured: boolean
  is_cross_play: boolean
  image: string
  platforms: Platform[]
  game_modes?: GameMode[]
}

// initialize game_modes somehow
export const initialGame = (game?: Game) => {
  return {
    title: game?.title || '',
    is_cross_play: game?.is_cross_play || false,
    is_featured: game?.is_featured || false,
    description: game?.description || '',
    image: game?.image || '',
    platforms: game?.platforms || [],
    game_modes: game?.game_modes || [],
  }
}

export const roundList = [
  {value: 1, label: 1},
  {value: 3, label: 3},
  {value: 5, label: 5},
]

export type GameQueryResponse = Response<Array<Game>>
