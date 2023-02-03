import {initialScore, Score} from './Score'

export type Round = {
  round: number
  scores: Score[]
}

export const initialRound = (round?: Round) => {
  return {
    round: round?.round || 0,
    scores: round?.scores || [initialScore()],
  }
}
