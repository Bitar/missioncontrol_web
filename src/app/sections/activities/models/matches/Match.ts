import { ID, Response } from "../../../../../_metronic/helpers";
import { Round } from "./Round";
import { Team } from "../../../../models/squad/Team";

export type Match = {
  id?: ID
  start_date: number,
  end_date: number
  timezone: string,
  status: number,
  rounds: Round[],
  teams?: Team[],
  additional_data?: {
    session: {
      current: number,
      total: number
    }
  }
}

export const initialMatch = (match?: Match) => {
  return {
    start_date: match?.start_date || 0,
    end_date: match?.end_date || 0,
    timezone: match?.timezone || "",
    status: match?.status || 0 ,
    rounds: match?.rounds || []
  }
}

export type MatchQueryResponse = Response<Array<Match>>