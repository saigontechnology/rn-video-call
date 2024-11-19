import { useCallback, useMemo } from "react";
import { useWindowDimensions } from "react-native";

export const useCalculateItemSize = (
  containerHeight: number,
  length: number
) => {
  const { width } = useWindowDimensions();

  const getWidthItem = useCallback(
    (index: number) => {
      let widthItem = width / 2;

      if (index === 0 && length % 2 !== 0) {
        widthItem = width;
      }

      return widthItem;
    },
    [length, width]
  );

  const heightItem = useMemo(() => {
    let heightItem = containerHeight / 3;

    if (length <= 4) {
      heightItem = containerHeight / 2;
    }

    return heightItem;
  }, [containerHeight, length]);

  return { getWidthItem, heightItem };
};
