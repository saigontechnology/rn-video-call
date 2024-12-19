# @rn-video-call/firebase_user

A third-party for rn-video-call for managing user based on Firebase service

# API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/webrtc-firebase.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/webrtc-firebase/)

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.
### Add the package to your npm dependencies

```
npm install @rn-video-call/firebase_user
```

Configure for Firebase as described in [Firebase Getting Started](https://rnfirebase.io)

### Configure for iOS

Adding configure for pod in Podfile
```
pod 'RNFBApp', :path => '../node_modules/@react-native-firebase/app/'
pod 'RNFBFirestore', :path => '../node_modules/@react-native-firebase/firestore/'
```

Run `npx pod-install` after installing the npm package.


### Configure for Android

Adding configure for settings.gradle of project (in `android/settings.gradle`)
```
include ':@react-native-firebase_firestore'
project(':@react-native-firebase_firestore').projectDir = new File(rootProject.projectDir, './../node_modules/@react-native-firebase/firestore/android')
include ':@react-native-firebase_app'
project(':@react-native-firebase_app').projectDir = new File(rootProject.projectDir, './../node_modules/@react-native-firebase/app/android')
```

Adding configure for build.gradlew of app (in `android/app/build.gradle`)
```
dependencies {
  ...
  implementation project(path: ":@react-native-firebase_app")
  implementation project(path: ":@react-native-firebase_firestore")
  ...
}
```

Adding native Package Module in app MainApplication.kt
``` kt
... // Other packages

import io.invertase.firebase.app.ReactNativeFirebaseAppPackage
import io.invertase.firebase.firestore.ReactNativeFirebaseFirestorePackage;

class MainApplication : Application(), ReactApplication {
  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
    this,
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> {
        return PackageList(this).packages.apply {
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // add(MyReactNativePackage())
          add(ReactNativeFirebaseAppPackage());
          add(ReactNativeFirebaseFirestorePackage());
        }
      }
    }
  )
  ... // Remaining codes
}
```

### Example Usage
##### Implementing Firestore User Provider

On Root App file (e.g. `App.tsx`), wrap app with `FirestoreUserProvider`
```js
import { FirestoreUserProvider } from "@rn-video-call/firebase_user";

export default function App() {
  ...
  const DEMO_USER = {
    id: 'user-demo',
    name: 'UserDemo',
    avatar: '',
  }
  return (
    <FirestoreUserProvider userInfo={DEMO_USER}>
      ...
    </FirestoreUserProvider>
  )
}
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
