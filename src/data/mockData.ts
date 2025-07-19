import React from "react"
import { PayPalIcon, DKBIcon, RevolutIcon, DepotIcon } from "../components/Icons"
import type { DashboardData } from "../types"

export const mockDashboardData: DashboardData = {
  user: {
    name: "Julia's",
  },
  cards: [
    {
      id: "1",
      title: "DKB",
      cardHolder: "Julia Meyer",
      type: "debit",
      provider: "dkb",
    },
    {
      id: "2",
      title: "Revolut",
      cardHolder: "Company",
      type: "business",
      provider: "revolut",
    },
  ],
  accounts: {
    private: [
      {
        id: "1",
        name: "Pay Pal",
        amount: "53.99€",
        icon: React.createElement(PayPalIcon),
        type: "paypal",
      },
      {
        id: "2",
        name: "DKB",
        amount: "232.93€",
        icon: React.createElement(DKBIcon),
        type: "dkb",
      },
    ],
    business: [
      {
        id: "3",
        name: "Revolut",
        amount: "12.232.93€",
        icon: React.createElement(RevolutIcon),
        type: "revolut",
      },
    ],
    safe: [
      {
        id: "4",
        name: "Depot",
        amount: "43.232.93€",
        icon: React.createElement(DepotIcon),
        type: "depot",
      },
    ],
  },
}
