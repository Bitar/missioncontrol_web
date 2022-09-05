import axios, {AxiosResponse} from 'axios'
import {Response} from '../../../../_metronic/helpers'
import {Activity, ActivityQueryResponse} from '../models/Activity'
import {Match, MatchQueryResponse} from '../models/matches/Match'
import {Announcement} from '../../../models/announcement/Announcements'
import {ChatMessage, ChatMessageQueryResponse} from '../../../models/chat/ChatMessage'
import {UserQueryResponse} from '../../identity/user/models/User'
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

  return axios.get(url).then((response: AxiosResponse<MatchQueryResponse>) => response.data)
}

const getActivityMatch = (id: any, matchId: any): Promise<Match | undefined> => {
  let url = `${ACTIVITIES_URL}/${id}/matches/${matchId}`

  return axios
    .get(url)
    .then((response: AxiosResponse<Response<Match>>) => response.data)
    .then((response: Response<Match>) => response.data)
}

const getActivityMembers = (id: any, query?: string): Promise<UserQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/members`

  return axios.get(url).then((response: AxiosResponse<UserQueryResponse>) => response.data)
}

const createActivityAnnouncement = (
  id: any,
  formData: FormData
): Promise<Announcement | undefined> => {
  let url = `${ACTIVITIES_URL}/${id}/announcements`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Announcement>>) => response.data)
    .then((response: Response<Announcement>) => response.data)
}

const getActivityChat = (id: any): Promise<ChatMessageQueryResponse> => {
  let url = `${ACTIVITIES_URL}/${id}/chat`

  return axios.get(url).then((response: AxiosResponse<ChatMessageQueryResponse>) => response.data)
}

const sendActivityChat = (id: any, formData: FormData): Promise<ChatMessage | undefined> => {
  let url = `${ACTIVITIES_URL}/${id}/chat`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<ChatMessage>>) => response.data)
    .then((response: Response<ChatMessage>) => response.data)
}

export {
  getActivities,
  createActivity,
  getActivityChat,
  getActivityById,
  sendActivityChat,
  getActivityMatch,
  getActivityMatches,
  getActivityMembers,
  createActivityAnnouncement,
}