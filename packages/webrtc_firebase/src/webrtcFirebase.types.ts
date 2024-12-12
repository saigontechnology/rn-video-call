import {MediaStream} from "react-native-webrtc";

export type SetUpCallbacksType = {
  setLocalStream?: (stream: MediaStream | null) => void;
  setRemoteStream?: (stream: MediaStream | null) => void;
  setGettingCall?: (isGettingCall: boolean) => void;
};

export type SetUpInCallPropertiesType = {
  setIsMuted?: (isMuted: boolean) => void;
  setIsFrontCamera?: (isFrontCamera: boolean) => void;
  setLocalCameraEnabled?: (enabled: boolean) => void;
  setRemoteCameraEnabled?: (enabled: boolean) => void;
};