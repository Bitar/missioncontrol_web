import {ID} from '../../../../../_metronic/helpers'
import {ScoreSheet} from './ScoreSheet'

export type Score = {
  id?: ID
  round: number
  score: number
  user_id?: number
  team_id: number
  is_approved: number
  images: []
  score_sheet: ScoreSheet[]
}

export const initialScore = (score?: Score) => {
  return {
    round: score?.round || 0,
    score: score?.score || 0,
    is_approved: score?.is_approved || 0,
  }
}
