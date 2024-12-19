import type {VideoCallActionTypes, VideoCallState} from './types';
import {VideoCallActionKind} from './constants';

export const videoCallReducer = (
  state: VideoCallState,
  action: VideoCallActionTypes
): VideoCallState => {
  switch (action.type) {
    case VideoCallActionKind.SET_GETTING_CALL:
      return {
        ...state,
        gettingCall: action.payload,
      };
    case VideoCallActionKind.SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.payload,
      };
    case VideoCallActionKind.SET_REMOTE_STREAM:
      return {
        ...state,
        remoteStream: action.payload,
      };
    default:
      return {...state}
  }
};
