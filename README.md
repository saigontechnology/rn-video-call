# rn-video-call

A module for expo video call 

# API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/rn-video-call.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/rn-video-call/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install rn-video-call
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.


### Configure for Android


#  Usaged

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

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
