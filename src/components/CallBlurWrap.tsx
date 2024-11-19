import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { ReactNode } from "react";
import { Edges, SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground } from "expo-image";

export type CallBlurWrapProps = {
  children?: ReactNode;
  uri?: string;
  blurRadius?: number;
  edges?: Edges;
  containerStyles?: ViewStyle;
  contentStyles?: ViewStyle;
};

const CallBlurWrap = ({
  children,
  uri,
  blurRadius = 30,
  edges,
  containerStyles,
  contentStyles,
}: CallBlurWrapProps) => {
  return (
    <ImageBackground
      style={[styles.container, containerStyles]}
      source={{ uri }}
      blurRadius={blurRadius}>
      <SafeAreaView style={[styles.content, contentStyles]} edges={edges}>
        {children}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CallBlurWrap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
});
