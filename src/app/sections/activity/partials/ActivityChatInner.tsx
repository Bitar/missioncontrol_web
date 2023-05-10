import React, {FC, useEffect, useRef, useState} from 'react'
import clsx from 'clsx'
import {ChatMessage, chatSchema, initialChat} from '../../../models/chat/ChatMessage'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {ErrorMessage, Form, Formik} from 'formik'
import {jsonToFormData} from '../../../helpers/form/FormHelper'
import {
  deleteActivityChat,
  getActivityChat,
  sendActivityChat,
} from '../core/requests/ActivityRequests'
import {useParams} from 'react-router-dom'
import {useAuth} from '../../../modules/auth'
import AutoResizableTextarea from '../../../components/form/AutoResizableTextarea'
import {useChannels} from '../ChatChannelProvider'
import {useActivity} from '../core/contexts/ActivityContext'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'
import axios from 'axios'

dayjs.extend(relativeTime)

const ActivityChatInner: FC = () => {
  const chatMessagesRef = useRef<HTMLDivElement | null>(null)
  const [page, setPage] = useState<number>(1)
  const {activity} = useActivity()
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const params = useParams()
  const {currentUser} = useAuth()
  const [message, setMessage] = useState<ChatMessage>(initialChat())
  const channels = useChannels()
  const hasUserScrolledUp = useRef(false)
  const scrollPositionPreLoad = useRef(0)
  const hasMoreLoad = useRef(true)

  useEffect(() => {
    const chatMessagesDiv = chatMessagesRef.current
    if (chatMessagesDiv && !hasUserScrolledUp.current) {
      chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight - chatMessagesDiv.clientHeight
    }

    if (chatMessagesDiv && scrollPositionPreLoad.current && scrollPositionPreLoad.current > 0) {
      chatMessagesDiv.scrollTop = scrollPositionPreLoad.current
    }
  }, [chatMessages])

  const handleSubmit = () => {
    let data = jsonToFormData(message)
    sendActivityChat(params.id, data).then(() => {
      setMessage(initialChat())
    })
  }

  const handleOnChange = (e: any) => {
    setMessage({message: e.target.value})
  }

  const deleteMessage = async (messageId: number) => {
    if (!activity) return

    const {isConfirmed} = await Swal.fire({
      text: 'Are you sure you want to delete this item?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm Delete',
      confirmButtonColor: '#DB4437',
      cancelButtonText: 'Dismiss',
      reverseButtons: true,
    })

    if (isConfirmed && activity?.id) {
      deleteActivityChat(activity?.id, messageId)
        .then(() => {
          toast.success('Deleted Successfully')

          setChatMessages(chatMessages.filter((message) => message.id !== messageId))
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            // we need to show the error
            Swal.fire('Not Allowed', '<p>' + error?.response?.data?.errors + '</p>', 'error')
          } else if (error === undefined) {
            // we need to show a generic error
            Swal.fire(
              'Something Wrong Happened',
              '<p>Could not complete your request. Please try again later.</p>',
              'error'
            )
          }
        })
    }
  }

  useEffect(() => {
    if (!activity?.id) {
      return
    }

    loadChat(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity?.id])

  useEffect(() => {
    if (!channels || !activity?.id) {
      return
    }

    channels.private(`activity-${activity?.id}-chat`).listen('.MessageSent', (e: any) => {
      setChatMessages([...chatMessages, e])
    })
  }, [activity?.id, channels, chatMessages])

  const loadChat = (page: number) => {
    getActivityChat(activity?.id, `page=${page}`).then((response) => {
      if (response.data) {
        response?.data?.reverse()

        setChatMessages([...response?.data, ...chatMessages])
        setPage((page) => page + 1)

        if (response.meta && response.meta.last_page === response.meta?.current_page) {
          hasMoreLoad.current = false
        } else {
          if (scrollPositionPreLoad) {
            scrollPositionPreLoad.current = chatMessagesRef?.current?.scrollHeight ?? 0
          }
        }
      }
    })
  }

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop === 0) {
      if (hasMoreLoad.current) {
        hasUserScrolledUp.current = true
        loadChat(page)
      }
    }
  }

  return (
    <div className='card-body' id={'kt_chat_messenger_body'}>
      <div className='scroll-y mh-600px' ref={chatMessagesRef} onScroll={handleScroll}>
        {chatMessages?.map((message, index) => {
          const userInfo = message?.user
          const state = message?.user?.id !== currentUser?.id ? 'info' : 'primary'
          const alignmentClass = message?.user?.id !== currentUser?.id ? 'start' : 'end'
          const teamInfo = message?.team

          return (
            <div
              key={`message${index}`}
              className={`d-flex justify-content-${alignmentClass} mb-10 chat-message`}>
              <div
                className={`d-flex flex-column align-items align-items-${alignmentClass} position-relative`}>
                <div className='d-flex align-items-center mb-2'>
                  {message?.user?.id !== currentUser?.id ? (
                    <>
                      <div className='symbol  symbol-35px symbol-circle '>
                        <img alt='Pic' src={`${userInfo?.meta?.image}`} />
                      </div>
                      <div className='ms-3'>
                        <span className='fs-5 fw-bolder text-gray-900 me-1'>{userInfo?.name}</span>
                        <span className='text-muted fs-7 mb-1'>
                          {message?.created_at &&
                            dayjs(new Date(message?.created_at * 1000)).fromNow()}
                        </span>

                        <span
                          className='ms-2 chat-message-delete'
                          onClick={() => {
                            message.id && deleteMessage(message?.id)
                          }}>
                          <i className='fa-duotone fa-trash text-danger'></i>
                        </span>

                        <div className={'text-mc-secondary fs-7'}>{teamInfo?.name}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='me-3 text-end'>
                        <span
                          className='me-2 chat-message-delete'
                          onClick={() => {
                            message.id && deleteMessage(message?.id)
                          }}>
                          <i className='fa-duotone fa-trash text-danger'></i>
                        </span>
                        <span className='text-muted fs-7 mb-1'>
                          {message?.created_at &&
                            dayjs(new Date(message?.created_at * 1000)).fromNow()}
                        </span>
                        <span className='fs-5 fw-bolder text-gray-900 ms-1'>You</span>
                        <div className='text-mc-secondary fs-7'>{teamInfo?.name}</div>
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
                  style={{whiteSpace: 'pre-wrap'}}
                  data-kt-element='message-text'
                  dangerouslySetInnerHTML={{__html: message.message}}></div>
              </div>
            </div>
          )
        })}
      </div>

      <Formik
        initialValues={initialChat(message)}
        onSubmit={handleSubmit}
        validationSchema={chatSchema}
        enableReinitialize>
        {({isSubmitting}) => (
          <Form onChange={handleOnChange} className='form'>
            <div className='row mb-6'>
              <div className='fv-row'>
                <AutoResizableTextarea
                  name='message'
                  value={message.message}
                  placeholder='Message'
                />
                <div className='text-danger mt-2'>
                  <ErrorMessage name='message' />
                </div>

                <div className='text-end'>
                  <button
                    type='submit'
                    className='btn btn-mc-secondary btn-active-mc-secondary btn-sm'
                    disabled={isSubmitting}>
                    <span className='indicator-label'>{'Send'}</span>
                    {isSubmitting && (
                      <span className='indicator-progress' style={{display: 'inline-block'}}>
                        <span className='spinner-border spinner-border-sm align-middle ms-2' />
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div
              className='card-footer d-flex justify-content-end py-6 px-9'
              id='kt_chat_messenger_footer'></div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export {ActivityChatInner}
