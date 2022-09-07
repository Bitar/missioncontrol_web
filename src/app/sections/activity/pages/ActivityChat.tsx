import {Activity} from '../models/Activity'
import {Dispatch, FC, SetStateAction, useEffect, useState} from 'react'
import {ActivityChatInner} from './ActivityChatInner'
import {useParams} from 'react-router-dom'
import {ChatMessage} from '../../../models/chat/ChatMessage'
import {getActivityChat} from '../core/ActivityRequests'

type Props = {
  activity: Activity | undefined
  setActivity: Dispatch<SetStateAction<Activity | undefined>>
}

const ActivityChat: FC<Props> = ({activity, setActivity}) => {
  const params = useParams()

  const [chat, setChat] = useState<ChatMessage[] | undefined>([])

  useEffect(() => {
    getActivityChat(params.id).then((response) => {
      setChat(response?.data?.reverse())
    })
  }, [params.id])

  return (
    <div className='d-flex flex-column flex-lg-row'>
      <div className='flex-lg-row-fluid'>
        <div className='card' id='kt_chat_messenger'>
          <ActivityChatInner chat={chat} setChat={setChat} />
        </div>
      </div>
    </div>
  )
}

export {ActivityChat}
