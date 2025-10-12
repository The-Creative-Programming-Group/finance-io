import { ImageSourcePropType, View } from "react-native";
import { cn } from "~/utils/lib";
import { CircleArrowRight, LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import AppImage from "~/components/ui/AppImage";

const isLucideIcon = (val: unknown): val is LucideIcon => {
  if (!val) return false;
  if (typeof val === "function") return true;
  if (typeof val === "object") {
    const t = (val as any).$$typeof;
    // Detect React.forwardRef / React.memo component types
    return (
      t === Symbol.for("react.forward_ref") || t === Symbol.for("react.memo")
    );
  }
  return false;
};

export const Container = ({
  children,
  className,
  icon: Icon,
}: {
  children: React.ReactNode;
  className?: string;
  icon: LucideIcon | ImageSourcePropType;
}) => {
  const StyledCircleArrowRight = cssInterop(CircleArrowRight, {
    className: { target: "style" },
  });

  let IconNode: React.ReactNode;
  if (isLucideIcon(Icon)) {
    const StyledIcon = cssInterop(Icon, { className: { target: "style" } });
    IconNode = <StyledIcon className="text-text dark:text-dark-text" />;
  } else {
    IconNode = (
      <AppImage source={Icon} className="h-6 w-6" contentFit="contain" />
    );
  }

  return (
    <View
      className={cn(
        "flex-row items-center justify-between rounded-xl border-2 border-stroke bg-secondary py-4 pl-8 pr-6 dark:border-dark-stroke dark:bg-dark-secondary",
        className,
      )}
    >
      <View className="flex-row items-center gap-5">
        <View className="rounded-full bg-primary p-3 dark:bg-dark-primary">
          {IconNode}
        </View>
        {children}
      </View>
      <StyledCircleArrowRight className="text-text dark:text-dark-text" />
    </View>
  );
};
