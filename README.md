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
npm install @rn-video-call/base @rn-video-call/webrtc @react-native-firebase/app
```

Configure for Firebase as described in [Firebase Getting Started](https://rnfirebase.io)

### Configure for iOS

Adding configure for pod in Podfile
```
pod 'RNFBFirestore', :path => '../node_modules/@react-native-firebase/firestore/'
pod 'react-native-webrtc', :path => '../node_modules/react-native-webrtc/'
```

Run `npx pod-install` after installing the npm package.


### Configure for Android

Adding configure for settings.gradle of project (in `android/settings.gradle`)
```
include ':@react-native-firebase_firestore'
project(':@react-native-firebase_firestore').projectDir = new File(rootProject.projectDir, './../node_modules/@react-native-firebase/firestore/android')
include ':react-native-webrtc'
project(':react-native-webrtc').projectDir = new File(rootProject.projectDir, './../node_modules/react-native-webrtc/android')
```

Adding configure for build.gradlew of app (in `android/app/build.gradle`)
```
dependencies {
  ...
  implementation project(path: ":@react-native-firebase_firestore")
  implementation project(path: ":react-native-webrtc")
  ...
}
```

Adding native Package Module in app MainApplication.kt
``` kt
... // Other packages

import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;
import com.oney.WebRTCModule.WebRTCModulePackage;

class MainApplication : Application(), ReactApplication {
  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
    this,
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> {
        return PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
          add(ReactNativeFirebaseFirestorePackage());
          add(WebRTCModulePackage());
        }
      }
    }
  )
  ... // Remaining codes
}
```

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

### Example Usage
##### Implementing WebRTC proxy

On Root App file (e.g. `App.tsx`), wrap app with `VideoCallContext`
```js
import { VideoCallContext } from "@rn-video-call/base";
import { getWebRTCFirbaseProxyInstance } from "@rn-video-call/webrtc";

export default function App() {
  const client = useRef(getWebRTCFirbaseProxyInstance({}));
  ...

  return (
    <VideoCallContext.Provider value={client.current}>
      ...
    </VideoCallContext.Provider>
  )
}
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
