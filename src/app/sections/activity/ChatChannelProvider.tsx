import React, { useEffect, useMemo, useState } from "react";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const API_URL = process.env.REACT_APP_API_URL;
const APP_KEY = process.env.REACT_APP_PUSHER_CHANNEL_APP_KEY;
const APP_CLUSTER = process.env.REACT_APP_PUSHER_CHANNEL_APP_CLUSTER;

const AUTH_ENDPOINT = `${API_URL}/broadcasting/auth`;

/**
 * Pusher configuration
 */
const pusherConfig = {
  key: APP_KEY,
  cluster: APP_CLUSTER,
  authEndpoint: AUTH_ENDPOINT
};


/**
 * Context for Channels
 */
type TChannels = Echo | undefined
const ChannelsContext = React.createContext<TChannels>(undefined);

/**
 * Channel Context Provider
 */
export function ChannelsProvider({
                                   children,
                                   authUser,
                                   authToken
                                 }: {
  children: React.ReactNode,
  authUser?: any
  authToken?: string
}) {
  const [channels, setChannels] = useState<TChannels>(undefined);
  useEffect(() => {
    const channels = getChannels(pusherConfig, authToken);
    setChannels(channels);
    return () => {
      // disconnect from server and reset the channels
      channels.disconnect();
      setChannels(undefined);
    };
  }, [authUser, authToken]);
  return (
    <ChannelsContext.Provider value={channels}>
      {children}
    </ChannelsContext.Provider>
  );
}

/**
 * Hook to use the channels provided via context
 */
export function useChannels() {
  return React.useContext(ChannelsContext);
}

/**
 * Use private channels
 * It simple return the useChannels with authenticated user bindings
 */
export function usePrivateChannels() {
  const channels = useChannels();
  return useMemo(() => {
    return channels && channels.private("activity-36-chat");
  }, [channels]);
}

/**
 * Get the channels
 */
function getChannels(pusherConfig: any, authToken?: string) {
  const client = new Pusher(pusherConfig.key, {
    cluster: pusherConfig.cluster,
    forceTLS: true,
    authEndpoint: pusherConfig.authEndpoint,
    auth: authToken ? {
      headers: {
        // pass the authorization token when using private channels
        Authorization: `Bearer ${authToken}`
      }
    } : undefined
  });

  return new Echo({
    broadcaster: "pusher",
    client: client
  });
}