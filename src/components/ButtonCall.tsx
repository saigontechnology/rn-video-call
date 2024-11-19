import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export type ButtonCallProps = {
  iconName?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  buttonSize?: number;
  iconSize?: number;
  iconColor?: string;
  backgroundColor?: string;
  onPress?: VoidFunction;
  containerStyles?: ViewStyle;
};

const BUTTON_SIZE = 68;
const ICON_SIZE = 34;

const ButtonCall = ({
  iconName,
  buttonSize = BUTTON_SIZE,
  iconSize = ICON_SIZE,
  iconColor = "white",
  backgroundColor = "black",
  onPress,
  containerStyles,
}: ButtonCallProps) => {
  return (
    <TouchableOpacity
      style={[
        {
          width: buttonSize,
          height: buttonSize,
          borderRadius: buttonSize,
          backgroundColor,
        },
        styles.container,
        containerStyles,
      ]}
      onPress={onPress}>
      <MaterialCommunityIcons
        name={iconName}
        color={iconColor}
        size={iconSize}
      />
    </TouchableOpacity>
  );
};

export default ButtonCall;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
