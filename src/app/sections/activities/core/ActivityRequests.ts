import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers'
import {Activity, ActivityQueryResponse} from '../models/Activity'
import { MatchQueryResponse } from "../models/matches/Match";
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const ACTIVITIES_URL = `${API_URL}/activities`

const getActivities = (query: string): Promise<ActivityQueryResponse> => {
  query = query + '&include=entryFee,matchPlayDate'
  return axios
    .get(`${ACTIVITIES_URL}?${query}`)
    .then((d: AxiosResponse<ActivityQueryResponse>) => d.data)
}
const createActivity = (formData: FormData): Promise<Activity | undefined> => {
  return axios
    .post(`${ACTIVITIES_URL}`, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}

const getActivityById = (id: any, query?: String): Promise<Activity | undefined> => {
  let url = `${ACTIVITIES_URL}/${id}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}

const getActivityMatches = (id: any, query?: string): Promise<MatchQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/matches`

  return axios
    .get(url)
    .then((response: AxiosResponse<MatchQueryResponse>) => response.data)
}

// const createUser = (identity: User): Promise<User | undefined> => {
//     return axios
//         .put(ROLE_URL, identity)
//         .then((response: AxiosResponse<Response<User>>) => response.data)
//         .then((response: Response<User>) => response.data)
// }
//
// const updateUser = (identity: User): Promise<User | undefined> => {
//     return axios
//         .post(`${ROLE_URL}/${identity.id}`, identity)
//         .then((response: AxiosResponse<Response<User>>) => response.data)
//         .then((response: Response<User>) => response.data)
// }
//
// const deleteUser = (userId: ID): Promise<void> => {
//     return axios.delete(`${ROLE_URL}/${userId}`).then(() => {})
// }
//
// const deleteSelectedUsers = (userIds: Array<ID>): Promise<void> => {
//     const requests = userIds.map((id) => axios.delete(`${ROLE_URL}/${id}`))
//     return axios.all(requests).then(() => {})
// }

export {getActivities, createActivity, getActivityById, getActivityMatches}
