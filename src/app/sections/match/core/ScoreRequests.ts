import axios, {AxiosResponse} from 'axios'
import {Match} from '../../activity/models/matches/Match'
import {Response} from '../../../helpers/crud-helper/models'

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const MATCHES_URL = `${API_URL}/matches`

export const updateScores = (id: any, formData: FormData): Promise<Match | undefined> => {
  let url = `${MATCHES_URL}/${id}/scores`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Match>>) => response.data)
    .then((response: Response<Match>) => response.data)
}
