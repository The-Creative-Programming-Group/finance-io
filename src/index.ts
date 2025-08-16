import { db } from "./db/index";
import { welcomeTable } from "./db/schema";

async function main() {
  const welcome: typeof welcomeTable.$inferInsert = {
    bankName: "Sample Bank",
    currentAmount: 1000.0,
    reference: "INIT-REF",
    usage: "Initial setup",
    userId: "sample-user-id",
    createdAt: new Date(),
  };

  await db.insert(welcomeTable).values(welcome);
  console.log("New welcome row created!");
}

main();
