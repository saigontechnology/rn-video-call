import { View, ViewStyle, StyleSheet, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ButtonCall, { ButtonCallProps } from "./ButtonCall";
import { COLORS } from "./videoCallContent.constants";

type CallTopViewProps = {
  isCalling?: boolean;
  containerStyles?: ViewStyle;
  dropdownProps?: CallTopViewDropDownProps;
  actionsProps?: CallTopViewActionsProps;
  buttonSoundProps?: ButtonCallProps;
  buttonAddGroupProps?: ButtonCallProps;
  buttonChatProps?: ButtonCallProps;
  buttonOptionsProps?: ButtonCallProps;
  onBack?: VoidFunction;
  onSound?: VoidFunction;
  onAddGroup?: VoidFunction;
  onChat?: VoidFunction;
  onOptions?: VoidFunction;
};

export type CallTopViewDropDownProps = {
  containerStyles?: ViewStyle;
  onPress?: VoidFunction;
};

type CallTopViewActionsProps = {
  children?: ReactNode;
  containerStyles?: ViewStyle;
};

const BUTTON_SIZE = 44;
const ICON_SIZE = 26;

const CallTopView = ({
  isCalling = false,
  containerStyles,
  dropdownProps,
  actionsProps,
  buttonSoundProps,
  buttonAddGroupProps,
  buttonChatProps,
  buttonOptionsProps,
  onBack,
  onSound,
  onAddGroup,
  onChat,
  onOptions,
}: CallTopViewProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <CallTopView.Dropdown onPress={onBack} {...dropdownProps} />
      {isCalling && (
        <CallTopView.Actions {...actionsProps}>
          <CallTopView.ButtonSound onPress={onSound} {...buttonSoundProps} />
          <CallTopView.ButtonAddGroup
            onPress={onAddGroup}
            {...buttonAddGroupProps}
          />
          <CallTopView.ButtonChat onPress={onChat} {...buttonChatProps} />
          <CallTopView.ButtonOptions
            onPress={onOptions}
            {...buttonOptionsProps}
          />
        </CallTopView.Actions>
      )}
    </View>
  );
};

const CallTopViewDropdown = ({
  containerStyles,
  onPress,
}: CallTopViewDropDownProps) => {
  return (
    <TouchableOpacity
      style={[styles.dropdownWrap, containerStyles]}
      onPress={onPress}>
      <MaterialCommunityIcons name="chevron-down" color="white" size={34} />
    </TouchableOpacity>
  );
};

const CallTopViewActions = ({
  containerStyles,
  children,
}: CallTopViewActionsProps) => {
  return <View style={[styles.actions, containerStyles]}>{children}</View>;
};

const CallTopViewButtonSound = ({
  iconName = "volume-high",
  ...rest
}: ButtonCallProps) => {
  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconName}
      iconSize={ICON_SIZE}
      backgroundColor={COLORS.bgIcon}
      {...rest}
    />
  );
};

const CallTopViewButtonAddGroup = ({
  iconName = "account-multiple",
  ...rest
}: ButtonCallProps) => {
  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconName}
      iconSize={ICON_SIZE}
      backgroundColor={COLORS.bgIcon}
      {...rest}
    />
  );
};

const CallTopViewButtonChat = ({
  iconName = "chat",
  ...rest
}: ButtonCallProps) => {
  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconName}
      iconSize={ICON_SIZE}
      backgroundColor={COLORS.bgIcon}
      {...rest}
    />
  );
};

const CallTopViewButtonOptions = ({
  iconName = "dots-vertical",
  ...rest
}: ButtonCallProps) => {
  return (
    <ButtonCall
      buttonSize={BUTTON_SIZE}
      iconName={iconName}
      iconSize={ICON_SIZE}
      backgroundColor={COLORS.bgIcon}
      {...rest}
    />
  );
};

CallTopView.Dropdown = CallTopViewDropdown;
CallTopView.Actions = CallTopViewActions;
CallTopView.ButtonSound = CallTopViewButtonSound;
CallTopView.ButtonAddGroup = CallTopViewButtonAddGroup;
CallTopView.ButtonChat = CallTopViewButtonChat;
CallTopView.ButtonOptions = CallTopViewButtonOptions;

export default CallTopView;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    marginVertical: 12,
  },
});
