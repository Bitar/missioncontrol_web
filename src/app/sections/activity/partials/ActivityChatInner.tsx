import React, { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ChatMessage, chatSchema, initialChat } from "../../../models/chat/ChatMessage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ErrorMessage, Form, Formik } from "formik";
import { jsonToFormData } from "../../../helpers/form/FormHelper";
import { deleteActivityChat, getActivityChat, sendActivityChat } from "../core/requests/ActivityRequests";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../modules/auth";
import AutoResizableTextarea from "../../../components/form/AutoResizableTextarea";
import { FormAction } from "../../../helpers/form/FormAction";
import { useChannels } from "../ChatChannelProvider";
import { useActivity } from "../core/contexts/ActivityContext";
import Swal from "sweetalert2";
import { deleteObject } from "../../../requests";
import toast from "react-hot-toast";
import axios from "axios";

dayjs.extend(relativeTime);

const ActivityChatInner: FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState<number>(1);
  const { activity } = useActivity();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const params = useParams();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState<ChatMessage>(initialChat());
  const channels = useChannels();

  const [show, setShow] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop =
        containerRef.current.scrollHeight - containerRef.current.clientHeight;
    }
  }, [chatMessages]);

  const handleSubmit = () => {
    let data = jsonToFormData(message);
    sendActivityChat(params.id, data).then((response) => {
      setMessage(initialChat());
    });
  };

  const handleOnChange = (e: any) => {
    setMessage({ message: e.target.value });
  };

  const deleteMessage = async (messageId: number) => {
    if(!activity) return;

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

          setChatMessages(chatMessages.filter(message => message.id !== messageId))
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
      return;
    }

    getActivityChat(activity?.id, `page=${page}`).then((response) => {
      if (response.data) {
        setChatMessages(response?.data?.reverse());
        setPage((page) => page + 1);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity?.id]);

  useEffect(() => {
    if (!channels || !activity?.id) {
      return;
    }

    channels.private(`activity-${activity?.id}-chat`).listen(".MessageSent", (e: any) => {
      setChatMessages([...chatMessages, e]);
    });
  }, [activity?.id, channels, chatMessages]);

  return (
    <div className="card-body" id={"kt_chat_messenger_body"}>
      <div className="scroll-y mh-600px" ref={containerRef}>
        {chatMessages?.map((message, index) => {
          const userInfo = message?.user;
          const state = message?.user?.id !== currentUser?.id ? "info" : "primary";
          const alignmentClass = message?.user?.id !== currentUser?.id ? "start" : "end";
          const teamInfo = message?.team;
          return (
            <div
              key={`message${index}`}
              className={`d-flex justify-content-${alignmentClass} mb-10 chat-message`}
            >
              <div className={`d-flex flex-column align-items align-items-${alignmentClass} position-relative`}>
                <div className="d-flex align-items-center mb-2">
                  {message?.user?.id !== currentUser?.id ? (
                    <>
                      <div className="symbol  symbol-35px symbol-circle ">
                        <img alt="Pic" src={`${userInfo?.meta?.image}`} />
                      </div>
                      <div className="ms-3">
                        <span className="fs-5 fw-bolder text-gray-900 me-1">{userInfo?.name}</span>
                        <span className="text-muted fs-7 mb-1">
                          {message?.created_at &&
                            dayjs(new Date(message?.created_at * 1000)).fromNow()}
                        </span>

                        <span className="ms-2 chat-message-delete" onClick={() => {
                          message.id && deleteMessage(message?.id)
                        }}>
                          <i className="fa-duotone fa-trash text-danger"></i>
                        </span>

                        <div className={"text-mc-secondary fs-7"}>{teamInfo?.name}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="me-3 text-end">
                        <span className="me-2 chat-message-delete" onClick={() => {
                          message.id && deleteMessage(message?.id)
                        }}>
                          <i className="fa-duotone fa-trash text-danger"></i>
                        </span>
                        <span className="text-muted fs-7 mb-1">
                          {message?.created_at &&
                            dayjs(new Date(message?.created_at * 1000)).fromNow()}
                        </span>
                        <span className="fs-5 fw-bolder text-gray-900 ms-1">You</span>
                        <div className="text-mc-secondary fs-7">{teamInfo?.name}</div>
                      </div>
                      <div className="symbol  symbol-35px symbol-circle ">
                        <img alt="Pic" src={`${userInfo?.meta?.image}`} />
                      </div>
                    </>
                  )}
                </div>

                <div
                  className={clsx(
                    "p-5 rounded",
                    `bg-light-${state}`,
                    "text-dark fw-bold mw-lg-400px",
                    `text-${message?.user?.id !== currentUser?.id ? "start" : "end"}`
                  )}
                  data-kt-element="message-text"
                  dangerouslySetInnerHTML={{ __html: message.message }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <Formik
        initialValues={initialChat(message)}
        onSubmit={handleSubmit}
        validationSchema={chatSchema}
        enableReinitialize>
        {({ isSubmitting }) => (
          <Form onChange={handleOnChange} className="form">
            <div className="row mb-6">
              <div className="fv-row">
                <AutoResizableTextarea name="message" value={message.message} />
                <div className="text-danger mt-2">
                  <ErrorMessage name="message" />
                </div>
              </div>
            </div>

            <div className="row">
              <FormAction text={"Submit"} isSubmitting={isSubmitting} />
            </div>

            <div
              className="card-footer d-flex justify-content-end py-6 px-9"
              id="kt_chat_messenger_footer"></div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { ActivityChatInner };
