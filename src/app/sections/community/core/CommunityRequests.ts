import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers'
import {Community, CommunityQueryResponse} from '../models/Community'
import {ActivityQueryResponse} from '../../activity/models/Activity'
import {UserQueryResponse} from '../../identity/user/models/User'

const API_URL = process.env.REACT_APP_API_URL
const GET_COMMUNITIES_URL = `${API_URL}/communities`
const GET_ADMIN_COMMUNITIES_URL = `${API_URL}/admin/communities`

const getCommunities = (query: String): Promise<CommunityQueryResponse> => {
  return axios
    .get(`${GET_COMMUNITIES_URL}?${query}`)
    .then((response: AxiosResponse<CommunityQueryResponse>) => response.data)
}

const getAllCommunities = (): Promise<CommunityQueryResponse> => {
  return axios
    .get(`${GET_COMMUNITIES_URL}/all`)
    .then((response: AxiosResponse<CommunityQueryResponse>) => response.data)
}

const getCommunityById = (id: any, query?: string): Promise<Community | undefined> => {
  let url = `${GET_COMMUNITIES_URL}/${id}`

  if (query) {
    url += `?${query}`
  }
  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const createCommunity = (formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${GET_COMMUNITIES_URL}`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const createAdminCommunity = (formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${GET_ADMIN_COMMUNITIES_URL}/create`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const updateAdminCommunity = (formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${GET_ADMIN_COMMUNITIES_URL}/`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const updateCommunity = (id: any, formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${GET_COMMUNITIES_URL}/${id}`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

export const updateCommunitySubscription = (
  id: any,
  formData: FormData
): Promise<Community | undefined> => {
  return axios
    .post(`${GET_COMMUNITIES_URL}/${id}/subscriptions`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const getCommunityActivities = (id: any): Promise<ActivityQueryResponse> => {
  return axios
    .get(`${GET_COMMUNITIES_URL}/${id}/activities`)
    .then((response: AxiosResponse<ActivityQueryResponse>) => response.data)
}

const getCommunityUsers = (id: any, query?: string): Promise<UserQueryResponse> => {
  let url = `${GET_COMMUNITIES_URL}/${id}/users?${query}`

  return axios.get(url).then((response: AxiosResponse<UserQueryResponse>) => response.data)
}

export {
  getCommunities,
  createCommunity,
  updateCommunity,
  getCommunityById,
  getCommunityUsers,
  getAllCommunities,
  createAdminCommunity,
  updateAdminCommunity,
  getCommunityActivities,
}
