import { View, Text, StyleSheet } from "react-native";
import React from "react";

import AvatarInfo, { AvatarInfoProps } from "./AvatarInfo";
import CallControls, { CallControlsProps } from "./CallControls";
import CallTopView, { CallTopViewDropDownProps } from "./CallTopView";
import VideoWrap, { VideoWrapProps } from "./VideoWrap";

type OutgoingCallProps = {
  uri?: string;
  isVideoCall?: boolean;
  wrapProps?: VideoWrapProps;
  infoProps?: AvatarInfoProps;
  dropdownProps?: CallTopViewDropDownProps;
  callControlsProps?: CallControlsProps;
};

const OutgoingCall = ({
  uri,
  isVideoCall = true,
  wrapProps,
  infoProps,
  dropdownProps,
  callControlsProps,
}: OutgoingCallProps) => {
  return (
    <VideoWrap isVideoCall={isVideoCall} uri={uri} {...wrapProps}>
      <CallTopView {...dropdownProps} />
      {isVideoCall ? (
        <View style={styles.content}>
          <Text style={styles.contentTxt}>Waiting...</Text>
        </View>
      ) : (
        <AvatarInfo
          uri={uri}
          containerStyles={styles.infoContainer}
          {...infoProps}
        />
      )}
      <CallControls isVideoCall={isVideoCall} {...callControlsProps} />
    </VideoWrap>
  );
};

export default OutgoingCall;

const styles = StyleSheet.create({
  infoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
  },
  contentTxt: {
    color: "white",
    marginTop: 20,
  },
});
