import { Stack } from "expo-router";
import "~/global.css";
import { TRPCReactProvider } from "~/trpc/react";

export default function RootLayout() {
  return (
    <TRPCReactProvider>
      <Stack />
    </TRPCReactProvider>
  );
}
