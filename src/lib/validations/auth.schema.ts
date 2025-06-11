import { validationMessages } from "@/lib/messages/validationMessages";
import z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: validationMessages.email.required })
    .email({ message: validationMessages.email.invalid }),
  password: z
    .string()
    .nonempty({ message: validationMessages.password.required })
    .min(6, validationMessages.password.min_length)
    .max(50, validationMessages.password.max_length),
});

export type LoginSchemaFormData = z.infer<typeof loginSchema>;