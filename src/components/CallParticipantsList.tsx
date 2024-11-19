import {
  LayoutChangeEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import CallParticipantItem from "./CallParticipantItem";
import { useCalculateItemSize } from "./videoCallContent.hooks";

export type ParticipantsItems = {
  id: string;
  name?: string;
  avtUrl?: string;
  isMicro?: boolean;
  isCamera?: boolean;
};

type CallParticipantsListProps = {
  data: ParticipantsItems[];
};

const CallParticipantsList = ({ data }: CallParticipantsListProps) => {
  const [containerHeight, setContainerHeight] = useState(0);

  const length = useMemo(() => data?.length, [data]);
  const scrollEnabled = useMemo(() => length > 5, [length]);
  const { getWidthItem, heightItem } = useCalculateItemSize(
    containerHeight,
    length
  );

  const onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setContainerHeight(nativeEvent.layout.height);
  };

  const renderItem = (item: ParticipantsItems, index: number) => {
    return (
      <CallParticipantItem
        avtUrl={item.avtUrl}
        containerStyles={{
          width: getWidthItem(index),
          height: heightItem,
        }}
      />
    );
  };

  return (
    <View style={styles.container} onLayout={onLayout}>
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.content}>{data?.map(renderItem)}</View>
      </ScrollView>
    </View>
  );
};

export default CallParticipantsList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
