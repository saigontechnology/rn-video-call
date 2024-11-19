import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode, useMemo } from "react";
import ButtonCall, { ButtonCallProps } from "./ButtonCall";
import { COLORS } from "./videoCallContent.constants";

export type CallControlsProps = {
  isVideoCall?: boolean;
  containerStyles?: ViewStyle;
  onSwitchCamera?: VoidFunction;
  onCamera?: VoidFunction;
  onVoice?: VoidFunction;
  onHangup?: VoidFunction;
  buttonPhoneProps?: ButtonCallProps;
  buttonSwitchCamera?: ButtonCallProps;
  buttonVideo?: ButtonCallProps;
  buttonMicro?: ButtonCallProps;
  buttonHangup?: ButtonCallProps;
};

type CallControlsWrapProps = {
  children?: ReactNode;
  containerStyles?: ViewStyle;
};

type CallControlsButtonVideoProps = ButtonCallProps & {
  isVideoCall?: boolean;
};

export const BUTTON_SIZE = 58;

const CallControls = ({
  isVideoCall = false,
  containerStyles,
  onSwitchCamera,
  onCamera,
  onVoice,
  onHangup,
  buttonSwitchCamera,
  buttonVideo,
  buttonMicro,
  buttonHangup,
}: CallControlsProps) => {
  return (
    <CallControls.Wrap containerStyles={containerStyles}>
      {isVideoCall && (
        <CallControls.ButtonSwitch
          onPress={onSwitchCamera}
          {...buttonSwitchCamera}
        />
      )}
      <CallControls.ButtonVideo
        isVideoCall={isVideoCall}
        onPress={onCamera}
        {...buttonVideo}
      />
      <CallControls.ButtonMicro onPress={onVoice} {...buttonMicro} />
      <CallControls.ButtonHangup onPress={onHangup} {...buttonHangup} />
    </CallControls.Wrap>
  );
};

const CallControlsWrap = ({
  containerStyles,
  children,
}: CallControlsWrapProps) => {
  return <View style={[styles.container, containerStyles]}>{children}</View>;
};

const CallControlsButtonPhone = ({
  iconName = "phone",
  ...rest
}: ButtonCallProps) => {
  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconName}
      backgroundColor={COLORS.bgIcon}
      {...rest}
    />
  );
};

const CallControlsButtonSwitch = ({
  iconName = "autorenew",
  ...rest
}: ButtonCallProps) => {
  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconName}
      backgroundColor={COLORS.bgIcon}
      containerStyles={{ transform: [{ rotate: "90deg" }] }}
      {...rest}
    />
  );
};

const CallControlsButtonVideo = ({
  iconName,
  isVideoCall = false,
  ...rest
}: CallControlsButtonVideoProps) => {
  const iconNameCur = useMemo(() => {
    if (iconName) {
      return iconName;
    }
    return isVideoCall ? "video" : "video-off";
  }, [iconName, isVideoCall]);

  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconNameCur}
      backgroundColor={isVideoCall ? COLORS.bgIcon : "white"}
      iconColor={isVideoCall ? "white" : "black"}
      {...rest}
    />
  );
};

const CallControlsButtonMicro = ({
  iconName = "microphone",
  ...rest
}: ButtonCallProps) => {
  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconName}
      backgroundColor={COLORS.bgIcon}
      {...rest}
    />
  );
};

const CallControlsButtonHangup = ({
  iconName = "phone-hangup",
  ...rest
}: ButtonCallProps) => {
  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconName}
      backgroundColor={COLORS.hangup}
      {...rest}
    />
  );
};

CallControls.Wrap = CallControlsWrap;
CallControls.ButtonPhone = CallControlsButtonPhone;
CallControls.ButtonSwitch = CallControlsButtonSwitch;
CallControls.ButtonVideo = CallControlsButtonVideo;
CallControls.ButtonMicro = CallControlsButtonMicro;
CallControls.ButtonHangup = CallControlsButtonHangup;

export default CallControls;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 40,
    marginTop: 12,
  },
});
