import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5;
const MIN_TRANSLATE_Y = SCREEN_HEIGHT / 5;

export const BottomSheet = ({
  children,
  visible,
  setVisible,
}: {
  children: React.ReactNode;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [maxHeight, setMaxHeight] = React.useState(MIN_TRANSLATE_Y);

  const translateY = useSharedValue(0);
  const context = useSharedValue({ y: 0 });

  const gesture = Gesture.Pan()
    .onStart((e) => {
      context.value = { y: translateY.value };
    })
    .onUpdate((e) => {
      translateY.value = e.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, -MAX_TRANSLATE_Y);
    })
    .onEnd((e) => {
      if (translateY.value > -MIN_TRANSLATE_Y) {
        translateY.value = withSpring(
          SCREEN_HEIGHT,
          { damping: 100, stiffness: 500 },
          () => {
            runOnJS(setVisible)(false);
            runOnJS(setMaxHeight)(MIN_TRANSLATE_Y);
          }
        );
      }
      if (translateY.value < -MIN_TRANSLATE_Y) {
        translateY.value = withSpring(-MAX_TRANSLATE_Y, {}, () => {
          runOnJS(setMaxHeight)(SCREEN_HEIGHT / 2);
        });
      }
    });

  const reanimatedBottomStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const scrollTo = (destination: number) => {
    "worklet";
    translateY.value = withSpring(destination, { damping: 50, stiffness: 200 });
  };

  scrollTo(visible ? -SCREEN_HEIGHT / 3 : SCREEN_HEIGHT);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          reanimatedBottomStyle,
          {
            height: SCREEN_HEIGHT,
            top: SCREEN_HEIGHT / 1.5,
            elevation: 12000,
          },
        ]}
        className="w-full absolute rounded-3xl py-2 bg-background shadow-[0_0px_2px_0px] shadow-foreground z-[12000]"
      >
        <View className="bg-foreground w-20 h-1 rounded-2xl self-center my-3" />

        <ScrollView className="mt-4 flex-1" style={{ maxHeight }}>
          {children}
        </ScrollView>
      </Animated.View>
    </GestureDetector>
  );
};
