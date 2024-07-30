import { RTCView } from "react-native-webrtc";
import { StyleProp, ViewStyle } from "react-native/types";

type Props = {
  streamURL?: string;
  style?: StyleProp<ViewStyle>;
};

const VideoComponent = (props: Props) => {
  console.log('renderVideoComponent', props)
  return (
    <RTCView
      streamURL={props.streamURL}
      objectFit={"cover"}
      style={props.style}
    />
  );
};

export default VideoComponent;
