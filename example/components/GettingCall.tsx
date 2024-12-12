import React, { useCallback, useRef } from "react";
import { Image, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppButton from "./AppButton";
import { getWebRTCFirbaseProxyInstance } from "@rn-video-call/webrtc_firebase";

export default function GettingCall() {
  const client = useRef(getWebRTCFirbaseProxyInstance({}));
  const hangup = useCallback(() => {
    client.current?.hangup();
  }, []);
  const join = useCallback(() => {
    client.current?.join();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://picsum.photos/200/300" }}
        style={styles.image}
      />
      <View style={styles.bContainer}>
        <AppButton
          backgroundColor="green"
          onPress={join}
          style={{ marginRight: 30 }}
        >
          <Ionicons name="call-outline" color="white" size={24} />
        </AppButton>
        <AppButton
          backgroundColor="red"
          onPress={hangup}
          style={{ marginLeft: 30 }}
        >
          <Ionicons name="stop-outline" color="white" size={24} />
        </AppButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  bContainer: { flexDirection: "row", bottom: 30 },
});
