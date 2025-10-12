/**
 * TextInput wrapper component for React Native with a labeled <AppText> header.
 * - Uses NativeWind Tailwind classes via `className`.
 * - Enforces project rule to use `AppText` instead of `Text`.
 * - Provides sensible defaults for accessibility and keyboard behavior.
 * - Accepts all React Native `TextInputProps` and a required `name` for the label.
 */

import AppText from "~/components/ui/AppText"; // Project typography component; use instead of RN <Text>
import React from "react";
import { TextInputProps, TextInput as RNTextInput } from "react-native"; // Alias to avoid name collision
import { cn } from "~/utils/lib"; // Utility to merge/compose class names conditionally

/**
 * Props:
 * - `name`: Visible field label and base for accessibility labels.
 * - `...TextInputProps`: Forwarded to RN TextInput. Explicit props override defaults.
 */
export const TextInput = ({
  name,
  ...props
}: { name: string } & TextInputProps) => {
  return (
    <>
      {/* Field label — use AppText per project lint rule */}
      <AppText className="my-[5px] ml-6 text-base text-text dark:text-dark-text">
        {name}
      </AppText>

      {/* Underlying input. Note: `className` is supported via NativeWind. */}
      <RNTextInput
        {...props}
        // Merge base styles with any caller-provided classes
        className={cn(
          "my-[6px] h-[70px] rounded-[15px] bg-secondary p-2.5 pl-5 text-text dark:bg-dark-secondary dark:text-dark-text",
          props.className,
        )}
        // Value is fully controlled by the parent when provided
        value={props.value}
        // Placeholder text shown when `value` is empty
        placeholder={props.placeholder}
        // Neutral placeholder color; override by passing `placeholderTextColor`
        placeholderTextColor="gray"
        // Mask input for secrets like passwords/PINs
        secureTextEntry={props.secureTextEntry}
        // Controlled change handler; prefer stable callbacks from parent components
        onChangeText={props.onChangeText}
        // Accessibility: default to a descriptive label if not provided
        accessibilityLabel={props.accessibilityLabel || `${name} input`}
        // Accessibility hint to guide users on expected input
        accessibilityHint={props.accessibilityHint || `Enter your ${name}`}
        // Default: avoid auto-cap for credentials/usernames. Pass explicitly to change.
        autoCapitalize={props.autoCapitalize || "none"}
        // Default: use OS default keyboard unless a specific type is requested
        keyboardType={props.keyboardType || "default"}
      />
    </>
  );
};
