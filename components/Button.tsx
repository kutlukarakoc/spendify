import {
  Pressable,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { Colors } from "~/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type ButtonProps = {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  variant: "primary" | "secondary" | "tertiary";
  size: "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  iconLeft?: string;
  iconRight?: string;
};

const Icon = ({
  name,
  color,
  loading,
}: {
  name: string;
  color: string;
  loading: boolean;
}) =>
  loading ? (
    <ActivityIndicator size={24} color={color} />
  ) : (
    <Ionicons name={name as any} size={24} color={color} />
  );

export const Button = ({
  children,
  onPress,
  style,
  variant,
  size,
  disabled,
  loading = false,
  iconLeft,
  iconRight,
}: ButtonProps) => {
  const disableOrLoading = disabled || loading;
  const color = disableOrLoading
    ? styles[`${variant}DisabledText`].color
    : styles[`${variant}Text`].color;

  return (
    <Pressable
      onPress={onPress}
      disabled={disableOrLoading}
      aria-disabled={disableOrLoading}
      style={({ pressed }) => [
        styles.defaults,
        styles[variant],
        styles[size],
        disableOrLoading ? styles[`${variant}Disabled`] : undefined,
        { opacity: pressed ? 0.7 : 1 },
        style,
      ]}
    >
      {iconLeft && <Icon name={iconLeft} color={color} loading={loading} />}
      <Text
        style={[
          styles.defaultText,
          disableOrLoading
            ? styles[`${variant}DisabledText`]
            : styles[`${variant}Text`],
        ]}
      >
        {children}
      </Text>
      {iconRight && <Icon name={iconRight} color={color} loading={loading} />}
      {!iconRight && !iconLeft && loading && (
        <ActivityIndicator size={24} color={color} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
    fontFamily: "Inter",
  },
  defaults: {
    borderRadius: 6,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  medium: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  large: {
    padding: 16,
  },

  primary: {
    backgroundColor: Colors["blue-500"],
  },
  secondary: {
    backgroundColor: Colors["main"],
    borderColor: Colors["blue-500"],
    borderWidth: 1,
  },
  tertiary: {
    backgroundColor: "transparent",
  },

  primaryDisabled: {
    backgroundColor: Colors["grey-100"],
  },
  secondaryDisabled: {
    backgroundColor: Colors["main"],
    borderColor: Colors["grey-100"],
  },
  tertiaryDisabled: {
    backgroundColor: "transparent",
  },

  primaryText: {
    color: Colors["main"],
  },
  secondaryText: {
    color: Colors["blue-500"],
  },
  tertiaryText: {
    color: Colors["blue-500"],
  },

  primaryDisabledText: {
    color: Colors["main"],
  },
  secondaryDisabledText: {
    color: Colors["grey-100"],
  },
  tertiaryDisabledText: {
    color: Colors["grey-100"],
  },
});
