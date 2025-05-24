import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { usersTable } from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: "test@gmail.comm",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");
}

main();
