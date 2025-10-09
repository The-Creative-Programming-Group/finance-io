import { db } from "./db/index";
import { accountsTable, currenciesTable } from "./db/schema";
import { eq } from "drizzle-orm";

async function main() {
  const [usd] = await db
    .select()
    .from(currenciesTable)
    .where(eq(currenciesTable.code, "USD"))
    .limit(1);

  if (!usd) {
    console.log("Please seed currencies (expecting USD)");
    return;
  }

  const account: typeof accountsTable.$inferInsert = {
    bankName: "Sample Bank",
    currentBalance: "1000.00",
    reference: "INIT-REF",
    usage: "Initial setup",
    userId: "sample-user-id",
    currencyId: usd.id,
  };

  await db.insert(accountsTable).values(account);
  console.log("New account row created!");
}

main();
