import axios, {AxiosResponse} from 'axios'
import {ChatMessage, ChatMessageQueryResponse} from '../../../models/chat/ChatMessage'
import {Response} from '../../../helpers/crud-helper/models'
import {Match} from '../../activity/models/matches/Match'
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const MATCHES_URL = `${API_URL}/matches`

export const getMatchChat = (id: any): Promise<ChatMessageQueryResponse> => {
  let url = `${MATCHES_URL}/${id}/chat`

  return axios.get(url).then((response: AxiosResponse<ChatMessageQueryResponse>) => response.data)
}

export const sendMatchChat = (id: any, formData: FormData): Promise<ChatMessage | undefined> => {
  let url = `${MATCHES_URL}/${id}/chat`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<ChatMessage>>) => response.data)
    .then((response: Response<ChatMessage>) => response.data)
}

export const updateMatchResult = (id: any, formData: FormData): Promise<Match | undefined> => {
  let url = `${MATCHES_URL}/${id}/results`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Match>>) => response.data)
    .then((response: Response<Match>) => response.data)
}

export const rejectMatchDispute = (id: any): Promise<Match | undefined> => {
  let url = `${MATCHES_URL}/${id}/dispute/reject`

  return axios
    .post(url)
    .then((response: AxiosResponse<Response<Match>>) => response.data)
    .then((response: Response<Match>) => response.data)
}

export const approveMatchDispute = (id: any, formData: FormData): Promise<Match | undefined> => {
  let url = `${MATCHES_URL}/${id}/dispute/approve`

  return axios
    .post(url, formData)
    .then((response: AxiosResponse<Response<Match>>) => response.data)
    .then((response: Response<Match>) => response.data)
}
