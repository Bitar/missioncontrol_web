import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers'
import {Community, CommunityQueryResponse} from '../../../models/community/Community'
import {ActivityQueryResponse} from '../../../models/activity/Activity'
import {UserQueryResponse} from '../../iam/user/core/User'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/communities`
const ENDPOINT_ADMIN = `${API_URL}/admin/communities`

export const EXPORT_ENDPOINT = `${API_URL}/export/communities`

const getCommunities = (query: String): Promise<CommunityQueryResponse> => {
  return axios
    .get(`${ENDPOINT}?${query}`)
    .then((response: AxiosResponse<CommunityQueryResponse>) => response.data)
}

const getAllCommunities = (): Promise<CommunityQueryResponse> => {
  return axios
    .get(`${ENDPOINT}/all`)
    .then((response: AxiosResponse<CommunityQueryResponse>) => response.data)
}

const getCommunityById = (id: any, query?: string): Promise<Community | undefined> => {
  let url = `${ENDPOINT}/${id}`

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
    .post(`${ENDPOINT}`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const createAdminCommunity = (formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${ENDPOINT_ADMIN}/create`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const updateAdminCommunity = (formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${ENDPOINT_ADMIN}/`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const updateCommunity = (id: any, formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${ENDPOINT}/${id}`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

export const updateCommunitySubscription = (
  id: any,
  formData: FormData
): Promise<Community | undefined> => {
  return axios
    .post(`${ENDPOINT}/${id}/subscriptions`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

const getCommunityActivities = (id: any): Promise<ActivityQueryResponse> => {
  return axios
    .get(`${ENDPOINT}/${id}/activities`)
    .then((response: AxiosResponse<ActivityQueryResponse>) => response.data)
}

const getCommunityUsers = (id: any, query?: string): Promise<UserQueryResponse> => {
  let url = `${ENDPOINT}/${id}/users?${query}`

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
