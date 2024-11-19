import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";

import ButtonCall from "./ButtonCall";
import { COLORS } from "./videoCallContent.constants";
import CallBlurWrap, { CallBlurWrapProps } from "./CallBlurWrap";
import AvatarInfo, { AvatarInfoProps } from "./AvatarInfo";

type IncomingCallProps = {
  uri?: string;
  isVideoCall?: boolean;
  wrapProps?: CallBlurWrapProps;
  infoProps?: AvatarInfoProps;
  actionsProps?: IncomingCallActionsProps;
  buttonDeclineProps?: IncomingCallButtonProps;
  buttonAcceptProps?: IncomingCallButtonProps;

  onDecline?: VoidFunction;
  onAccept?: VoidFunction;
};

type IncomingCallActionsProps = {
  children?: ReactNode;
  containerStyles?: ViewStyle;
};

type IncomingCallButtonProps = {
  isVideoCall?: boolean;
  containerStyles?: ViewStyle;
  textStyles?: TextStyle;
  onPress?: VoidFunction;
};

const IncomingCall = ({
  uri,
  isVideoCall = false,
  wrapProps,
  infoProps,
  actionsProps,
  buttonDeclineProps,
  buttonAcceptProps,

  onDecline,
  onAccept,
}: IncomingCallProps) => {
  return (
    <CallBlurWrap uri={uri} {...wrapProps}>
      <AvatarInfo uri={uri} containerStyles={styles.infoWrap} {...infoProps} />

      <IncomingCall.Actions {...actionsProps}>
        <IncomingCall.ButtonDecline
          isVideoCall={isVideoCall}
          onPress={onDecline}
          {...buttonDeclineProps}
        />
        <IncomingCall.ButtonAccept
          isVideoCall={isVideoCall}
          onPress={onAccept}
          {...buttonAcceptProps}
        />
      </IncomingCall.Actions>
    </CallBlurWrap>
  );
};

const IncomingCallActions = ({
  children,
  containerStyles,
}: IncomingCallActionsProps) => {
  return <View style={[styles.footView, containerStyles]}>{children}</View>;
};

const IncomingCallButtonDecline = ({
  isVideoCall,
  containerStyles,
  textStyles,
  onPress,
}: IncomingCallButtonProps) => {
  return (
    <View style={[styles.btnWrap, containerStyles]}>
      <ButtonCall
        iconName={isVideoCall ? "close" : "phone-hangup"}
        backgroundColor={COLORS.hangup}
        onPress={onPress}
      />
      <Text style={[styles.btnTxt, textStyles]}>Decline</Text>
    </View>
  );
};

const IncomingCallButtonAccept = ({
  isVideoCall,
  containerStyles,
  textStyles,
  onPress,
}: IncomingCallButtonProps) => {
  return (
    <View style={[styles.btnWrap, containerStyles]}>
      <ButtonCall
        iconName={isVideoCall ? "video" : "phone"}
        backgroundColor={COLORS.accept}
        onPress={onPress}
      />
      <Text style={[styles.btnTxt, textStyles]}>
        {isVideoCall ? "Reply with video" : "Accept"}
      </Text>
    </View>
  );
};

IncomingCall.Actions = IncomingCallActions;
IncomingCall.ButtonDecline = IncomingCallButtonDecline;
IncomingCall.ButtonAccept = IncomingCallButtonAccept;

export default IncomingCall;

const styles = StyleSheet.create({
  infoWrap: {
    marginTop: 40,
  },
  footView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btnWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  btnTxt: {
    color: "white",
    marginTop: 10,
  },
});
