import AppText from "~/components/ui/AppText";
import React from "react";
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { cn } from "~/utils/lib";
import { Href, useRouter } from "expo-router";
import * as Linking from "expo-linking";

/**
 * Button component for navigation and external linking.
 *
 * - Uses <AppText> for text rendering (project rule).
 * - Styles with TailwindCSS classes via NativeWind.
 * - Supports both internal navigation (Expo Router) and external links (Linking).
 *
 * @param href - Internal route (Href) or external URL (string).
 * @param props - TouchableOpacityProps and children.
 */
interface ButtonProps extends TouchableOpacityProps {
  /**
   * Internal route (Href) or external URL (string).
   * If string starts with "http" or "mailto", opens externally.
   * Otherwise, uses Expo Router for navigation.
   */
  href?: Href;
}

const Button: React.FC<ButtonProps> = ({ href, ...props }) => {
  const router = useRouter();

  /**
   * Handles button press:
   * - If href is external (http/mailto), opens with Linking.
   * - If href is internal (Href), navigates with router.push.
   * - Otherwise, calls provided onPress handler.
   */
  const handlePress = (event: GestureResponderEvent) => {
    if (href) {
      if (__DEV__) {
        console.log("Button pressed, href:", href);
      }
      if (
        typeof href === "string" &&
        (href.startsWith("http") || href.startsWith("mailto"))
      ) {
        if (__DEV__) {
          console.log("Opening external link:", href);
        }
        // External link: open in browser or email client
        Linking.openURL(href).catch((err) =>
          console.error("Failed to open URL:", err),
        );
      } else {
        // Internal navigation: use Expo Router
        if (__DEV__) {
          console.log("Navigating to internal route:", href);
        }
        router.push(href);
      }
    } else {
      props.onPress?.(event);
    }
  };

  return (
    <TouchableOpacity
      {...props}
      onPress={handlePress}
      className={cn(
        // TODO: Shadow (like the one we have in Figma) is somehow not working, didnt get it working, will skip this for a later PR
        "disabled:bg-gray-400 boxShadow-cyan-500/50 mt-5 self-center rounded-xl bg-accent px-8 py-2",
        props.className,
      )}
    >
      <AppText semibold className="text-lg text-primary">
        {props.children}
      </AppText>
    </TouchableOpacity>
  );
};

export default Button;
