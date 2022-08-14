import {ID, Response} from '../../../_metronic/helpers'
import {Platform} from './Platform'

export type Game = {
  id?: ID
  title: string
  description?: string
  is_featured: boolean
  is_crossplay: boolean
  image: string
  platforms: Platform[]
}

export const initialGame = {
  title: '',
  is_crossplay: false,
  is_featured: false,
  description: '',
  image: '',
  game: {},
  platforms: [],
}

export type GameQueryResponse = Response<Array<Game>>
