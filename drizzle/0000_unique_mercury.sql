CREATE TABLE "accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" varchar(255) NOT NULL,
	"bankName" varchar(255) NOT NULL,
	"currentBalance" numeric(18, 2) NOT NULL,
	"reference" varchar(255) NOT NULL,
	"usage" varchar(255) NOT NULL,
	"currencyId" uuid NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "currencies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(10) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "transactions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"accountId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	"company" varchar(255) NOT NULL,
	"amount" numeric(18, 2) NOT NULL,
	"datetime" timestamp with time zone NOT NULL,
	"description" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_currencyId_currencies_id_fk" FOREIGN KEY ("currencyId") REFERENCES "public"."currencies"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_accountId_accounts_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."accounts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accounts_user_idx" ON "accounts" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "accounts_currency_idx" ON "accounts" USING btree ("currencyId");--> statement-breakpoint
CREATE UNIQUE INDEX "categories_slug_unique_idx" ON "categories" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "currencies_code_unique_idx" ON "currencies" USING btree ("code");--> statement-breakpoint
CREATE INDEX "transactions_account_idx" ON "transactions" USING btree ("accountId");--> statement-breakpoint
CREATE INDEX "transactions_category_idx" ON "transactions" USING btree ("categoryId");--> statement-breakpoint
CREATE INDEX "transactions_datetime_idx" ON "transactions" USING btree ("datetime");