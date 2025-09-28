import type React from "react";
import { ScrollView, StatusBar, SafeAreaView, View } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import { Header } from "~/components/Header";
import { ProfileMenuItem } from "~/components/ProfileMenuItem";
import { BottomNavigation } from "~/components/BottomNavigation";
import AppImage from "~/components/ui/AppImage";

interface BankAccountsScreenProps {
  onNavigate: (screen: string) => void;
}

export const BankAccountsScreen: React.FC<BankAccountsScreenProps> = ({
  onNavigate,
}) => {
  const { colors, isDark } = useTheme();

  const IconWrapper = ({
    source,
    iconW = 18,
    iconH = 18,
  }: {
    source: any;
    iconW?: number;
    iconH?: number;
  }) => (
    <View
      className="h-10 w-10 items-center justify-center rounded-full"
      style={{ backgroundColor: colors.border }}
    >
      <AppImage
        source={source}
        style={{ width: iconW, height: iconH }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: colors.background }}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pt-28 pb-28"
      >
        <Header title="Julia's - Bank Accounts" />

        <ProfileMenuItem
          icon={
            <IconWrapper
              iconH={35}
              iconW={35}
              source={require("~/assets/images/paypal-logo.png")}
            />
          }
          title="PayPal"
          onPress={() => console.log("PayPal")}
          delay={100}
        />

        <ProfileMenuItem
          icon={<IconWrapper source={require("~/assets/Icons/banking.png")} />}
          title="DebitCard"
          onPress={() => console.log("DebitCard")}
          delay={200}
        />

        <ProfileMenuItem
          icon={
            <IconWrapper source={require("~/assets/Icons/bank_account.png")} />
          }
          title="Safe Account"
          onPress={() => console.log("Safe Account")}
          delay={300}
        />
      </ScrollView>

      <BottomNavigation
        activeTab="Settings"
        onTabPress={(tab) => console.log(tab)}
      />
    </SafeAreaView>
  );
};
