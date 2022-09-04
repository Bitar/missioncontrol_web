import { Team } from "../../../models/squad/Team";

export type ActivityStanding = {
  team: Team,
  score: {
    win: number,
    lose: number
  }
}