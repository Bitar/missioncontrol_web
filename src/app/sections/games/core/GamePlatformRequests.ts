import {Platform, PlatformQueryResponse} from '../../../models/game/Platform'
import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../helpers/crud-helper/models'

const API_URL = process.env.REACT_APP_API_URL
const GAMES_URL = `${API_URL}/games`

export const getGamePlatforms = (id: any, query?: String): Promise<PlatformQueryResponse> => {
  let url = `${GAMES_URL}/${id}/platforms`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<PlatformQueryResponse>) => response.data)
}

export const addGamePlatform = (id: any, formData: FormData): Promise<Platform | undefined> => {
  let url = `${GAMES_URL}/${id}/platforms`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Platform>>) => response.data)
    .then((response: Response<Platform>) => response.data)
}
