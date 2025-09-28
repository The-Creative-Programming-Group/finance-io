import React from "react";
import { TouchableOpacity } from "react-native";
import AppText from "./ui/AppText";

type ButtonProps = {
  title: string;
  onPress: () => void;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
};

export default function Button({
  title,
  onPress,
  className = "",
  textClassName = "",
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`items-center justify-center rounded-xl px-4 py-3 ${
        disabled ? "bg-gray-400" : "bg-blue-600"
      } ${className}`}
    >
      <AppText
        semibold
        className={`text-base ${
          disabled ? "text-gray-200" : "text-white"
        } ${textClassName}`}
        style={{ color: undefined }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
}
