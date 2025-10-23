CREATE TABLE "account_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "typeId" uuid NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "account_types_slug_unique_idx" ON "account_types" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_typeId_account_types_id_fk" FOREIGN KEY ("typeId") REFERENCES "public"."account_types"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "accounts_type_idx" ON "accounts" USING btree ("typeId");