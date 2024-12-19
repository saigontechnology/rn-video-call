import React from "react";
import { RTCView } from "react-native-webrtc";
import { StyleProp, ViewStyle } from "react-native";

type Props = {
  streamURL?: string;
  style?: StyleProp<ViewStyle>;
};

const VideoComponent = (props: Props) => (
  <RTCView
    streamURL={props.streamURL}
    objectFit={"cover"}
    style={props.style}
  />
);

export default VideoComponent;
