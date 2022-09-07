import {ID, Response} from '../../../_metronic/helpers'
import {User} from '../../sections/identity/user/models/User'
import * as Yup from 'yup'

export const chatSchema = Yup.object().shape({
  message: Yup.string().required('Message is required'),
})

export type ChatMessage = {
  id?: ID
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
