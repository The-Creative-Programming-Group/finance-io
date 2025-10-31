CREATE TYPE "public"."references" AS ENUM('private', 'business', 'savings', 'shared');--> statement-breakpoint
ALTER TABLE "account_types" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "account_types" CASCADE;--> statement-breakpoint
--> statement-breakpoint
DROP INDEX "accounts_type_idx";--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "reference" SET DATA TYPE "public"."references" USING "reference"::"public"."references";--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN "typeId";