/**
 * Container component
 *
 * A reusable UI wrapper that:
 * - Renders a leading icon within a colored circular badge
 * - Shows arbitrary children content next to the icon
 * - Displays a trailing chevron/arrow for affordance
 *
 * Styling is done via Tailwind classes interpreted by NativeWind.
 * Icon input can be either:
 * - A Lucide icon component (function, forwardRef, or memo)
 * - A static image source (ImageSourcePropType) rendered via AppImage
 */

import { ImageSourcePropType, View } from "react-native";
import { cn, isLucideIcon } from "~/utils/lib";
import { CircleArrowRight, LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import AppImage from "~/components/ui/AppImage";

/**
 * Container props
 *
 * children: React content to render next to the icon
 * className: Additional Tailwind classes to merge with the default
 * icon: Either a Lucide icon component or an image source for AppImage
 */
export const Container = ({
  children,
  className,
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  icon: LucideIcon | ImageSourcePropType;
}) => {
  // Create a NativeWind-interoperable version of the trailing arrow icon
  // so we can style it with `className`.
  const StyledCircleArrowRight = cssInterop(CircleArrowRight, {
    className: { target: "style" },
  });

  // Resolve the "icon" prop into a concrete React node:
  // - If it's a Lucide component, wrap with cssInterop for className support.
  // - Otherwise, treat it as an image source and render via AppImage.
  let IconNode: React.ReactNode;
  if (isLucideIcon(Icon)) {
    // Adapt the incoming Lucide icon component to accept `className`
    const StyledIcon = cssInterop(Icon, { className: { target: "style" } });
    IconNode = <StyledIcon className="text-text dark:text-dark-text" />;
  } else {
    // Render provided an image source with constrained size and containment
    IconNode = (
      <AppImage source={Icon} className="h-6 w-6" contentFit="contain" />
    );
  }

  return (
    <View
      // Merge default container styles with any consumer-provided classes
      className={cn(
        // Layout: horizontal row, spaced ends, vertical centering
        "w-full flex-row items-center justify-between",
        // Card-like visuals
        "rounded-xl border-2 border-stroke bg-secondary",
        // Spacing: y padding, asymmetric x padding (extra left for icon badge)
        "py-4 pl-8 pr-6",
        // Dark mode variants
        "dark:border-dark-stroke dark:bg-dark-secondary",
        className,
      )}
    >
      {/* Left side: circular icon badge + children content */}
      <View className="flex-row items-center gap-5">
        {/* Circular badge that hosts the icon node */}
        <View className="rounded-full bg-primary p-3 dark:bg-dark-primary">
          {IconNode}
        </View>

        {/* Consumer-provided content (text, actions, etc.) */}
        {children}
      </View>

      {/* Right side: affordance icon (e.g., navigation or action hint) */}
      <StyledCircleArrowRight className="text-text dark:text-dark-text" />
    </View>
  );
};
