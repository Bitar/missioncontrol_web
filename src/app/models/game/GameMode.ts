import {ID, Response} from '../../../_metronic/helpers'
import {GameSettings} from './GameSettings'
import {ScoringSettings} from './scoring/ScoringSettings'
import {ScoringType} from './scoring/ScoringType'

export type GameMode = {
  id?: ID
  name: string
  description: string
  scoring_type: ScoringType
  instructions: string
  min_players: number
  max_players: number
  game_time: number
  settings: GameSettings[]
  scoring_settings: ScoringSettings[]
}

export const initialGameMode = (gameMode?: GameMode) => {
  return {
    name: gameMode?.name || '',
    description: gameMode?.description || '',
    scoring_type: {
      name: gameMode?.scoring_type?.name || '',
      description: gameMode?.scoring_type?.description || '',
    },
    instructions: gameMode?.instructions || '',
    min_players: gameMode?.min_players || 0,
    max_players: gameMode?.max_players || 0,
    game_time: gameMode?.game_time || 0,
    settings: gameMode?.settings,
    score_settings: gameMode?.scoring_settings,
  }
}

export type GameModeQueryResponse = Response<Array<GameMode>>
