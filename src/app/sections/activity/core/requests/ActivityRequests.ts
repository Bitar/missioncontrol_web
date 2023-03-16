import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../../_metronic/helpers'
import {Activity, ActivityQueryResponse} from '../../../../models/activity/Activity'
import {Announcement} from '../../../../models/announcement/Announcements'
import {ChatMessage, ChatMessageQueryResponse} from '../../../../models/chat/ChatMessage'
import {TeamQueryResponse} from '../../../../models/squad/Team'
import {UserQueryResponse} from '../../../iam/user/core/User'

const API_URL = process.env.REACT_APP_API_URL
const ENDPOINT = `${API_URL}/activities`

export const EXPORT_ENDPOINT = `${API_URL}/export/activities`

export const getActivities = (query: string): Promise<ActivityQueryResponse> => {
  return axios.get(`${ENDPOINT}?${query}`).then((d: AxiosResponse<ActivityQueryResponse>) => d.data)
}

export const createActivity = (formData: FormData): Promise<Activity | undefined> => {
  return axios
    .post(`${ENDPOINT}`, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}

export const updateActivity = (id: any, formData: FormData): Promise<Activity | undefined> => {
  return axios
    .post(`${ENDPOINT}/${id}`, formData)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}
export const getActivityById = (id: any, query?: String): Promise<Activity | undefined> => {
  let url = `${ENDPOINT}/${id}`

  if (query) {
    url += `?${query}`
  }

  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Activity>>) => response.data)
    .then((response: Response<Activity>) => response.data)
}
export const getActivityTeams = (id: any, query?: string): Promise<TeamQueryResponse> => {
  let url = `${ENDPOINT}/${id}/teams`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<TeamQueryResponse>) => response.data)
}
export const getActivityMembers = (id: any, query?: string): Promise<UserQueryResponse> => {
  let url = `${ENDPOINT}/${id}/members`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<UserQueryResponse>) => response.data)
}
export const getActivityStandings = (id: any, query?: string): Promise<TeamQueryResponse> => {
  let url = `${ENDPOINT}/${id}/standings`

  if (query) {
    url += `?${query}`
  }

  return axios.get(url).then((response: AxiosResponse<TeamQueryResponse>) => response.data)
}

export const createActivityAnnouncement = (
  id: any,
  formData: FormData
): Promise<Announcement | undefined> => {
  let url = `${ENDPOINT}/${id}/announcements`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Announcement>>) => response.data)
    .then((response: Response<Announcement>) => response.data)
}

export const getActivityChat = (id: any): Promise<ChatMessageQueryResponse> => {
  let url = `${ENDPOINT}/${id}/chat`

  return axios.get(url).then((response: AxiosResponse<ChatMessageQueryResponse>) => response.data)
}

export const sendActivityChat = (id: any, formData: FormData): Promise<ChatMessage | undefined> => {
  let url = `${ENDPOINT}/${id}/chat`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<ChatMessage>>) => response.data)
    .then((response: Response<ChatMessage>) => response.data)
}

export const validateCreatePlayoffs = (formData: FormData) => {
  let url = `${ENDPOINT}/validate-playoffs`

  return axios.post(url, formData)
}
