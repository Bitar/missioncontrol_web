import { ID, Response } from "../../../../_metronic/helpers";

export type ScoringKey = {
  id?: ID
  key: string
  type: number
}

export type ScoringKeyQueryResponse = Response<Array<ScoringKey>>