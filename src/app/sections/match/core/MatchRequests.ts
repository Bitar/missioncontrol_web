import axios, { AxiosResponse } from "axios";
import { ChatMessage, ChatMessageQueryResponse } from "../../../models/chat/ChatMessage";
import { Response } from "../../../helpers/crud-helper/models";
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