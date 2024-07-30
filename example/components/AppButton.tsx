import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

type AppButtonType = {
  iconName: string;
  backgroundColor: string;
  onPress: () => void;
  style?: any;
};

function AppButton({
  iconName,
  backgroundColor,
  onPress,
  style,
}: AppButtonType) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, style, { backgroundColor: backgroundColor }]}>
        <FontAwesome5 name={iconName} color="white" size={20}></FontAwesome5>
      </TouchableOpacity>
    </View>
  );
}

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
