import React, { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ChatMessage, chatSchema, initialChat } from "../../../models/chat/ChatMessage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ErrorMessage, Form, Formik } from "formik";
import { jsonToFormData } from "../../../helpers/form/FormHelper";
import { getActivityChat, sendActivityChat } from "../core/requests/ActivityRequests";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../modules/auth";
import AutoResizableTextarea from "../../../components/form/AutoResizableTextarea";
import { FormAction } from "../../../helpers/form/FormAction";
import { useChannels } from "../ChatChannelProvider";
import { useActivity } from "../core/contexts/ActivityContext";

dayjs.extend(relativeTime);

const ActivityChatInner: FC = () => {
  const { activity } = useActivity();
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (activity?.id) {
      getActivityChat(activity?.id).then((response) => {
        if (response.data) {
          setChatMessages(response?.data?.reverse());
        }
      });
    }
  }, [activity?.id]);

  const bottomRef = useRef<null | HTMLDivElement>(null);
  const params = useParams();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState<ChatMessage>(initialChat());

  const channels = useChannels();

  const handleSubmit = () => {
    let data = jsonToFormData(message);
    sendActivityChat(params.id, data).then((response) => {
      setMessage(initialChat());
    });
  };

  const handleOnChange = (e: any) => {
    setMessage({ message: e.target.value });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  useEffect(() => {
    if (channels) {

      channels.private("activity-36-chat").listen(".MessageSent", (e: any) => {
        setChatMessages([...chatMessages, e]);
      });

    }
  }, [channels, chatMessages]);

  return (
    <div className="card-body" id={"kt_chat_messenger_body"}>
      <div className="scroll-y mh-600px">
        {chatMessages?.map((message, index) => {
          const userInfo = message?.user;
          const state = message?.user?.id !== currentUser?.id ? "info" : "primary";
          const templateAttr = {};
          const contentClass = `d-flex justify-content-${
            message?.user?.id !== currentUser?.id ? "start" : "end"
          } mb-10`;
          return (
            <div
              key={`message${index}`}
              className={clsx("d-flex", contentClass, "mb-10")}
              {...templateAttr}>
              <div
                className={clsx(
                  "d-flex flex-column align-items",
                  `align-items-${message?.user?.id !== currentUser?.id ? "start" : "end"}`
                )}>
                <div className="d-flex align-items-center mb-2">
                  {message?.user?.id !== currentUser?.id ? (
                    <>
                      <div className="symbol  symbol-35px symbol-circle ">
                        <img alt="Pic" src={`${userInfo?.meta?.image}`} />
                      </div>
                      <div className="ms-3">
                        <span className="fs-5 fw-bolder text-gray-900 me-1">{userInfo?.name}</span>
                        {message?.created_at &&
                          dayjs(new Date(message?.created_at * 1000)).fromNow()}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="me-3">
                        <span className="text-muted fs-7 mb-1">
                          {message?.created_at &&
                            dayjs(new Date(message?.created_at * 1000)).fromNow()}
                        </span>
                        <span className="fs-5 fw-bolder text-gray-900 ms-1">You</span>
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
        <div ref={bottomRef} />
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
              id="kt_chat_messenger_footer">
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { ActivityChatInner };