ALTER TABLE "welcomes" ALTER COLUMN "createdAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "welcomes" ALTER COLUMN "createdAt" DROP DEFAULT;