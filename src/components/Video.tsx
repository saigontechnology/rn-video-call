import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppButton from "./AppButton";

type VideoProps = {
  hangup: () => {};
  localStreamURL?: string;
  remoteStreamURL?: string;
  VideoComponent: (props: {
    streamURL?: string;
    style: StyleProp<ViewStyle>;
  }) => React.ReactElement;
};

const ButtonContainer = ({ hangup }: { hangup: () => void }) => {
  return (
    <View style={styles.bContainer}>
      <AppButton backgroundColor="red" onPress={hangup} />
    </View>
  );
};

const Video = ({
  hangup,
  localStreamURL,
  remoteStreamURL,
  VideoComponent,
}: VideoProps) => {
  // On call we will just display the local stream
  if (localStreamURL && !remoteStreamURL) {
    return (
      <View style={styles.container}>
        <VideoComponent streamURL={localStreamURL} style={styles.video} />

        <ButtonContainer hangup={hangup} />
      </View>
    );
  }
  // Once the call is connected, we will display
  // local Stream on top of remote stream
  if (localStreamURL && remoteStreamURL) {
    return (
      <View style={styles.container}>
        <VideoComponent streamURL={remoteStreamURL} style={styles.video} />
        <VideoComponent streamURL={localStreamURL} style={styles.videoLocal} />

        <ButtonContainer hangup={hangup} />
      </View>
    );
  }
  return (
    <View>
      <ButtonContainer hangup={hangup} />
    </View>
  );
};

const styles = StyleSheet.create({
  bContainer: {
    flexDirection: "row",
    bottom: 30,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  videoLocal: {
    position: "absolute",
    width: 100,
    height: 150,
    top: 0,
    left: 20,
    elevation: 10,
  },
});

export default Video;
