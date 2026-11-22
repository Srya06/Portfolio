import { z } from "zod";

export const projectNeeds = [
  "ai-ml",
  "agentic-systems",
  "full-stack",
  "computer-vision",
  "recruitment",
  "internship",
  "other",
] as const;

export type ProjectNeed = (typeof projectNeeds)[number];

export const contactFormSchema = z.object({
  need: z.enum(projectNeeds, {
    errorMap: () => ({ message: "Please select an area of collaboration." }),
  }),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name cannot exceed 80 characters."),
  email: z
    .string()
    .email("Please provide a valid email address.")
    .max(120, "Email cannot exceed 120 characters."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(2000, "Message cannot exceed 2000 characters."),
  budget: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must consent to being contacted regarding this inquiry." }),
  }),
  // HONEYPOT: Must remain empty. If filled by bots, submission is rejected.
  company: z.string().max(0, "Bot submission detected.").optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
