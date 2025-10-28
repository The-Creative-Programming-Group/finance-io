CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE "account_types" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL
);
--> statement-breakpoint

-- 1) Add column nullable
ALTER TABLE "accounts" ADD COLUMN "typeId" uuid;--> statement-breakpoint

-- 2) (Optional but recommended) Ensure a default account type exists for backfilling
INSERT INTO "account_types" ("name", "slug")
SELECT 'Private', 'private'
ON CONFLICT ("slug") DO NOTHING;--> statement-breakpoint

-- 3) Backfill existing rows (choose the appropriate default type)
UPDATE "accounts" a
SET "typeId" = at.id
FROM "account_types" at
WHERE a."typeID" IS NULL
  AND at."slug" = 'private';--> statement-breakpoint

-- 4) Enforce NOT NULL
ALTER TABLE "accounts" ALTER COLUMN "typeId" SET NOT NULL;--> statement-breakpoint

-- 5) Keep the unique index on account_types.slug
CREATE UNIQUE INDEX "account_types_slug_unique_idx"
    ON "account_types" USING btree ("slug");--> statement-breakpoint

-- 6) Add the foreign key constraint
ALTER TABLE "accounts"
    ADD CONSTRAINT "accounts_typeId_account_types_id_fk"
    FOREIGN KEY ("typeId")
        REFERENCES "public"."account_types"("id")
        ON DELETE RESTRICT
        ON UPDATE NO ACTION;--> statement-breakpoint

-- 7) Add an index on accounts.typeId for performance
CREATE INDEX "accounts_type_idx" ON "accounts" USING btree ("typeId");