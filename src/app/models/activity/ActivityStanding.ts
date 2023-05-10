import {Team} from '../squad/Team'

export type ActivityStanding = {
  team: Team
  games_played: number
  games_won: number
  games_lost: number
  score: {
    win: number
    score_win: number
    lose: number
    score_lose: number
  }
}
