CREATE TABLE "welcomes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "welcomes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"bankName" varchar(255) NOT NULL,
	"currentAmount" numeric(10, 2) NOT NULL,
	"reference" varchar(255) NOT NULL,
	"usage" varchar(255) NOT NULL,
	"userId" varchar(255) NOT NULL,
	"createdAt" varchar(255) DEFAULT 'now()' NOT NULL
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
DROP TABLE "accounts" CASCADE;