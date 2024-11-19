import { ImageStyle, StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import CallBlurWrap, { CallBlurWrapProps } from "./CallBlurWrap";

export type VideoWrapProps = {
  children?: ReactNode;
  containerStyles?: ViewStyle;
  imageStyles?: ImageStyle;
  edges?: Edges;
  uri?: string;
  isVideoCall?: boolean;
  blurWrapProps?: CallBlurWrapProps;
};

const VideoWrap = ({
  children,
  containerStyles,
  imageStyles,
  edges,
  uri,
  isVideoCall = false,
  blurWrapProps,
}: VideoWrapProps) => {
  if (!isVideoCall) {
    return (
      <CallBlurWrap uri={uri} {...blurWrapProps}>
        {children}
      </CallBlurWrap>
    );
  }

  return (
    <SafeAreaView style={[styles.wrap, containerStyles]} edges={edges}>
      <View style={styles.contentWrap}>
        <Image style={[styles.avatar, imageStyles]} source={{ uri }} />
      </View>
      {children}
    </SafeAreaView>
  );
};

export default VideoWrap;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    padding: 16,
  },
  contentWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
});
