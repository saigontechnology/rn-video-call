import { ImageStyle, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { COLORS } from "./videoCallContent.constants";
import { Image } from "expo-image";

type VideoBuddleProps = {
  uri?: string;
  containerStyle?: ViewStyle;
  imageStyles?: ImageStyle;
};

const WIDTH = 112;
const HEIGHT = 200;

const VideoBuddle = ({
  uri,
  containerStyle,
  imageStyles,
}: VideoBuddleProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image style={[styles.avatar, imageStyles]} source={{ uri }} />
    </View>
  );
};

export default VideoBuddle;

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: COLORS.bgIcon,
    width: WIDTH,
    height: HEIGHT,
    overflow: "hidden",
    position: "absolute",
    bottom: 12,
    right: 0,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
