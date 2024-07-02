import React, { Context, createContext, useContext } from "react";
import { Base } from "./proxy/base";
import { IVideoCall } from "./proxy/video-call-methods-interface";


export const VideoCallContext = createContext<Base | null>(null);

export const useVideoCall = (): IVideoCall => {
  const client = useContext(VideoCallContext);
  return React.useMemo(() => {
    if (!client) {
      console.error(
        'Video Call client not configured!',
        'To use the useVideoCall() hook, pass an initialized Video Call client into the VideoCallProvider'
      );
    }

    return {
      setup: async (...args) => client?.setup(...args),
      create:  async (...args) => client?.create(...args),
      join:  async (...args) => client?.join(...args),
      hangup: async (...args) => client?.hangup(...args),
      cleanUp:  async (...args) => client?.cleanUp(...args),
      
    };
  }, [client]);
};
