import { db } from "./db/index";
import { usersTable } from "./db/schema";

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
