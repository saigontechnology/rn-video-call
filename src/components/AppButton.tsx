import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type AppButtonProps = {
  backgroundColor: string;
  onPress: () => void;
  style?: any;
};

const AppButton = ({ backgroundColor, onPress, style }: AppButtonProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, style, { backgroundColor: backgroundColor }]}
      />
    </View>
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
