import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers'
import {Game, GameQueryResponse} from '../../../models/game/Game'
import {IgdbQueryResponse} from '../../../models/game/Igdb'
import {GameModeQueryResponse} from '../../../models/game/GameMode'
import {PlatformQueryResponse} from '../../../models/game/Platform'

const API_URL = process.env.REACT_APP_API_URL
const GET_GAMES_URL = `${API_URL}/games`

const getIgdb = (query: string): Promise<IgdbQueryResponse> => {
  return axios
    .get(`${GET_GAMES_URL}/igdb/search?filter[name]=${query}`)
    .then((response: AxiosResponse<IgdbQueryResponse>) => response.data)
}

const getGames = (query?: string): Promise<GameQueryResponse> => {
  let url = `${GET_GAMES_URL}`

  if (query) {
    url += `?${query}`
  }
  return axios.get(url).then((response: AxiosResponse<GameQueryResponse>) => response.data)
}

const getAllGames = (): Promise<GameQueryResponse> => {
  return axios
    .get(`${GET_GAMES_URL}/all`)
    .then((response: AxiosResponse<GameQueryResponse>) => response.data)
}

const getGameById = (id: any, query?: string): Promise<Game | undefined> => {
  let url = `${GET_GAMES_URL}/${id}`

  if (query) {
    url += `?${query}`
  }
  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}

const createGame = (igdb_id: number): Promise<Game | undefined> => {
  let formData = new FormData();
  formData.append('igdb_id', igdb_id + '');

  return axios
    .post(`${GET_GAMES_URL}`, formData)
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}

const updateGame = (id: any, formData: FormData): Promise<Game | undefined> => {
  return axios
    .post(`${GET_GAMES_URL}/${id}`, formData)
    .then((response: AxiosResponse<Response<Game>>) => response.data)
    .then((response: Response<Game>) => response.data)
}

const getAllGameModes = (gameId: any): Promise<GameModeQueryResponse> => {
  return axios
    .get(`${GET_GAMES_URL}/${gameId}/modes`)
    .then((response: AxiosResponse<GameModeQueryResponse>) => response.data)
}

const getAllGamePlatforms = (gameId: any): Promise<PlatformQueryResponse> => {
  return axios
    .get(`${GET_GAMES_URL}/${gameId}/platforms`)
    .then((response: AxiosResponse<PlatformQueryResponse>) => response.data)
}

export {
  getGames,
  getGameById,
  createGame,
  updateGame,
  getIgdb,
  getAllGames,
  getAllGameModes,
  getAllGamePlatforms,
}
