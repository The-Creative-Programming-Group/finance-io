import "~/global.css";
import { View } from "react-native";
import Index from "~/app/index";
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
