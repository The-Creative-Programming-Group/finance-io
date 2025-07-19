import type React from "react"
export interface Account {
  id: string
  name: string
  amount: string
  icon: React.ReactNode
  type: "paypal" | "dkb" | "revolut" | "depot"
}

export interface Card {
  id: string
  title: string
  cardHolder: string
  type: "debit" | "business"
  provider: "dkb" | "revolut"
}

export interface DashboardData {
  user: {
    name: string
  }
  cards: Card[]
  accounts: {
    private: Account[]
    business: Account[]
    safe: Account[]
  }
}
