import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native";

type AppButtonProps = {
  backgroundColor: string;
  onPress?: TouchableOpacityProps["onPress"];
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const AppButton = ({
  backgroundColor,
  onPress,
  style,
  children,
}: AppButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, style, { backgroundColor: backgroundColor }]}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    padding: 10,
    elevation: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});

export default AppButton;
