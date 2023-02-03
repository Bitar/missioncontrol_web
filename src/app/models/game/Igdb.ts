import {Response} from '../../../_metronic/helpers'

export type Igdb = {
  id?: number
  title: string
  image: string
}

export type IgdbQueryResponse = Response<Array<Igdb>>
