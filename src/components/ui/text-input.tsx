/**
 * TextInput wrapper component for React Native with a labeled <AppText> header.
 * - Uses NativeWind Tailwind classes via `className`.
 * - Enforces project rule to use `AppText` instead of `Text`.
 * - Provides sensible defaults for accessibility and keyboard behavior.
 * - Accepts all React Native `TextInputProps` and a required `name` for the label.
 */

import AppText from "~/components/ui/AppText";
import React from "react";
import {
  TextInputProps,
  TextInput as RNTextInput,
  View,
  ImageSourcePropType,
} from "react-native";
import { cn, isLucideIcon } from "~/utils/lib";
import { LucideIcon } from "lucide-react-native";
import AppImage from "~/components/ui/AppImage";
import { cssInterop } from "nativewind";

/**
 * Props:
 * - `name`: Visible field label and base for accessibility labels.
 * - `required`: If true, shows an asterisk (*) in the accent colour next to the label.
 * - `icon`: Optional icon (LucideIcon or ImageSourcePropType) to display inside the input.
 * - `className`:
 * Additional Tailwind classes for the input container to merge with the default NOT applying to the input itself.
 * - `...TextInputProps`: Forwarded to RN TextInput.
 * Explicit props override defaults.
 */
export const TextInput = ({
  name,
  required,
  icon,
  className,
  ...props
}: {
  name: string;
  required?: boolean;
  icon?: LucideIcon | ImageSourcePropType;
} & TextInputProps) => {
  // Resolve the "icon" prop into a concrete React node
  let IconNode: React.ReactNode | null = null;
  if (icon) {
    if (isLucideIcon(icon)) {
      const StyledIcon = cssInterop(icon, { className: { target: "style" } });
      IconNode = (
        <StyledIcon size={20} className="text-text dark:text-dark-text" />
      );
    } else {
      IconNode = (
        <AppImage
          source={icon as ImageSourcePropType}
          className="h-5 w-5"
          contentFit="contain"
        />
      );
    }
  }

  return (
    <>
      <View className="my-[5px] ml-6 flex flex-row items-center">
        {required && <AppText className="text-base text-accent">*</AppText>}
        <AppText medium className="text-base text-text dark:text-dark-text">
          {name}
        </AppText>
      </View>

      <View
        className={cn(
          "my-[6px] h-[70px] flex-row items-center rounded-2xl border-2 border-stroke bg-secondary p-2.5 pl-5 dark:border-dark-stroke dark:bg-dark-secondary",
          className,
        )}
      >
        {IconNode && (
          <View className="mr-2.5 h-[35px] w-[35px] items-center justify-center rounded-full bg-primary dark:bg-dark-primary">
            {IconNode}
          </View>
        )}
        <RNTextInput
          {...props}
          className="flex-1 text-text placeholder:text-backgroundText dark:text-dark-text dark:placeholder:text-dark-backgroundText"
          value={props.value}
          placeholder={props.placeholder}
          secureTextEntry={props.secureTextEntry}
          onChangeText={props.onChangeText}
          accessibilityLabel={props.accessibilityLabel || `${name} input`}
          accessibilityHint={props.accessibilityHint || `Enter your ${name}`}
          autoCapitalize={props.autoCapitalize || "none"}
          keyboardType={props.keyboardType || "default"}
        />
      </View>
    </>
  );
};
