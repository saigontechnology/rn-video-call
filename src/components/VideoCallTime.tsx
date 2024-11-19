import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "./videoCallContent.constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const VideoCallTime = () => {
  return (
    <View style={styles.timeWrap}>
      <Text style={styles.timeTxt}>0:01</Text>
      <MaterialCommunityIcons name="lock" color="white" size={14} />
    </View>
  );
};

export default VideoCallTime;

const styles = StyleSheet.create({
  timeWrap: {
    position: "absolute",
    backgroundColor: COLORS.bgIcon,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 5,
    paddingHorizontal: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  timeTxt: {
    color: "white",
    marginRight: 5,
  },
});
