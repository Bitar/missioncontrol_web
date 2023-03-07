import React, { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ChatMessage, chatSchema, initialChat } from "../../../models/chat/ChatMessage";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ErrorMessage, Form, Formik } from "formik";
import { jsonToFormData, updateData } from "../../../helpers/form/FormHelper";
import { sendActivityChat } from "../core/requests/ActivityRequests";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../modules/auth";
import AutoResizableTextarea from "../../../components/form/AutoResizableTextarea";
import { FormAction } from "../../../helpers/form/FormAction";

type Props = {
  chat: ChatMessage[] | undefined
  setChat: Dispatch<SetStateAction<ChatMessage[] | undefined>>
  isDrawer?: boolean
}

const ActivityChatInner: FC<Props> = ({ chat, setChat, isDrawer = false }) => {
  dayjs.extend(relativeTime);
  const bottomRef = useRef<null | HTMLDivElement>(null);
  const params = useParams();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState<ChatMessage>(initialChat());

  const handleSubmit = async () => {
    let data = jsonToFormData(message);
    await sendActivityChat(params.id, data).then((response) => {
      setMessage(initialChat());

      if (response && chat) {
        setChat([...chat, response]);
      }
    });
  };

  const handleOnChange = (e: any) => {
    setMessage({message: e.target.value})
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  return (
    <div className="card-body" id={"kt_chat_messenger_body"}>
      <div className="scroll-y mh-600px">
        {chat?.map((message, index) => {
          const userInfo = message?.user;
          const state = message?.user?.id !== currentUser?.id ? "info" : "primary";
          const templateAttr = {};
          const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
            message?.user?.id !== currentUser?.id ? "start" : "end"
          } mb-10`;
          return (
            <div
              key={`message${index}`}
              className={clsx("d-flex", contentClass, "mb-10")}
              {...templateAttr}
            >
              <div
                className={clsx(
                  "d-flex flex-column align-items",
                  `align-items-${message?.user?.id !== currentUser?.id ? "start" : "end"}`
                )}
              >
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
                  dangerouslySetInnerHTML={{ __html: message.message }}
                ></div>
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
        enableReinitialize
      >
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
              id="kt_chat_messenger_footer"
            >
              {/*<TextField*/}
              {/*  multiline*/}
              {/*  id='message'*/}
              {/*  size='small'*/}
              {/*  name='message'*/}
              {/*  label='Message'*/}
              {/*  className='w-100'*/}
              {/*  variant='standard'*/}
              {/*  value={values.message}*/}
              {/*  onChange={(e) => setMessage({message: e.target.value})}*/}
              {/*  error={touched.message && Boolean(errors.message)}*/}
              {/*  helperText={touched.message && errors.message}*/}
              {/*/>*/}

              {/*<IconButton*/}
              {/*  type='submit'*/}
              {/*  aria-label='send'*/}
              {/*  className='text-mc-secondary'*/}
              {/*  disabled={isSubmitting || !isValid || !touched}*/}
              {/*  sx={{*/}
              {/*    p: '10px',*/}
              {/*    ml: 1,*/}
              {/*    '&.MuiButtonBase-root:hover': {*/}
              {/*      bgcolor: 'transparent',*/}
              {/*    },*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <SendIcon />*/}
              {/*</IconButton>*/}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { ActivityChatInner };
