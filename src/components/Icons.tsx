import type React from "react"
import { View, Image, Text } from "react-native"

const cardWidth = 58;
const cardHeight = 32;

// WiFi/Contactless Payment Icon using actual image
export const ContactlessIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <Image
    source={require("../assets/images/wifi.png")}
    style={{
      width: size,
      height: size,
      tintColor: "#a0a0a0",
    }}
    resizeMode="contain"
  />
)

// PayPal Logo using actual image
export const PayPalIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      source={require("../assets/images/paypal-logo.png")}
      style={{
        width: size * 1.8,
        height: size * 1.8,
      }}
      resizeMode="contain"
    />
  </View>
)

// DKB Icon with card-like background
export const DKBIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <View style={{ width: cardWidth, height: cardHeight, marginTop: 4, marginRight: 4 }}>
    {/* Background card */}
    <Image
      source={require("../assets/images/card-background.png")}
      style={{
        width: cardWidth,
        height: cardHeight,
        position: "absolute",
        top: 0,
        right: 10,
        borderRadius: 8,
      }}
      resizeMode="cover"
    />
    {/* Revolut Text (top-left) */}
    <Text
      style={{
        position: "absolute",
        top: 8,
        right: 50,
        color: "#fff",
        fontSize: 5,
        fontWeight: "bold",
      }}
    >
      DKB
    </Text>
    {/* Wifi icon (top-right) */}
    <Image
      source={require("../assets/images/wifi.png")}
      style={{
        position: "absolute",
        top: 9,
        right: 16,
        width: 4,
        height: 4,
      }}
      resizeMode="contain"
    />
    {/* Company Text (bottom-left) */}
    <Text
      style={{
        position: "absolute",
        bottom: 5,
        right: 40,
        color: "#fff",
        fontSize: 5,
      }}
    >
      Company
    </Text>
    {/* Mastercard logo (bottom-right) */}
    <Image
      source={require("../assets/images/mastercard-logo.png")}
      style={{
        position: "absolute",
        bottom: 3,
        right: 16,
        width: 6,
        height: 6,
      }}
      resizeMode="contain"
    />
  </View>
)
// Revolut Icon with card-like background
export const RevolutIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <View style={{ width: cardWidth, height: cardHeight, marginTop: 4, marginRight: 4 }}>
    {/* Background card */}
    <Image
      source={require("../assets/images/card-background.png")}
      style={{
        width: cardWidth,
        height: cardHeight,
        position: "absolute",
        top: 0,
        right: 10,
        borderRadius: 8,
      }}
      resizeMode="cover"
    />
    {/* Revolut Text (top-left) */}
    <Text
      style={{
        position: "absolute",
        top: 8,
        right: 43,
        color: "#fff",
        fontSize: 5,
        fontWeight: "bold",
      }}
    >
      Revolut
    </Text>
    {/* Wifi icon (top-right) */}
    <Image
      source={require("../assets/images/wifi.png")}
      style={{
        position: "absolute",
        top: 9,
        right: 16,
        width: 4,
        height: 4,
      }}
      resizeMode="contain"
    />
    {/* Company Text (bottom-left) */}
    <Text
      style={{
        position: "absolute",
        bottom: 5,
        right: 40,
        color: "#fff",
        fontSize: 5,
      }}
    >
      Company
    </Text>
    {/* Mastercard logo (bottom-right) */}
    <Image
      source={require("../assets/images/mastercard-logo.png")}
      style={{
        position: "absolute",
        bottom: 3,
        right: 16,
        width: 6,
        height: 6,
      }}
      resizeMode="contain"
    />
  </View>
)
// Depot Icon using actual bank image
export const DepotIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <View
    style={{
      width: size,
      height: size,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      source={require("../assets/images/bank-icon.png")}
      style={{
        width: size * 0.6,
        height: size * 0.6,
        tintColor: "#a0a0a0",
      }}
      resizeMode="contain"
    />
  </View>
)
// Mastercard Logo using actual image
export const MastercardLogo: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <Image
    source={require("../assets/images/mastercard-logo.png")}
    style={{
      width: size,
      height: size * 0.625,
    }}
    resizeMode="contain"
  />
)
