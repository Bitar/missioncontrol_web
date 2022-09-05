import { ID } from "../../../../../_metronic/helpers";

export type Score = {
  id?: ID,
  round: number,
  score: number,
  user_id?: number,
  team_id?: number,
  is_approved: number,
  images: [],
  score_sheet: []
}

export const initialScore = (score?: Score) => {
  return {
    round: score?.round || 0,
    score: score?.score || 0,
    is_approved: score?.is_approved || 0,
  }
}