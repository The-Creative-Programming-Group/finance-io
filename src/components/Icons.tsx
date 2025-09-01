import React from "react";
import { View } from "react-native";
import AppText from "./ui/AppText";
import AppImage from "~/components/ui/AppImage";

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
  <View className="mr-1 mt-1">
    <View className="relative h-[32px] w-[58px] rounded-md bg-dark-primary p-2">
      <AppText className="text-[6px] font-bold text-primary">DKB</AppText>
      <AppImage
        source={require("../assets/images/wifi.png")}
        className="absolute right-2 top-2"
        style={{ width: 4, height: 4 }}
        contentFit="contain"
      />
      <AppText className="absolute bottom-1 left-2 text-[5px] text-primary">
        Company
      </AppText>
      <AppImage
        source={require("../assets/images/Mastercard-logo.png")}
        className="absolute bottom-1 right-2 h-1.5 w-1.5"
        contentFit="contain"
      />
    </View>
  </View>
);

export const RevolutIcon: React.FC = () => (
  <View className="mr-1 mt-1">
    <View className="relative h-[32px] w-[58px] rounded-md bg-dark-background p-2">
      <AppText className="text-[6px] font-bold text-primary">Revolut</AppText>
      <AppImage
        source={require("../assets/images/wifi.png")}
        className="absolute right-2 top-2"
        style={{ width: 4, height: 4 }}
        contentFit="contain"
      />
      <AppText className="absolute bottom-1 left-2 text-[5px] text-primary">
        Company
      </AppText>
      <AppImage
        source={require("../assets/images/Mastercard-logo.png")}
        className="absolute bottom-1 right-2 h-1.5 w-1.5"
        contentFit="contain"
      />
    </View>
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

export const SharedFundsIcon: React.FC<{
  size?: number;
  className?: string;
}> = () => (
  <AppImage
    source={require("../assets/images/sharedfunds-icon.png")}
    className="h-[25px] w-[25px]"
    contentFit="contain"
  />
);

export const ArrowRightIcon: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24 }) => (
  <AppImage
    source={require("../assets/images/right-icon.png")}
    style={{ width: size, height: size }}
    contentFit="contain"
  />
);
