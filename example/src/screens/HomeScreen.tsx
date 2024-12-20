import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppButton, GettingCall, Video } from "../../components";
import {
  WebRTCFirbase,
  useVideoCallContext,
} from "@rn-video-call/webrtc_firebase";

const WebRTCFirbaseService = WebRTCFirbase.getInstance()

export const HomeScreen: React.FC = () => {
  const { videoCallState } = useVideoCallContext();

  const onCreate = useCallback(() => {
    WebRTCFirbaseService?.create();
  }, []);

  const onJoin = useCallback(() => {
    WebRTCFirbaseService?.join();
  }, []);

  const onHangup = useCallback(() => {
    WebRTCFirbaseService?.hangup();
  }, []);

  // Displays both local and remote stream once call is connected
  if (videoCallState?.localStream && videoCallState?.remoteStream) {
    return (
      <Video
        localStream={videoCallState?.localStream}
        remoteStream={videoCallState?.remoteStream}
      />
    );
  }

  // Displays the gettingCall Component
  if (videoCallState?.gettingCall) {
    return <GettingCall join={onJoin} hangup={onHangup} />;
  }
  return (
    <View style={styles.container}>
      <AppButton backgroundColor="blue" onPress={onCreate}>
        <Ionicons name="call" color="white" size={24} />
      </AppButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
