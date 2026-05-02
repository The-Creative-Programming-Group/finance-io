import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { LucideIcon } from "lucide-react-native";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type guard to determine whether a value is a Lucide icon component.
 *
 * Accepts:
 * - Function components (common case for Lucide icons)
 * - React.forwardRef(...) wrapped components
 * - React.memo(...) wrapped components
 *
 * Notes:
 * - We peek at the internal React $$$typeof symbol to differentiate memo/forwardRef.
 * - This avoids false positives when an image source (object) is provided instead.
 */
export const isLucideIcon = (val: unknown): val is LucideIcon => {
  // Fast-fail nullish values
  if (!val) return false;

  // Plain function component (most Lucide exports)
  if (typeof val === "function") return true;

  // Object-wrapped components (forwardRef or memo)
  if (typeof val === "object") {
    const t = (val as any).$$typeof;
    // Detect React.forwardRef / React.memo component types
    return (
      t === Symbol.for("react.forward_ref") || t === Symbol.for("react.memo")
    );
  }

  // Anything else (e.g., numbers, strings) is not a component
  return false;
};
