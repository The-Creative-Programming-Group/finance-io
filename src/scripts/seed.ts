import "dotenv/config";
import { db } from "~/db";
import { categoriesTable, currenciesTable } from "~/db/schema";
import { inArray } from "drizzle-orm";

async function seedCurrencies() {
  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "ARS", name: "Argentine Peso" },
  ];

  const codes = currencies.map((c) => c.code);

  const existing = await db
    .select({ code: currenciesTable.code })
    .from(currenciesTable)
    .where(inArray(currenciesTable.code, codes));

  const existingCodes = new Set(existing.map((e) => e.code));
  const toInsert = currencies.filter((c) => !existingCodes.has(c.code));

  if (toInsert.length > 0) {
    await db.insert(currenciesTable).values(toInsert);
    console.log(
      `Inserted currencies: ${toInsert.map((c) => c.code).join(", ")}`,
    );
  } else {
    console.log("Currencies already seeded");
  }
}

async function seedCategories() {
  const categories = [
    { name: "Groceries", slug: "groceries" },
    { name: "Restaurants", slug: "restaurants" },
    { name: "Transport", slug: "transport" },
    { name: "Bills", slug: "bills" },
    { name: "Entertainment", slug: "entertainment" },
  ];

  const slugs = categories.map((c) => c.slug);
  const existing = await db
    .select({ slug: categoriesTable.slug })
    .from(categoriesTable)
    .where(inArray(categoriesTable.slug, slugs));

  const existingSlugs = new Set(existing.map((e) => e.slug));
  const toInsert = categories.filter((c) => !existingSlugs.has(c.slug));

  if (toInsert.length > 0) {
    await db.insert(categoriesTable).values(toInsert);
    console.log(
      `Inserted categories: ${toInsert.map((c) => c.slug).join(", ")}`,
    );
  } else {
    console.log("Categories already seeded");
  }
}

async function main() {
  await seedCurrencies();
  await seedCategories();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
