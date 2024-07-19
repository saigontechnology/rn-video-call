import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { VideoCallContext, ClientRegistry, ClientKind } from "rn-video-call";

export default function App() {
  const client = ClientRegistry.getInstance(ClientKind.WEBRTC_FIREBASE);

  useEffect(() => {
    client.setup();
  }, []);

  return (
    <VideoCallContext.Provider value={client}>
      <View style={styles.container}>
        <Text>Webrtc firebase demo</Text>
        <Button title="CREATE" onPress={client.create} />
        <Button title="JOIN" onPress={client.join} />
        <Button title="HANUP" onPress={client.hangup} />
        <Button title="CLEAN" onPress={client.cleanUp} />
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
