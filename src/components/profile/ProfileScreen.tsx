import type React from "react";
import { ScrollView, StatusBar, SafeAreaView, Image, View } from "react-native";
import { useTheme } from "~/contexts/ThemeContext";
import { Header } from "~/components/Header";
import { SectionHeader } from "~/components/SectionHeader";
import { ProfileMenuItem } from "~/components/ProfileMenuItem";
import { BottomNavigation } from "~/components/BottomNavigation";

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ onNavigate }) => {
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
      <Image
        source={source}
        style={{ width: iconW, height: iconH }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pt-20 pb-36"
      >
        <Header title="Julia's - Profile" />

        <SectionHeader title="User" delay={100} />
        <ProfileMenuItem
          icon={<IconWrapper source={require("~/assets/Icons/profile.png")} />}
          title="Profile"
          onPress={() => onNavigate("UserProfile")}
          delay={200}
        />
        <ProfileMenuItem
          icon={
            <IconWrapper source={require("~/assets/Icons/notification.png")} />
          }
          title="Notification"
          onPress={() => onNavigate("Notification")}
          delay={300}
        />

        <SectionHeader title="Finance" delay={400} />
        <ProfileMenuItem
          icon={<IconWrapper source={require("~/assets/Icons/limits.png")} />}
          title="Limits"
          onPress={() => onNavigate("Limits")}
          delay={500}
        />
        <ProfileMenuItem
          icon={<IconWrapper source={require("~/assets/Icons/income.png")} />}
          title="Income"
          onPress={() => onNavigate("Income")}
          delay={600}
        />
        <ProfileMenuItem
          icon={
            <IconWrapper source={require("~/assets/Icons/bank_account.png")} />
          }
          title="Bank Accounts"
          onPress={() => onNavigate("BankAccounts")}
          delay={700}
        />
      </ScrollView>

      <BottomNavigation
        activeTab="Settings"
        onTabPress={(tab) => console.log(tab)}
      />
    </SafeAreaView>
  );
};
