import { useEffect, useRef } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { VideoCallContext, ClientRegistry, ClientKind } from "rn-video-call";

export default function App() {

  const client =  useRef(ClientRegistry.getInstance(ClientKind.WEBRTC_FIREBASE))

  return (
    <VideoCallContext.Provider value={client.current}>
      <View style={styles.container}>
        <Text>Webrtc firebase demo</Text>
        <Button title="CREATE" onPress={client.current.create} />
        <Button title="JOIN" onPress={client.current.join} />
        <Button title="HANUP" onPress={client.current.hangup} />
        <Button title="CLEAN" onPress={client.current.cleanUp} />
      </View>
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
