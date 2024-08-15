import { RTCView } from "react-native-webrtc";
import { StyleProp, ViewStyle } from "react-native/types";

type Props = {
  streamURL?: string;
  style?: StyleProp<ViewStyle>;
};

const VideoComponent = ({ streamURL, style }: Props) => {
  return <RTCView streamURL={streamURL} objectFit={"cover"} style={style} />;
};

export default VideoComponent;
