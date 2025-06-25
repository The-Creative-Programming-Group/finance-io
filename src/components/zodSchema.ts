import { z } from "zod";

export const welcomeSchema = z.object({
    bankName: z.string()
        .min(1, { message: "Bank name is required" })
        .min(2, { message: "Bank name must be at least 2 characters" })
        .max(50, { message: "Bank name must be less than 50 characters" })
        .regex(/^[a-zA-Z0-9\s-]+$/, { message: "Bank name can only contain letters, numbers, spaces, and hyphens" }),
    currentAmount: z.string()
        .min(1, { message: "CurrentAmount is required" })
        .min(1, { message: "Current amount is required" })
        .regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid amount (e.g., 1000.50)" }),
    reference: z.string()
        .min(1, { message: "Reference is required" })
        .min(2, { message: "Reference must be at least 2 characters" })
        .max(50, { message: "Reference must be less than 50 characters" }),
    usage: z.string()
        .min(1, { message: "Usage is required" })
        .min(2, { message: "Usage must be at least 2 characters" })
        .max(50, { message: "Usage must be less than 50 characters" }),
});

export type WelcomeSchema = z.infer<typeof welcomeSchema>;