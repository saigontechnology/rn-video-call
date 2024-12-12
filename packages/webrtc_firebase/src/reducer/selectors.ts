import type {VideoCallState} from './types';

export const getGettingCallSelector = (state: VideoCallState) => state.gettingCall;

export const getLocalStreamSelector = (state: VideoCallState) => state.localStream;

export const getRemoteStreamSelector = (state: VideoCallState) => state.remoteStream;
