PROJECT REQUIREMENT:

- Provide Video Call feature module
- Proxy for Video call service, (WEBRTC-FIREBASE, THIRD-PARTY, ...)
- Integrate react firebase chat


I. Video Call feature:
 
 Setup
 Create Channel
 Join
 Hangup/EndCall
 Clean

II. Proxy

 Create Interface Method
 Create specific client for Proxy 


import firebaseVideocall from 'FirebaseVideocall'

import thirdParty from 'THIRD-PARTY'

class FIRBASE_PROXY implement IVideoCall {

Setup {
  firebaseVideocall.config(..params)
 }

 Create_Channel{
 }

 Join {
 }
 Hangup/EndCall
 Clean
}

III. Integrate react firebase chat

// Create Provider/ Create context 

App()

// Implement
const {setUp, join} = useVideoCallProvider()
