export const error_messages = {
  // Generic
  forbidden: "forbidden",
  notFound: "notFound",
  badRequest: "badRequest",

  // Accounts
  currencyNotFound: "currencyNotFound",
  accountTypeNotFound: "accountTypeNotFound",
  accountNotOwned: "accountNotOwned",

  // Transactions
  transactionNotFound: "transactionNotFound",
} as const;

export type ErrorMessageKey = keyof typeof error_messages;


