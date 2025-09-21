import React from "react"
import { ThemeProvider } from "~/contexts/ThemeContext"
import { ProfileScreen } from "~/components/profile/ProfileScreen"
import { LimitsScreen } from "~/components/profile/Limits"
import { IncomeScreen } from "~/components/profile/Income"
import { NotificationScreen } from "~/components/profile/Notification"
import { UserProfileScreen } from "~/components/profile/UserProfile"
import { BankAccountsScreen } from "~/components/profile/BankAccounts"

const ProfileAppContent: React.FC = () => {
  const [currentScreen, setCurrentScreen] = React.useState("Profile")

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen)
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "Profile":
        return <ProfileScreen onNavigate={handleNavigate} />
      case "Limits":
        return <LimitsScreen onNavigate={handleNavigate} />
      case "Income":
        return <IncomeScreen onNavigate={handleNavigate} />
      case "Notification":
        return <NotificationScreen onNavigate={handleNavigate} />
      case "UserProfile":
        return <UserProfileScreen onNavigate={handleNavigate} />
      case "BankAccounts":
        return <BankAccountsScreen onNavigate={handleNavigate} />
      default:
        return <ProfileScreen onNavigate={handleNavigate} />
    }
  }

  return renderScreen()
}

const ProfileApp: React.FC = () => {
  return (
    <ThemeProvider>
      <ProfileAppContent />
    </ThemeProvider>
  )
}

export default ProfileApp
