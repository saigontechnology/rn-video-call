import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import { VideoCallContext, AppButton, GettingCall, Video, createWebRTCFirbaseProxy } from "rn-video-call";
import {
  // createWebRTCFirbaseProxy,
  // MediaStream,
  // VideoComponent
} from "packages/webrtc-firebase";

import VideoComponent from "./Component";

import { Colors } from "react-native/Libraries/NewAppScreen";

export default function App() {
  const client = useRef(createWebRTCFirbaseProxy({}));

  const [localStream, setLocalStream] = useState<MediaStream | null>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>();
  const [gettingCall, setGettingCall] = useState(false);

  useEffect(() => {
    client.current.setupCallbacks(
      async (stream: any) => {
        console.log("setLocalStream");
        setLocalStream(stream);
      },
      async (stream: any) => {
        console.log("setRemoteStream");
        setRemoteStream(stream);
      },
      async (gettingCall: boolean) => {
        console.log("setGettingCall", gettingCall);
        setGettingCall(gettingCall);
      }
    );
  }, []);

  const onCreate = useCallback(() => {
    client.current.create();
  }, []);
  const onJoin = useCallback(() => {
    client.current.join();
  }, []);
  const onHangup = useCallback(() => {
    client.current.hangup();
  }, []);

  // Displays the gettingCall Component
  if (gettingCall) {
    return <GettingCall hangup={onHangup} join={onJoin} />;
  }

  // Displays local stream on calling
  // Displays both local and remote stream once call is connected
  if (localStream) {
    return (
      <Video
        hangup={onHangup}
        localStreamURL={localStream?.toURL()}
        remoteStreamURL={remoteStream?.toURL()}
        VideoComponent={VideoComponent}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VideoCallContext.Provider value={client.current}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <AppButton backgroundColor="grey" onPress={onCreate} />
        </View>
      </VideoCallContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    backgroundColor: Colors.white,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  stream: {
    flex: 1,
  },
  footer: {
    backgroundColor: Colors.lighter,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
