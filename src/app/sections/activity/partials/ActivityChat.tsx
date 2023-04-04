import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatMessage } from "../../../models/chat/ChatMessage";
import { getActivityChat } from "../core/requests/ActivityRequests";
import { ChannelsProvider } from "../ChatChannelProvider";
import { getAuth, useAuth } from "../../../modules/auth";
import { ActivityChatInner } from "./ActivityChatInner";

const ActivityChat: FC = () => {
  // const params = useParams();
  const { currentUser } = useAuth();
  const auth = getAuth();

  // const [chat, setChat] = useState<ChatMessage[]>([]);

  // useEffect(() => {
  //   getActivityChat(params.id).then((response) => {
  //     if (response.data) {
  //       setChat(response?.data?.reverse());
  //     }
  //   });
  // }, [params.id]);

  return (
    <div className="d-flex flex-column flex-lg-row">
      <div className="flex-lg-row-fluid">
        <div className="card" id="kt_chat_messenger">
          {auth && auth.token && currentUser && currentUser.id &&
            <ChannelsProvider authUser={currentUser} authToken={auth?.token}>
              <ActivityChatInner />
            </ChannelsProvider>
          }
        </div>
      </div>
    </div>
  );
};

export { ActivityChat };