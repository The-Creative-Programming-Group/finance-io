import { z } from "zod";
import type { TFunction } from "i18next";

// Base schema without translations - reusable on the backend
export const welcomeSchemaBase = z.object({
  bankName: z
    .string()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z0-9\s-]+$/),
  currentAmount: z.number().positive().min(0.01),
  reference: z.string().min(2).max(50),
  usage: z.string().min(2).max(50),
});

// Frontend schema factory with translations
export const welcomeSchema = (t: TFunction<"translation", undefined>) =>
  z.object({
    bankName: z
      .string()
      .min(1, { message: t("bankNameRequired", "Bank name is required") })
      .min(2, {
        message: t(
          "bankNameTooShort",
          "Bank name must be at least 2 characters",
        ),
      })
      .max(50, {
        message: t(
          "bankNameTooLong",
          "Bank name must be less than 50 characters",
        ),
      })
      .regex(/^[a-zA-Z0-9\s-]+$/, {
        message: t(
          "bankNameFormat",
          "Bank name can only contain letters, numbers, spaces, and hyphens",
        ),
      }),
    currentAmount: z
      .number({
        error: (issue) =>
          issue.input === undefined || issue.input === ""
            ? t("amountRequired", "Amount is required")
            : t("amountNumeric", "Amount must be numeric"),
      })
      .positive(t("amountPositive", "Amount must be positive"))
      .min(0.01, t("amountMin", "Amount must be at least 0.01")),
    reference: z
      .string()
      .min(1, { message: t("referenceRequired", "Reference is required") })
      .min(2, {
        message: t(
          "referenceTooShort",
          "Reference must be at least 2 characters",
        ),
      })
      .max(50, {
        message: t(
          "referenceTooLong",
          "Reference must be less than 50 characters",
        ),
      }),
    usage: z
      .string()
      .min(1, { message: t("usageRequired", "Usage is required") })
      .min(2, {
        message: t("usageTooShort", "Usage must be at least 2 characters"),
      })
      .max(50, {
        message: t("usageTooLong", "Usage must be less than 50 characters"),
      }),
  });

export type WelcomeFormValues = z.infer<typeof welcomeSchemaBase>;
