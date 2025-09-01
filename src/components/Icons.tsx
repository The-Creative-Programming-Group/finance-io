import React from "react";
import { View } from "react-native";
import AppText from "./ui/AppText";
import AppImage from "~/components/ui/AppImage";

const cardWidth = 58;
const cardHeight = 32;

export const ContactlessIcon: React.FC<{ size?: number }> = ({ size = 24 }) => (
  <AppImage
    source={require("../assets/images/wifi.png")}
    className="text-gray-400"
    style={{ width: size, height: size }}
    contentFit="contain"
  />
);

export const PayPalIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <View
    className="items-center justify-center"
    style={{ width: size, height: size }}
  >
    <AppImage
      source={require("../assets/images/paypal-logo.png")}
      style={{ width: size * 1.8, height: size * 1.8 }}
      contentFit="contain"
    />
  </View>
);

export const DKBIcon: React.FC = () => (
  <View className="mr-1 mt-1" style={{ width: cardWidth, height: cardHeight }}>
    <AppImage
      source={require("../assets/images/card-background.png")}
      className="absolute right-[10px] top-0 rounded-lg"
      style={{ width: cardWidth, height: cardHeight }}
      contentFit="contain"
    />
    <AppText
      style={{ color: "white" }}
      className="absolute right-[50px] top-[8px] text-[5px] font-bold"
    >
      DKB
    </AppText>
    <AppImage
      source={require("../assets/images/wifi.png")}
      className="absolute right-[16px] top-[9px]"
      style={{ width: 4, height: 4 }}
      contentFit="contain"
    />
    <AppText
      style={{ color: "white" }}
      className="absolute bottom-[5px] right-[37px] text-[5px]"
    >
      Company
    </AppText>
    <AppImage
      source={require("../assets/images/Mastercard-logo.png")}
      className="absolute bottom-[3px] right-[16px] h-1.5 w-1.5"
      contentFit="contain"
    />
  </View>
);

export const RevolutIcon: React.FC = () => (
  <View className="mr-1 mt-1" style={{ width: cardWidth, height: cardHeight }}>
    <AppImage
      source={require("../assets/images/card-background.png")}
      className="absolute right-[10px] top-0 rounded-lg"
      style={{ width: cardWidth, height: cardHeight }}
      contentFit="cover"
    />
    <AppText
      style={{ color: "white" }}
      className="absolute right-[43px] top-[8px] text-[5px] font-bold"
    >
      Revolut
    </AppText>
    <AppImage
      source={require("../assets/images/wifi.png")}
      className="absolute right-[16px] top-[9px] h-1 w-1"
      contentFit="contain"
    />
    <AppText
      style={{ color: "white" }}
      className="absolute bottom-[5px] right-[40px] text-[5px]"
    >
      Company
    </AppText>
    <AppImage
      source={require("../assets/images/Mastercard-logo.png")}
      className="absolute bottom-[3px] right-[16px] h-1.5 w-1.5"
      contentFit="contain"
    />
  </View>
);

export const DepotIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <View
    className="items-center justify-center"
    style={{ width: size, height: size }}
  >
    <AppImage
      source={require("../assets/images/bank-icon.png")}
      style={{ width: size * 0.8, height: size * 0.8 }}
      contentFit="contain"
    />
  </View>
);

export const MastercardLogo: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <AppImage
    source={require("../assets/images/Mastercard-logo.png")}
    style={{ width: size, height: size * 0.625 }}
    contentFit="contain"
  />
);
