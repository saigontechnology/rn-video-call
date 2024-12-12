import {MediaStream} from 'react-native-webrtc';
import {VideoCallActionKind} from './constants';

export const setGettingCall = (payload: boolean) => ({
  type: VideoCallActionKind.SET_GETTING_CALL,
  payload,
} as const);

export const setLocalStream = (payload: MediaStream | null) => ({
  type: VideoCallActionKind.SET_LOCAL_STREAM,
  payload,
} as const);

export const setRemoteStream = (payload: MediaStream | null) => ({
  type: VideoCallActionKind.SET_REMOTE_STREAM,
  payload,
} as const);
