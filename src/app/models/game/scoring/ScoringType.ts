import {ID, Response} from '../../../helpers/crud-helper/models'

export type ScoringType = {
  id?: number
  name: string
  description: string
}

export type ScoringTypeQueryResponse = Response<Array<ScoringType>>
