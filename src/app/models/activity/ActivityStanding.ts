import {Team} from '../squad/Team'

export type ActivityStanding = {
  team: Team
  score: {
    win: number
    score_win: number
    lose: number
    score_lose: number
  }
}
