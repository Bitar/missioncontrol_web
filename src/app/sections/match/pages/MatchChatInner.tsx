import React, {Dispatch, FC, SetStateAction, useEffect, useRef} from 'react'
import clsx from 'clsx'
import {ChatMessage} from '../../../models/chat/ChatMessage'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {useAuth} from '../../../modules/auth'

type Props = {
  chat: ChatMessage[] | undefined
  setChat: Dispatch<SetStateAction<ChatMessage[] | undefined>>
  isDrawer?: boolean
}

const MatchChatInner: FC<Props> = ({chat, isDrawer = false}) => {
  dayjs.extend(relativeTime)
  const bottomRef = useRef<null | HTMLDivElement>(null)
  const {currentUser} = useAuth()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [chat])

  return (
    <div className='card-body' id={'kt_chat_messenger_body'}>
      <div className='scroll-y mh-600px'>
        {chat && chat?.length > 0 ? (
          chat?.map((message, index) => {
            const userInfo = message?.user
            const state = message?.user?.id !== currentUser?.id ? 'info' : 'primary'
            const templateAttr = {}
            const contentClass = `${isDrawer ? '' : 'd-flex'} justify-content-${
              message?.user?.id !== currentUser?.id ? 'start' : 'end'
            } mb-10`
            return (
              <div
                key={`message${index}`}
                className={clsx('d-flex', contentClass, 'mb-10')}
                {...templateAttr}>
                <div
                  className={clsx(
                    'd-flex flex-column align-items',
                    `align-items-${message?.user?.id !== currentUser?.id ? 'start' : 'end'}`
                  )}>
                  <div className='d-flex align-items-center mb-2'>
                    {message?.user?.id !== currentUser?.id ? (
                      <>
                        <div className='symbol  symbol-35px symbol-circle '>
                          <img alt='Pic' src={`${userInfo?.meta?.image}`} />
                        </div>
                        <div className='ms-3'>
                          <span className='fs-5 fw-bolder text-gray-900 me-1'>
                            {userInfo?.name}
                          </span>
                          {message?.created_at &&
                            dayjs(new Date(message?.created_at * 1000)).fromNow()}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className='me-3'>
                          <span className='text-muted fs-7 mb-1'>
                            {message?.created_at &&
                              dayjs(new Date(message?.created_at * 1000)).fromNow()}
                          </span>
                          <span className='fs-5 fw-bolder text-gray-900 ms-1'>You</span>
                        </div>
                        <div className='symbol  symbol-35px symbol-circle '>
                          <img alt='Pic' src={`${userInfo?.meta?.image}`} />
                        </div>
                      </>
                    )}
                  </div>

                  <div
                    className={clsx(
                      'p-5 rounded',
                      `bg-light-${state}`,
                      'text-dark fw-bold mw-lg-400px',
                      `text-${message?.user?.id !== currentUser?.id ? 'start' : 'end'}`
                    )}
                    data-kt-element='message-text'
                    dangerouslySetInnerHTML={{__html: message.message}}></div>
                </div>
              </div>
            )
          })
        ) : (
          <>No Messages</>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export {MatchChatInner}
