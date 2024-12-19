import {IUserInfo} from "@rn-video-call/firebase_user";
import {MediaStream} from "react-native-webrtc";

export type SetUpUserCallbacksType = {
  userInfo: IUserInfo
  setLocalStream: (stream?: MediaStream) => void;
  setRemoteStream: (stream?: MediaStream) => void;
  setGettingCall: (isGettingCall: boolean) => void;
};

export type SetUpInCallPropertiesType = {
  setIsMuted?: (isMuted: boolean) => void;
  setIsFrontCamera?: (isFrontCamera: boolean) => void;
  setLocalCameraEnabled?: (enabled: boolean) => void;
  setRemoteCameraEnabled?: (enabled: boolean) => void;
};