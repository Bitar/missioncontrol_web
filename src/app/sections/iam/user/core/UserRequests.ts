import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../../_metronic/helpers'
import {User, UserQueryResponse} from './User'
import {ActivityQueryResponse} from '../../../../models/activity/Activity'
import {TeamQueryResponse} from '../../../../models/squad/Team'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/iam/users`

export const EXPORT_ENDPOINT = `${API_URL}/export/users`

const getUsers = (query: string): Promise<UserQueryResponse> => {
  let url = `${ENDPOINT}`

  if (query) {
    url += `?include=roles&${query}`
  }

  return axios.get(`${url}`).then((d: AxiosResponse<UserQueryResponse>) => d.data)
}

const getUserById = (id: any, query?: string): Promise<User | undefined> => {
  let url = `${ENDPOINT}/${id}`

  if (query) {
    url += `?${query}`
  }
  return axios
    .get(`${url}`)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const createUser = (formData: FormData): Promise<User | undefined> => {
  return axios
    .post(`${ENDPOINT}`, formData)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const updateUser = (id: any, formData: FormData): Promise<User | undefined> => {
  return axios
    .post(`${ENDPOINT}/${id}`, formData)
    .then((response: AxiosResponse<Response<User>>) => response.data)
    .then((response: Response<User>) => response.data)
}

const getUserActivities = (id: any, query?: string): Promise<ActivityQueryResponse> => {
  let url = `${ENDPOINT}/${id}/activities`

  if (query) {
    url += `?${query}`
  }

  return axios.get(`${url}`).then((d: AxiosResponse<ActivityQueryResponse>) => d.data)
}

const getUserTeams = (id: any, query?: string): Promise<TeamQueryResponse> => {
  let url = `${ENDPOINT}/${id}/teams`

  if (query) {
    url += `?${query}`
  }

  return axios.get(`${url}`).then((d: AxiosResponse<TeamQueryResponse>) => d.data)
}

export {getUsers, getUserById, createUser, updateUser, getUserActivities, getUserTeams}
