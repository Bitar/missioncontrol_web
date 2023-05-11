import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers'
import {Community, CommunityQueryResponse} from '../../../models/community/Community'
import {ActivityQueryResponse} from '../../../models/activity/Activity'
import {UserQueryResponse} from '../../../models/iam/User'
import {Announcement} from '../../../models/announcement/Announcements'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/communities`
const ENDPOINT_ADMIN = `${API_URL}/admin/communities`

export const EXPORT_ENDPOINT = `${API_URL}/export/communities`

export const getCommunities = (query: String): Promise<CommunityQueryResponse> => {
  return axios
    .get(`${ENDPOINT}?${query}`)
    .then((response: AxiosResponse<CommunityQueryResponse>) => response.data)
}

export const getAllCommunities = (): Promise<CommunityQueryResponse> => {
  return axios
    .get(`${ENDPOINT}/all`)
    .then((response: AxiosResponse<CommunityQueryResponse>) => response.data)
}

export const getCommunityById = (id: any, query?: string): Promise<Community | undefined> => {
  let url = `${ENDPOINT}/${id}`

  if (query) {
    url += `?${query}`
  }
  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

export const createCommunity = (formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${ENDPOINT}`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

export const createAdminCommunity = (formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${ENDPOINT_ADMIN}/create`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

export const createAdminCommunityCommissioner = (
  formData: FormData
): Promise<Community | undefined> => {
  return axios
    .post(`${ENDPOINT_ADMIN}/commissioner`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

export const updateAdminCommunity = (formData: FormData): Promise<Community | undefined> => {
  return axios
    .post(`${ENDPOINT_ADMIN}/`, formData)
    .then((response: AxiosResponse<Response<Community>>) => response.data)
    .then((response: Response<Community>) => response.data)
}

export const updateCommunity = (id: any, formData: FormData): Promise<Community | undefined> => {
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

export const getCommunityActivities = (id: any, query?: string): Promise<ActivityQueryResponse> => {
  let url = `${ENDPOINT}/${id}/activities?${query}`

  return axios.get(url).then((response: AxiosResponse<ActivityQueryResponse>) => response.data)
}

export const getCommunityUsers = (id: any, query?: string): Promise<UserQueryResponse> => {
  let url = `${ENDPOINT}/${id}/users?${query}`

  return axios.get(url).then((response: AxiosResponse<UserQueryResponse>) => response.data)
}

export const getCommunityAnnouncements = (id: any, query?: string): Promise<Announcement[]> => {
  let url = `${ENDPOINT}/${id}/announcements`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<Announcement[]>) => response.data)
}

export const createCommunityAnnouncement = (
  id: any,
  formData: FormData
): Promise<Announcement | undefined> => {
  let url = `${ENDPOINT}/${id}/announcements`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Announcement>>) => response.data)
    .then((response: Response<Announcement>) => response.data)
}

export const getSingleCommunityAnnouncements = (
  activityId: number,
  id: any,
  query?: string
): Promise<Announcement | undefined> => {
  let url = `${ENDPOINT}/${activityId}/announcements/${id}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Announcement>>) => response.data)
    .then((response: Response<Announcement>) => response.data)
}

export const updateCommunityAnnouncement = (
  activityId: number,
  id: any,
  formData: FormData
): Promise<Announcement | undefined> => {
  let url = `${ENDPOINT}/${activityId}/announcements/${id}`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Announcement>>) => response.data)
    .then((response: Response<Announcement>) => response.data)
}
