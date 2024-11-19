import { Dimensions, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Image, ImageBackground } from "expo-image";
import { hexToRGB } from "./videoCallContent.utils";
import AvatarInfo from "./AvatarInfo";

type CallParticipantItemProps = {
  avtUrl?: string;
  containerStyles?: ViewStyle;
};

const CallParticipantItem = ({
  avtUrl,
  containerStyles,
}: CallParticipantItemProps) => {
  return (
    <View style={[styles.container, containerStyles]}>
      <ImageBackground source={{ uri: avtUrl }} style={styles.content}>
        <View style={styles.blurDark} />

        <View style={styles.avtWrap}>
          <Image style={[styles.avatar]} source={{ uri: avtUrl }} />
        </View>
      </ImageBackground>
    </View>
  );
};

export default CallParticipantItem;

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  content: {
    flex: 1,
    backgroundColor: "green",
    borderRadius: 12,
    padding: 12,
    overflow: "hidden",
  },
  blurDark: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: hexToRGB("#000000", 0.6),
  },
  avtWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: 84,
    height: 84,
    borderRadius: 84,
  },
});
