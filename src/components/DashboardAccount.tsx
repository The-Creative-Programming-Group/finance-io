import type React from "react"
import { ScrollView, StatusBar, SafeAreaView } from "react-native"
import { useTheme } from "../contexts/ThemeContext"
import { AccountItem } from "./AccountItem"
import { CardComponent } from "./CardComponent"
import { SectionHeader } from "./SectionHeader"
import { Header } from "./Header"
import { mockDashboardData } from "../data/mockData"

const DashboardContent: React.FC = () => {
  const { colors, isDark } = useTheme()

  const handleAccountPress = (accountName: string, accountId: string) => {
    console.log(`Pressed ${accountName} with ID: ${accountId}`)
    // modal logic here
  }

  const handleCardPress = (cardName: string, cardId: string) => {
    console.log(`Pressed ${cardName} card with ID: ${cardId}`)
    // modal logic here
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={colors.background} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pt-28 pb-28"
      >
        {/* Header */}
        <Header title={`${mockDashboardData.user.name} - Dashboard`} />

        {/* Cards Section */}
        <SectionHeader title="Cards" delay={100} />

        <SectionHeader title="Debitcard" size="medium" delay={150} />
        {mockDashboardData.cards
          .filter((card) => card.type === "debit")
          .map((card, index) => (
            <CardComponent
              key={card.id}
              title={card.title}
              cardHolder={card.cardHolder}
              delay={200 + index * 50}
              onPress={() => handleCardPress(card.title, card.id)}
            />
          ))}

        <SectionHeader title="Business Card" size="medium" delay={250} />
        {mockDashboardData.cards
          .filter((card) => card.type === "business")
          .map((card, index) => (
            <CardComponent
              key={card.id}
              title={card.title}
              cardHolder={card.cardHolder}
              delay={300 + index * 50}
              onPress={() => handleCardPress(card.title, card.id)}
            />
          ))}

        {/* Daily Accounts Section */}
        <SectionHeader title="Daily Accounts" delay={400} />

        <SectionHeader title="Private" size="medium" delay={500} />
        {mockDashboardData.accounts.private.map((account, index) => (
          <AccountItem
            key={account.id}
            icon={account.icon}
            name={account.name}
            amount={account.amount}
            delay={600 + index * 100}
            onPress={() => handleAccountPress(account.name, account.id)}
          />
        ))}

        <SectionHeader title="Business" size="medium" delay={800} />
        {mockDashboardData.accounts.business.map((account, index) => (
          <AccountItem
            key={account.id}
            icon={account.icon}
            name={account.name}
            amount={account.amount}
            delay={900 + index * 100}
            onPress={() => handleAccountPress(account.name, account.id)}
          />
        ))}

        {/* Safe Accounts Section */}
        <SectionHeader title="Safe Accounts" delay={1000} />
        {mockDashboardData.accounts.safe.map((account, index) => (
          <AccountItem
            key={account.id}
            icon={account.icon}
            name={account.name}
            amount={account.amount}
            delay={1100 + index * 100}
            onPress={() => handleAccountPress(account.name, account.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const Dashboard: React.FC = () => {
  return (
      <DashboardContent />
  )
}

export default Dashboard
