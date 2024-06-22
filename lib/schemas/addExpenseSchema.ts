import { z } from "zod";

export const addExpenseSchema = z.object({
  spendTo: z.string(),
  description: z.string().min(1, "Gider adı boş bırakılamaz."),
  category: z.string().min(1, "Kategori boş bırakılamaz."),
  amount: z
    .string()
    .min(1, "Tutar boş bırakaılamaz.")
    .regex(/^[0-9]+$/, {
      message: "Sadece rakam girilebilir.",
    }),
  date: z.coerce.date(),
  note: z.string(),
});
