import React from "react";
import { Text, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function AppText({ children, ...rest }) {
  const [fontsLoaded] = useFonts({
    Raleway: require("../assets/fonts/Raleway-Medium.ttf"), // Adjust path and filename!
  });

  if (!fontsLoaded) {
    return null; // Or show a loading screen
  }

  return (
    <Text style={[styles.text]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Raleway",
  },
});
