import React, { useState, useRef } from "react";
import { Text, View, Dimensions, Animated } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const deviceWindow = Dimensions.get("window");

const CustomScroll = ({
  content,
  backgroundColor,
  foregroundColor,
  textsize,
  contentColor,
  contentBackground,
}) => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);

  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight) /
        completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight
  ).interpolate({
    inputRange: [0, difference],
    outputRange: [0, difference],
    extrapolate: "clamp",
  });
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        paddingHorizontal: deviceWindow.width * 0.01,
        backgroundColor: contentBackground,
        borderRadius: contentBackground === "transparent" ? 0 : 4,
      }}
    >
      <ScrollView
        contentContainerStyle={{ paddingRight: 14 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onContentSizeChange={(_, height) => {
          setCompleteScrollBarHeight(height);
        }}
        onLayout={({
          nativeEvent: {
            layout: { height },
          },
        }) => {
          setVisibleScrollBarHeight(height);
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
          { useNativeDriver: false }
        )}
      >
        <Text
          style={{
            fontSize: deviceWindow.height * textsize,
            fontFamily: "Barlow_500Medium",
            color: contentColor,
          }}
        >
          {content}
        </Text>
      </ScrollView>
      <View
        style={{
          height: "100%",
          width: deviceWindow.width < 560 ? 6 : 10,
          backgroundColor: backgroundColor,
          borderRadius: 8,
        }}
      >
        <Animated.View
          style={{
            width: deviceWindow.width < 560 ? 6 : 10,
            borderRadius: 8,
            backgroundColor: foregroundColor,
            height: scrollIndicatorSize,
            transform: [{ translateY: scrollIndicatorPosition }],
          }}
        />
      </View>
    </View>
  );
};

export default CustomScroll;
