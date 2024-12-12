import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  Image,
  ViewStyle,
  Animated,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AppButton from "./AppButton";
import { RTCView, MediaStream } from "react-native-webrtc";
import { getWebRTCFirbaseProxyInstance } from "@rn-video-call/webrtc_firebase";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface VideoProps {
  localStream?: MediaStream;
  remoteStream?: MediaStream;
}

interface ButtonContainerProps extends VideoProps {
  isMuted?: boolean;
  isFrontCamera?: boolean;
  localCameraEnabled?: boolean;
  remoteCameraEnabled?: boolean;
  hangup?: () => void;
  toggleIsMuted?: () => void;
  toggleIsFrontCam?: () => void;
  toggleCam?: () => void;
}

const ButtonContainer = ({
  isMuted,
  isFrontCamera,
  localCameraEnabled,
  remoteCameraEnabled,
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
            name={isFrontCamera ? "camera-reverse" : "camera"}
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
  width: Animated.Value | `${number}%`;
  height: Animated.Value | `${number}%`;
};

const VideoComponent = ({
  streamURL,
  style,
  zOrder = 2,
  borderWidth = 0,
  enable = false,
  width = "100%",
  height = "100%",
}: Props) => {
  return (
    <Animated.View
      style={[
        style,
        {
          top: 0,
          left: 0,
          borderColor: "gray",
          borderWidth,
          width,
          height,
        },
      ]}
    >
      {enable ? (
        <RTCView
          streamURL={streamURL}
          objectFit={"cover"}
          mirror={true}
          zOrder={zOrder}
          style={{ flex: 1 }}
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: "https://picsum.photos/200/300" }}
            style={styles.image}
          />
        </View>
      )}
    </Animated.View>
  );
};

const Video = ({
  localStream,
  remoteStream,
}: VideoProps) => {
  const client = useRef(getWebRTCFirbaseProxyInstance({}));
  const widthRef = useRef(new Animated.Value(windowWidth)).current;
  const heightRef = useRef(new Animated.Value(windowHeight)).current;

  const [isMuted, setIsMuted] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [localCameraEnabled, setLocalCameraEnabled] = useState(true);
  const [remoteCameraEnabled, setRemoteCameraEnabled] = useState(true);

  useEffect(() => {
    client.current.setupInCallProperties({
      setIsMuted,
      setIsFrontCamera,
      setLocalCameraEnabled,
      setRemoteCameraEnabled,
    });
  }, []);

  const hangup = useCallback(() => {
    client.current?.hangup();
  }, []);
  const toggleIsMuted = useCallback(() => {
    client.current?.toggleActiveMicrophone();
  }, []);
  const toggleIsFrontCam = useCallback(() => {
    client.current?.switchingCamera();
  }, []);
  const toggleCam = useCallback(() => {
    client.current?.toggleCameraEnabled();
  }, []);

  const AnimateResult = () => {
    Animated.timing(widthRef, {
      toValue: 100,
      duration: 500,
      useNativeDriver: false,
    }).start();

    Animated.timing(heightRef, {
      toValue: 150,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    if (remoteStream) {
      AnimateResult();
    }
  }, [remoteStream]);

  return (
    <View style={styles.container}>
      <VideoComponent
        streamURL={remoteStream?.toURL()}
        style={styles.video}
        zOrder={0}
        enable={remoteCameraEnabled}
        width={"100%"}
        height={"100%"}
      />

      <VideoComponent
        streamURL={localStream?.toURL()}
        style={styles.video}
        zOrder={1}
        borderWidth={1}
        enable={localCameraEnabled}
        width={widthRef}
        height={heightRef}
      />

      <ButtonContainer
        {...{
          isMuted,
          isFrontCamera,
          localCameraEnabled,
          hangup,
          toggleIsMuted,
          toggleIsFrontCam,
          toggleCam,
        }}
      />
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
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});

export default Video;
