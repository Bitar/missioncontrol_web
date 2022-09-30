import axios, { AxiosResponse } from "axios";
import { ChatMessageQueryResponse } from "../../../models/chat/ChatMessage";
// import process from "process";

const API_URL = process.env.REACT_APP_API_URL
// const API_URL = 'https://v3.staging.missioncontrol.gg/api-fe'
const MATCHES_URL = `${API_URL}/matches`

const getMatchChat = (id: any): Promise<ChatMessageQueryResponse> => {
  let url = `${MATCHES_URL}/${id}/chat`

  return axios.get(url).then((response: AxiosResponse<ChatMessageQueryResponse>) => response.data)
}

export {getMatchChat}