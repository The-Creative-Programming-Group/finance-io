import React from "react";
import { useTheme } from "~/contexts/ThemeContext";
import { SafeAreaView, ScrollView, StatusBar } from "react-native";
import { mockDashboardData } from "~/data/mockData";
import { SectionHeader } from "~/components/SectionHeader";
import { AccountItem } from "~/components/AccountItem";
import { useTranslation } from "react-i18next";
import { Header } from "~/components/Header"; // ✅ keep header

const Dashboard = () => {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();

  const handleAccountPress = (accountName: string, accountId: string) => {
    console.log(`Pressed ${accountName} with ID: ${accountId}`);
    // modal logic here
  };

  const handleCardPress = (cardName: string, cardId: string) => {
    console.log(`Pressed ${cardName} card with ID: ${cardId}`);
    // modal logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-dark-background">
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView
        className="flex-1 p-8"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Header title={`${mockDashboardData.user.name} - Dashboard`} />

        {/* Cards Section */}
        {/* <SectionHeader title="Cards" delay={100} />
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
          ))} */}
        <SectionHeader title={t("dashboardDailyAccounts")} delay={400} />
        <SectionHeader title={t("dashboardPrivate")} delay={500} />
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

        <SectionHeader title={t("dashboardBusiness")} delay={800} />
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

        <SectionHeader title={t("dashboardSafeAccounts")} delay={1000} />
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

        <SectionHeader title={t("sharedFunds")} delay={1200} />
        {mockDashboardData.sharedFunds && (
          <AccountItem
            key={mockDashboardData.sharedFunds.id}
            icon={mockDashboardData.sharedFunds.icon}
            name={mockDashboardData.sharedFunds.title}
            arrow={mockDashboardData.sharedFunds.arrow}
            iconWrapped
            delay={1300}
            onPress={() =>
              handleAccountPress(
                mockDashboardData.sharedFunds.title,
                mockDashboardData.sharedFunds.id,
              )
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
