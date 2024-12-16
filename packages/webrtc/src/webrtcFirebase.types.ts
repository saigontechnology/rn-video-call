export type SetUpCallbacksType = {
  setLocalStream?: (stream: any) => void;
  setRemoteStream?: (stream: any) => void;
  setGettingCall?: (isGettingCall: boolean) => void;
  setIsMuted?: (isMuted: boolean) => void;
  setIsFrontCamera?: (isFrontCam: boolean) => void;
  setLocalCameraEnabled?: (enabled: boolean) => void;
  setRemoteCameraEnabled?: (enabled: boolean) => void;
};
