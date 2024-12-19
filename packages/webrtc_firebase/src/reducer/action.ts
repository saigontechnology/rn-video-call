import {MediaStream} from 'react-native-webrtc';
import {VideoCallActionKind} from './constants';

export const setGettingCall = (payload: boolean) => ({
  type: VideoCallActionKind.SET_GETTING_CALL,
  payload,
} as const);

export const setLocalStream = (payload?: MediaStream) => ({
  type: VideoCallActionKind.SET_LOCAL_STREAM,
  payload,
} as const);

export const setRemoteStream = (payload?: MediaStream) => ({
  type: VideoCallActionKind.SET_REMOTE_STREAM,
  payload,
} as const);
