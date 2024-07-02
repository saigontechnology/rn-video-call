import { Base } from "./base"
import { IVideoCall } from "./video-call-methods-interface"


class WebRTCFirbase extends Base implements IVideoCall  {
  constructor(parameters) {
    super({})
  }
  setup(): void {
      console.log('SETUP WebRTCFirbase success')
  }
}

export const createWebRTCFirbaseProxy = ({}) => {
  return new WebRTCFirbase({})
}
