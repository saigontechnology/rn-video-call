import { useEffect, useRef } from "react";
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

import { VideoCallContext, ClientRegistry, ClientKind } from "rn-video-call";
import AppButton from "./components/AppButton";

export default function App() {
  const client = useRef(ClientRegistry.getInstance(ClientKind.WEBRTC_FIREBASE));

  // Displays the gettingCall Component
  if (client.current.gettingCall) {
    console.log("gettingCall");
    return <GettingCall hangup={hangup} join={join}></GettingCall>;
  }

  // Displays local stream on calling
  // Displays both local and remote stream once call is connected
  if (localStream) {
    console.log("localStream");
    return (
      <Video
        hangup={hangup}
        localStream={localStream}
        remoteStream={remoteStream}></Video>
    );
  }

  return (
    <VideoCallContext.Provider value={client.current}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <AppButton
            iconName="video"
            backgroundColor="grey"
            onPress={client.current.create}></AppButton>
        </View>
      </SafeAreaView>
    </VideoCallContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
