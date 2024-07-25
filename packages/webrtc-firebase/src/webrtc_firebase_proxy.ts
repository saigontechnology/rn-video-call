import {Base, IVideoCall} from 'rn-video-call/provider/proxy'

class WebRTCFirbase extends Base implements IVideoCall  {
  constructor(parameters) {
    super({})
  }
  //override
  setup(): void {
      console.log('SETUP WebRTCFirbase success')
  }

}

export const createWebRTCFirbaseProxy = ({}) => {
  return new WebRTCFirbase({})
}
