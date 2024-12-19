import {Dispatch} from "react";
import {VideoCallActionTypes, VideoCallState} from "./reducer";
import {IUserInfo} from "@rn-video-call/firebase_user";

export type IVideoCallContext = {
  userInfo: IUserInfo
  videoCallState: VideoCallState;
  videoCallDispatch: Dispatch<VideoCallActionTypes>;
}