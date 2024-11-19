import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import {
  VideoCallContext,
  createWebRTCFirbaseProxy,
  IncomingCall,
  OutgoingCall,
  VideoCallContent,
} from "rn-video-call";

import { Video, AppButton, GettingCall } from "./components";

import { Colors } from "react-native/Libraries/NewAppScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ParticipantsItems } from "rn-video-call/components/CallParticipantsList";

const AVT_URL =
  "https://th.bing.com/th/id/OIP.qGopEgGmQzEVMtTdh5HZDQAAAA?w=222&h=180&c=7&r=0&o=5&dpr=2&pid=1.7";

const PARTICIPANTS_LIST: ParticipantsItems[] = [
  { id: "1", name: "Anya", avtUrl: AVT_URL, isMicro: true, isCamera: false },
  { id: "2", name: "Danil", avtUrl: AVT_URL, isMicro: true, isCamera: false },
  { id: "3", name: "Vlad", avtUrl: AVT_URL, isMicro: true, isCamera: false },
  { id: "4", name: "Vlad", avtUrl: AVT_URL, isMicro: true, isCamera: false },
  { id: "5s", name: "Vlad", avtUrl: AVT_URL, isMicro: true, isCamera: false },
  { id: "5s", name: "Vlad", avtUrl: AVT_URL, isMicro: true, isCamera: false },
  { id: "5s", name: "Vlad", avtUrl: AVT_URL, isMicro: true, isCamera: false },
  { id: "5s", name: "Vlad", avtUrl: AVT_URL, isMicro: true, isCamera: false },
];

export default function App() {
  const client = useRef(createWebRTCFirbaseProxy({}));

  const [localStream, setLocalStream] = useState<any>();
  const [remoteStream, setRemoteStream] = useState<any>();
  const [gettingCall, setGettingCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [localCameraEnabled, setLocalCameraEnabled] = useState(true);
  const [remoteCameraEnabled, setRemoteCameraEnabled] = useState(true);
  const connecting = useRef(false);

  useEffect(() => {
    client.current.setupCallbacks({
      setLocalStream,
      setRemoteStream,
      setGettingCall,
      setIsMuted,
      setIsFrontCamera,
      setLocalCameraEnabled,
      setRemoteCameraEnabled,
    });
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
  const onToggleIsMuted = useCallback(() => {
    client.current.toggleActiveMicrophone();
  }, []);
  const onToggleIsFrontCamera = useCallback(() => {
    client.current.switchingCamera();
  }, []);
  const onToggleCamera = useCallback(() => {
    client.current.toggleCameraEnabled();
  }, []);

  return (
    <SafeAreaProvider>
      {/* <IncomingCall
        infoProps={{
          name: "Van Loi",
          desc: "Voice call",
        }}
      /> */}
      {/* <OutgoingCall
        infoProps={{
          name: "Van Loi",
          desc: "Waiting...",
        }}
      /> */}
      <VideoCallContent data={PARTICIPANTS_LIST} />
    </SafeAreaProvider>
  );

  // Displays both local and remote stream once call is connected
  // if (localStream) {
  //   return (
  //     <Video
  //       localStream={localStream}
  //       remoteStream={remoteStream}
  //       hangup={onHangup}
  //       isMuted={isMuted}
  //       isFrontCam={isFrontCamera}
  //       localCameraEnabled={localCameraEnabled}
  //       remoteCameraEnabled={remoteCameraEnabled}
  //       toggleIsMuted={onToggleIsMuted}
  //       toggleIsFrontCam={onToggleIsFrontCamera}
  //       toggleCam={onToggleCamera}
  //     />
  //   );
  // }

  // // Displays the gettingCall Component
  // if (gettingCall) {
  //   return <GettingCall hangup={onHangup} join={onJoin} />;
  // }

  // // Displays local stream on calling
  // return (
  //   <SafeAreaView style={{ flex: 1 }}>
  //     <VideoCallContext.Provider value={client.current}>
  //       <StatusBar barStyle="dark-content" />
  //       <View style={styles.container}>
  //         <AppButton backgroundColor="blue" onPress={onCreate}>
  //           <Ionicons name="call" color="white" size={24} />
  //         </AppButton>
  //       </View>
  //     </VideoCallContext.Provider>
  //   </SafeAreaView>
  // );
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
