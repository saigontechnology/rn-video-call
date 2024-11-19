import { View, Text, StyleSheet } from "react-native";
import React from "react";
import VideoWrap, { VideoWrapProps } from "./VideoWrap";
import CallTopView, { CallTopViewDropDownProps } from "./CallTopView";
import CallControls, { CallControlsProps } from "./CallControls";
import VideoBuddle from "./VideoBuddle";
import VideoCallTime from "./VideoCallTime";
import { SafeAreaView } from "react-native-safe-area-context";
import CallParticipantsList, {
  ParticipantsItems,
} from "./CallParticipantsList";

type VideoCallContentProps = {
  uri?: string;
  isVideoCall?: boolean;
  data: ParticipantsItems[];
  wrapProps?: VideoWrapProps;
  dropdownProps?: CallTopViewDropDownProps;
  callControlsProps?: CallControlsProps;
};

const VideoCallContent = ({
  uri = "https://th.bing.com/th/id/OIP.sC5gWwVXXiQnXtGV2bR8JwHaHa?w=221&h=220&c=7&r=0&o=5&dpr=2&pid=1.7",
  isVideoCall = true,
  data,
  wrapProps,
  dropdownProps,
  callControlsProps,
}: VideoCallContentProps) => {
  if (data?.length > 2) {
    return (
      <SafeAreaView style={styles.listWrap}>
        <CallTopView isCalling {...dropdownProps} />
        <View style={styles.listWrap}>
          <CallParticipantsList data={data} />
          <VideoCallTime />
        </View>
        <CallControls isVideoCall={isVideoCall} {...callControlsProps} />
      </SafeAreaView>
    );
  }

  return (
    <VideoWrap isVideoCall={isVideoCall} uri={uri} {...wrapProps}>
      <CallTopView isCalling {...dropdownProps} />
      <View style={styles.content}>
        <VideoCallTime />
        <VideoBuddle />
      </View>
      <CallControls isVideoCall={isVideoCall} {...callControlsProps} />
    </VideoWrap>
  );
};

export default VideoCallContent;

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  listWrap: {
    flex: 1,
    backgroundColor: "#14161C",
  },
});
