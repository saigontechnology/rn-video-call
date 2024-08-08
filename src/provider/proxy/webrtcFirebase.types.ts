export type SET_LOCAL_STREAM_CALLBACK_TYPE = (stream: any) => Promise<void>;
export type SET_REMOTE_STREAM_CALLBACK_TYPE = (stream: any) => Promise<void>;
export type SET_GETTING_CALL_CALLBACK_TYPE = (
  isGettingCall: boolean
) => Promise<void>;
