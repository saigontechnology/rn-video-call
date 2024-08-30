import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppButton from "./AppButton";
import { RTCView, MediaStream } from "react-native-webrtc";

type VideoProps = ButtonContainerProps & {
  hangup: () => any;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
};

type ButtonContainerProps = {
  isMuted?: boolean;
  isFrontCam?: boolean;
  localCameraEnabled?: boolean;
  remoteCameraEnabled?: boolean;

  hangup?: () => void;
  toggleIsMuted?: () => void;
  toggleIsFrontCam?: () => void;
  toggleCam?: () => void;
};

const ButtonContainer = ({
  isMuted,
  isFrontCam,
  localCameraEnabled,

  hangup,
  toggleIsMuted,
  toggleIsFrontCam,
  toggleCam,
}: ButtonContainerProps) => {
  return (
    <View style={styles.bContainer}>
      {!!toggleIsFrontCam && (
        <AppButton backgroundColor="black" onPress={toggleIsFrontCam}>
          <Ionicons
            name={isFrontCam ? "camera-reverse" : "camera"}
            size={24}
            color={"white"}
          />
        </AppButton>
      )}

      {!!toggleCam && (
        <AppButton backgroundColor="black" onPress={toggleCam}>
          <Ionicons
            name={localCameraEnabled ? "videocam" : "videocam-off"}
            size={24}
            color={"white"}
          />
        </AppButton>
      )}

      {!!toggleIsMuted && (
        <AppButton backgroundColor="black" onPress={toggleIsMuted}>
          <Ionicons
            name={isMuted ? "mic-off" : "mic"}
            size={24}
            color={"white"}
          />
        </AppButton>
      )}

      {!!hangup && (
        <AppButton backgroundColor="red" onPress={hangup}>
          <Ionicons name="stop-outline" color="white" size={24} />
        </AppButton>
      )}
    </View>
  );
};

type Props = {
  streamURL?: string;
  style?: StyleProp<ViewStyle>;
  zOrder?: number;
  borderWidth?: number;
  enable?: Boolean;
};

const VideoComponent = ({
  streamURL,
  style,
  zOrder = 999,
  borderWidth = 0,
  enable = false,
}: Props) => {
  return (
    <View style={[style, { borderColor: "gray", borderWidth }]}>
      {enable ? (
        <RTCView
          streamURL={streamURL}
          objectFit={"cover"}
          mirror={true}
          zOrder={zOrder}
          style={{ flex: 1 }}
        />
      ) : (
        <View style={[{ backgroundColor: "black", zIndex: zOrder }]} />
      )}
    </View>
  );
};

const Video = ({
  hangup,
  localStream,
  remoteStream,
  isMuted,
  isFrontCam,
  localCameraEnabled,
  remoteCameraEnabled,
  toggleIsMuted,
  toggleIsFrontCam,
  toggleCam,
}: VideoProps) => {
  // On call we will just display the local stream
  // if (localStream && !remoteStream) {
  //   return (
  //     <View style={styles.container}>
  //       {/* <VideoComponent
  //         streamURL={localStream.toURL()}
  //         style={styles.video}
  //         zOrder={997}
  //         enable
  //       /> */}

  //       <ButtonContainer hangup={hangup} />
  //     </View>
  //   );
  // }
  // Once the call is connected, we will display
  // local Stream on top of remote stream
  // if (localStream || remoteStream) {
  
    return (
      <View style={styles.container}>
        <VideoComponent
          streamURL={remoteStream?.toURL()}
          style={styles.video}
          zOrder={998}
          enable={remoteCameraEnabled}
        />

        <VideoComponent
          streamURL={localStream?.toURL()}
          style={styles.videoLocal}
          zOrder={999}
          borderWidth={1}
          enable={localCameraEnabled}
        />

        <ButtonContainer
          {...{
            isMuted,
            isFrontCam,
            localCameraEnabled,
            hangup,
            toggleIsMuted,
            toggleIsFrontCam,
            toggleCam,
          }}
        />
      </View>
    );
  // }
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
