import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useReducer,
  useRef,
} from "react";
import type { IVideoCallContext } from "./interfaces";
import {
  setGettingCall,
  setLocalStream,
  setRemoteStream,
  videoCallReducer,
} from "./reducer";
import { WebRTCFirbase } from "./webrtc_firebase_proxy";
import { useUserContext } from "@rn-video-call/firebase_user";

const WebRTCFirbaseService = WebRTCFirbase.getInstance()

interface VideoCallProviderProps extends PropsWithChildren {}

export const VideoCallContext = createContext<IVideoCallContext>(
  {} as IVideoCallContext
);

export const VideoCallProvider: React.FC<VideoCallProviderProps> = ({
  children,
}) => {
  const { userState } = useUserContext();
  const [state, dispatch] = useReducer(videoCallReducer, {});

  const userInfo = userState?.userInfo || null

  useEffect(() => {
    if (userInfo?.id) {
      WebRTCFirbaseService.setupCallbacks({
        userInfo,
        setLocalStream: (stream) => dispatch(setLocalStream(stream)),
        setRemoteStream: (stream) => dispatch(setRemoteStream(stream)),
        setGettingCall: (isCalling) => dispatch(setGettingCall(isCalling)),
      });
    }
  }, [userInfo]);

  return (
    <VideoCallContext.Provider
      value={{
        userInfo,
        videoCallState: state,
        videoCallDispatch: dispatch,
      }}
    >
      {children}
    </VideoCallContext.Provider>
  );
};
