import React from "react";
import { SafeAreaView, StatusBar } from "react-native";

import { VideoCallProvider } from "@rn-video-call/webrtc_firebase";
import { HomeScreen } from "./src/screens";
import {FirestoreUserProvider} from "@rn-video-call/firebase_user";

const userInfo = {
  id: "user-1",
  name: "User 1",
  avatar: "",
};

export default function App() {
  // Displays local stream on calling
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FirestoreUserProvider userInfo={userInfo}>
        <VideoCallProvider>
          <StatusBar barStyle="dark-content" />
          <HomeScreen />
        </VideoCallProvider>
      </FirestoreUserProvider>
    </SafeAreaView>
  );
}
