import {Response} from '../../../_metronic/helpers'
import {User} from '../iam/User'
import * as Yup from 'yup'

export const chatSchema = Yup.object().shape({
  message: Yup.string().required('Message is required'),
})

export type ChatMessage = {
  id?: number
  message: string
  user?: User
  team_id?: number
  created_at?: number
}

export const initialChat = (chatMessage?: ChatMessage) => {
  return {
    message: chatMessage?.message || '',
  }
}

export type ChatMessageQueryResponse = Response<Array<ChatMessage>>
