import { ClientKind } from "./ClientKind.types"
import { Base } from "./proxy/base"
import { createWebRTCFirbaseProxy } from "./proxy/webrtc_firebase_proxy"

class ClientRegistry {
  #instances: Base

  constructor({
    ...options
  } = {}) {
    this.#instances = new Base({})
  }

  getInstance(kind: ClientKind, {
    ...props
  } = {}) {
      switch (kind) {
        case ClientKind.WEBRTC_FIREBASE:
          this.#instances = createWebRTCFirbaseProxy({
            ...props,
          })
          break

        default:
      }
    return this.#instances
   
  }
}

export default new ClientRegistry()
