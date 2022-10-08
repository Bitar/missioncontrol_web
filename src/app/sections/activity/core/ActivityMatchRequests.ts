import { Match, MatchQueryResponse } from "../models/matches/Match";
import axios, { AxiosResponse } from "axios";
import { Response } from "../../../helpers/crud-helper/models";

const API_URL = process.env.REACT_APP_API_URL
const ACTIVITIES_URL = `${API_URL}/activities`

export const getActivityMatches = (id: any, query?: string): Promise<MatchQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/matches`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<MatchQueryResponse>) => response.data)
}

export const getUpcomingActivityMatches = (id: any, query?: string): Promise<MatchQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/matches/upcoming`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<MatchQueryResponse>) => response.data)
}

export const getRecentActivityMatches = (id: any, query?: string): Promise<MatchQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/matches/recent`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<MatchQueryResponse>) => response.data)
}

export const getActivityMatch = (id: any, matchId: any): Promise<Match | undefined> => {
  let url = `${ACTIVITIES_URL}/${id}/matches/${matchId}`

  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Match>>) => response.data)
    .then((response: Response<Match>) => response.data)
}