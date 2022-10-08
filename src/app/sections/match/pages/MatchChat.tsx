import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {ChatMessage} from '../../../models/chat/ChatMessage'
import {getMatchChat} from '../core/MatchRequests'
import { MatchChatInner } from "./MatchChatInner";

const MatchChat = () => {
  const params = useParams()

  const [chat, setChat] = useState<ChatMessage[] | undefined>([])

  useEffect(() => {
    getMatchChat(params.matchId).then((response) => {
      setChat(response?.data?.reverse())
    })
  }, [params.matchId])

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-lg-row-fluid'>
        <div className='card' id='kt_chat_messenger'>
          <MatchChatInner chat={chat} setChat={setChat} />
        </div>
      </div>
    </div>
  )
}

export { MatchChat };