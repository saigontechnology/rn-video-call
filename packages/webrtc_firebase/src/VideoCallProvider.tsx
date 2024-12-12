import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useReducer,
  useRef,
} from "react";
// import { FirestoreServices, createUserProfile } from "../services/firebase";
import type { IVideoCallContext } from "./interfaces";
import {
  setGettingCall,
  setLocalStream,
  setRemoteStream,
  videoCallReducer,
} from "./reducer";
import { getWebRTCFirbaseProxyInstance } from "./webrtc_firebase_proxy";

// const firestoreServices = FirestoreServices.getInstance();

interface VideoCallProviderProps
  extends PropsWithChildren,
    Omit<IVideoCallContext, "videoCallState" | "videoCallDispatch"> {}

export const VideoCallContext = createContext<IVideoCallContext>(
  {} as IVideoCallContext
);

export const VideoCallProvider: React.FC<VideoCallProviderProps> = ({
  userInfo,
  children,
}) => {
  const client = useRef(getWebRTCFirbaseProxyInstance({}));
  const [state, dispatch] = useReducer(videoCallReducer, {});

  useEffect(() => {
    client.current.setupCallbacks({
      setLocalStream: (stream) => dispatch(setLocalStream(stream)),
      setRemoteStream: (stream) => dispatch(setRemoteStream(stream)),
      setGettingCall: (isCalling) => dispatch(setGettingCall(isCalling)),
    });
  }, []);

  useEffect(() => {
    let unsubscribeListener = () => {};
    if (userInfo?.id) {
      // firestoreServices.configuration({ userInfo });
      // createUserProfile(userInfo.id, userInfo.name).then(() => {
      //   firestoreServices.getListConversation().then((res) => {
      //     dispatch(setListConversation(res));
      //   });
      //   unsubscribeListener = firestoreServices.listenConversationUpdate(
      //     (data) => {
      //       dispatch(updateConversation(data));
      //     }
      //   );
      // });
    }
    return () => {
      unsubscribeListener();
    };
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
