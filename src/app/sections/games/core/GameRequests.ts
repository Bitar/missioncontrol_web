import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers'
import {Game, GameQueryResponse} from '../../../models/game/Game'
import {IgdbQueryResponse} from '../../../models/game/Igdb'
import {GameModeQueryResponse} from '../../../models/game/GameMode'
import {PlatformQueryResponse} from '../../../models/game/Platform'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/games`

export const EXPORT_ENDPOINT = `${API_URL}/export/games`

const getIgdb = (query: string): Promise<IgdbQueryResponse> => {
  return axios
    .get(`${ENDPOINT}/igdb?filter[name]=${query}`)
    .then((response: AxiosResponse<IgdbQueryResponse>) => response.data)
}

const getGames = (query?: string): Promise<GameQueryResponse> => {
  let url = `${ENDPOINT}`

  if (query) {
    url += `?${query}`
  }
  return axios.get(url).then((response: AxiosResponse<GameQueryResponse>) => response.data)
}

const getAllGames = (): Promise<GameQueryResponse> => {
  return axios
    .get(`${ENDPOINT}/all`)
    .then((response: AxiosResponse<GameQueryResponse>) => response.data)
}

const getGameById = (id: any, query?: string): Promise<Game | undefined> => {
  let url = `${ENDPOINT}/${id}`

  if (query) {
    url += `?${query}`
  }
  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}

export const createGame = (formData: FormData): Promise<Game | undefined> => {
  return axios
    .post(`${ENDPOINT}`, formData)
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}

const createGameIgdb = (igdb_id: number): Promise<Game | undefined> => {
  let formData = new FormData()
  formData.append('igdb_id', igdb_id + '')

  return axios
    .post(`${ENDPOINT}/igdb`, formData)
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}

const updateGame = (id: any, formData: FormData): Promise<Game | undefined> => {
  return axios
    .post(`${ENDPOINT}/${id}`, formData)
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}

const getAllGameModes = (gameId: any): Promise<GameModeQueryResponse> => {
  return axios
    .get(`${ENDPOINT}/${gameId}/modes`)
    .then((response: AxiosResponse<GameModeQueryResponse>) => response.data)
}

const getAllGamePlatforms = (gameId: any): Promise<PlatformQueryResponse> => {
  return axios
    .get(`${ENDPOINT}/${gameId}/platforms`)
    .then((response: AxiosResponse<PlatformQueryResponse>) => response.data)
}

export {
  getGames,
  getGameById,
  createGameIgdb,
  updateGame,
  getIgdb,
  getAllGames,
  getAllGameModes,
  getAllGamePlatforms,
}
