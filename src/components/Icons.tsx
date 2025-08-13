import React from "react"
import { View } from "react-native"
import { Image } from "expo-image"
import AppText from "./AppText"

const cardWidth = 58
const cardHeight = 32

export const ContactlessIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <Image
    source={require("../assets/images/wifi.png")}
    className="text-gray-400"
    style={{ width: size, height: size }}
    contentFit="contain"
  />
)

export const PayPalIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <View className="justify-center items-center" style={{ width: size, height: size }}>
    <Image
      source={require("../assets/images/paypal-logo.png")}
      style={{ width: size * 1.8, height: size * 1.8 }}
      contentFit="contain"
    />
  </View>
)

export const DKBIcon: React.FC = () => (
  <View className="mt-1 mr-1" style={{ width: cardWidth, height: cardHeight }}>
    <Image
      source={require("../assets/images/card-background.png")}
      className="absolute top-0 right-[10px] rounded-lg"
      style={{ width: cardWidth, height: cardHeight }}
      contentFit="contain"
    />
    <AppText className="absolute top-[8px] right-[50px] text-white text-[5px] font-bold">
      DKB
    </AppText>
    <Image
      source={require("../assets/images/wifi.png")}
      className="absolute top-[9px] right-[16px]"
      style={{ width: 4, height: 4 }}
      contentFit="contain"
    />
    <AppText className="absolute bottom-[5px] right-[40px] text-white text-[5px]">
      Company
    </AppText>
    <Image
      source={require("../assets/images/Mastercard-logo.png")}
      className="absolute bottom-[3px] right-[16px]"
      style={{ width: 6, height: 6 }}
      contentFit="contain"
    />
  </View>
)

export const RevolutIcon: React.FC = () => (
  <View className="mt-1 mr-1" style={{ width: cardWidth, height: cardHeight }}>
    <Image
      source={require("../assets/images/card-background.png")}
      className="absolute top-0 right-[10px] rounded-lg"
      style={{ width: cardWidth, height: cardHeight }}
      contentFit="cover"
    />
    <AppText className="absolute top-[8px] right-[43px] text-white text-[5px] font-bold">
      Revolut
    </AppText>
    <Image
      source={require("../assets/images/wifi.png")}
      className="absolute top-[9px] right-[16px]"
      style={{ width: 4, height: 4 }}
      contentFit="contain"
    />
    <AppText className="absolute bottom-[5px] right-[40px] text-white text-[5px]">
      Company
    </AppText>
    <Image
      source={require("../assets/images/Mastercard-logo.png")}
      className="absolute bottom-[3px] right-[16px]"
      style={{ width: 6, height: 6 }}
      contentFit="contain"
    />
  </View>
)

export const DepotIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <View className="justify-center items-center" style={{ width: size, height: size }}>
    <Image
      source={require("../assets/images/bank-icon.png")}
      className="text-gray-400"
      style={{ width: size * 0.6, height: size * 0.6 }}
      contentFit="contain"
    />
  </View>
)

export const MastercardLogo: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <Image
    source={require("../assets/images/Mastercard-logo.png")}
    style={{ width: size, height: size * 0.625 }}
    contentFit="contain"
  />
)
