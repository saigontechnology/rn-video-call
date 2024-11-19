import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import React from "react";
import { Image } from "expo-image";

export type AvatarInfoProps = {
  uri?: string;
  name?: string;
  desc?: string;
  containerStyles?: ViewStyle;
  imageStyles?: ImageStyle;
  nameStyles?: TextStyle;
  descStyles?: TextStyle;
};

const AvatarInfo = ({
  uri,
  name,
  desc,
  containerStyles,
  imageStyles,
  nameStyles,
  descStyles,
}: AvatarInfoProps) => {
  return (
    <View style={[styles.infoWrap, containerStyles]}>
      <Image style={[styles.avatar, imageStyles]} source={{ uri }} />
      <Text style={[styles.name, nameStyles]}>{name}</Text>
      <Text style={[styles.desc, descStyles]}>{desc}</Text>
    </View>
  );
};

export default AvatarInfo;

const styles = StyleSheet.create({
  infoWrap: {
    flex: 1,
    alignItems: "center",
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 180,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginTop: 16,
  },
  desc: {
    color: "white",
    marginTop: 8,
  },
});
