import React from "react"
import { ScrollView, StatusBar, SafeAreaView, View, Image } from "react-native"
import { useTheme } from "~/contexts/ThemeContext"
import { Header } from "~/components/Header"
import { BottomNavigation } from "~/components/BottomNavigation"
import { Toggle } from "~/components/Toggle"
import AppText from "~/components/AppText"

interface NotificationScreenProps {
  onNavigate: (screen: string) => void
}

export const NotificationScreen: React.FC<NotificationScreenProps> = ({ onNavigate }) => {
  const { colors, isDark } = useTheme()
  const [notificationEnabled, setNotificationEnabled] = React.useState(true)

  const IconWrapper = ({
      source,
      iconW = 18,
      iconH = 18
    }: { 
      source: any
      iconW?: number
      iconH?: number
    }) => (
      <View
        className="w-10 h-10 rounded-full items-center justify-center"
        style={{ backgroundColor: colors.border }}
      >
        <Image 
          source={source}
          style={{ width: iconW, height: iconH }}
          resizeMode="contain" 
        />
      </View>
    )

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView 
        className="flex-1" 
        contentContainerClassName="px-5 pt-20 pb-36"
      >
        <Header title="Jutia's - Notification" />

        <View
          className="mx-auto mt-10 flex-row items-center rounded-xl border px-4 py-3"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            width: "100%",
          }}
        >
          <View className="mr-4 h-10 w-10 items-center justify-center">
            <IconWrapper
            source={require("~/assets/Icons/notification.png")}
            />
          </View>

          <AppText
            medium
            className="flex-1 text-sm"
            style={{ color: colors.text }}
          >
            Notification
          </AppText>

          <Toggle value={notificationEnabled} onValueChange={setNotificationEnabled} />
        </View>
      </ScrollView>

      <BottomNavigation activeTab="Settings" onTabPress={(tab) => console.log(tab)} />
    </SafeAreaView>
  )
}
