import { createTRPCRouter, protectedProcedure } from "../api/trpc";
import { db } from "~/db";
import { categoriesTable } from "~/db/schema";
import { Category } from "~/types";

export const categoriesRouter = createTRPCRouter({
  getCategories: protectedProcedure.query(async (): Promise<Category[]> => {
    const categories = await db.select().from(categoriesTable);
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
    }));
  }),
});
