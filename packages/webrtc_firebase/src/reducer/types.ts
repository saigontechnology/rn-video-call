import {MediaStream} from 'react-native-webrtc';
import * as videoCallActions from './action'

export type VideoCallState = {
	gettingCall?: boolean;
	localStream?: MediaStream;
	remoteStream?: MediaStream;
};

type VideoCallActionKeys = keyof typeof videoCallActions

export type VideoCallActionTypes = ReturnType<typeof videoCallActions[VideoCallActionKeys]>
