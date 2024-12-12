import {Dispatch} from "react";
import {VideoCallActionTypes, VideoCallState} from "./reducer";
export interface IUserInfo {
  id: string;
  name: string;
  avatar: string;
}

export type IVideoCallContext = {
  userInfo: IUserInfo | null;
  videoCallState: VideoCallState;
  videoCallDispatch: Dispatch<VideoCallActionTypes>;
}