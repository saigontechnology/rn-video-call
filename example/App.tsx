import { useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import { VideoCallContext, AppButton, GettingCall, Video } from "rn-video-call";
import {
  createWebRTCFirbaseProxy,
  MediaStream,
  // VideoComponent
} from "packages/webrtc-firebase";

import VideoComponent from './Component'

import { Colors } from "react-native/Libraries/NewAppScreen";
import firestore, { doc, query, collection, onSnapshot } from "@react-native-firebase/firestore";

export default function App() {
  const client = useRef(createWebRTCFirbaseProxy({}));

  const [localStream, setLocalStream] = useState<MediaStream | null>();
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>();
  const [gettingCall, setGettingCall] = useState(false);
  const connecting = useRef(false);

  useEffect(() => {
    const cRef = firestore()
      .collection('meets')
      .doc("chatId");

    const subscribe = onSnapshot(cRef, (snapshot: any) => {
      const data = snapshot.data();

      // if there is offer for chatId set the getting call flag
      if (data && data.offer && !connecting.current) {
        setGettingCall(true);
      }
    });

    // On Delete of collection call hangup
    // The other side has clicked on hangup
    const qdelete = query(collection(cRef, "callee"));
    const subscribeDelete = onSnapshot(qdelete, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type == "removed") {
          client.current.hangup();
        }
      });
    });
    return () => {
      subscribe();
      subscribeDelete();
    };
  }, []);


  useEffect(() => {
    client.current.setupCallbacks(
      async (stream:any) => {
        console.log("setLocalStream", stream);
        setLocalStream(stream);
      },
      async (stream: any) => {
        console.log("setRemoteStream", stream);
        setRemoteStream(stream);
      },
      async (gettingCall: boolean) => {
        console.log("setGettingCall", gettingCall);
        setGettingCall(gettingCall);
      }
    );
  }, []);

  // Displays the gettingCall Component
  if (gettingCall) {
    console.log("gettingCall");
    return (
      <GettingCall hangup={client.current.hangup} join={client.current.join} />
    );
  }

  // Displays local stream on calling
  // Displays both local and remote stream once call is connected
  if (localStream) {
    return (
      <Video
        hangup={client.current.hangup}
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
          <AppButton backgroundColor="grey" onPress={client.current.create} />
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
