import {Match, MatchQueryResponse} from '../../../../models/activity/matches/Match'
import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../helpers/crud-helper/models'

const API_URL = process.env.REACT_APP_API_URL
const ACTIVITIES_URL = `${API_URL}/activities`

export const getActivityMatches = (id: any, query?: string): Promise<MatchQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/matches`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<MatchQueryResponse>) => response.data)
}

export const getUpcomingActivityMatches = (
  id: any,
  query?: string
): Promise<MatchQueryResponse> => {
  let q = 'filter[status]=1,2'

  return getActivityMatches(id, q)
}

export const getRecentActivityMatches = (id: any, query?: string): Promise<MatchQueryResponse> => {
  let q = 'filter[status]=3,4,5,6,7'

  return getActivityMatches(id, q)
}

export const getDisputedActivityMatches = (
  id: any,
  query?: string
): Promise<MatchQueryResponse> => {
  let q = 'filter[status]=4,6,7'

  return getActivityMatches(id, q)
}

export const getActivityMatch = (id: any, matchId: any): Promise<Match | undefined> => {
  let url = `${ACTIVITIES_URL}/${id}/matches/${matchId}`

  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Match>>) => response.data)
    .then((response: Response<Match>) => response.data)
}
