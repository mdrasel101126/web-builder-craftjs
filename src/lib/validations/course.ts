import * as z from "zod";

export const chapterSchema = z.object({
  title: z
    .string()
    .min(1, "Chapter title is required")
    .min(3, "Chapter title must be at least 3 characters")
    .max(100, "Chapter title must be less than 100 characters"),
});

export type ChapterFormData = z.infer<typeof chapterSchema>;

// lesson content schema
export const lessonSchema = z.object({
  name: z.string().min(3, "Lesson name must be at least 3 characters"),
  type: z.enum([
    "VIDEO",
    "TEXT",
    "PPT",
    "PDF",
    "AUDIO",
    "QUIZ",
    "SURVEY",
    "ASSIGN",
    "DOWNLOAD",
    "LIVE",
    "EMBEDDED",
    "SCOR",
  ]),
  content: z.union([
    z.object({
      type: z.literal("VIDEO"),
      url: z.string().url("Please enter a valid URL").optional(),
      file: z.any().optional(), // In a real app, you'd want to validate this is a File object
    }),
    z.object({
      type: z.literal("TEXT"),
      text: z.string().min(1, "Content is required"),
    }),
    // Add other content type validations here
  ]),
  description: z.string().optional(),
  settings: z.object({
    isDraft: z.boolean(),
    isFreePreview: z.boolean(),
    hasPrerequisite: z.boolean(),
    isDownloadableWeb: z.boolean(),
    isDownloadableApp: z.boolean(),
    enableDiscussions: z.boolean(),
    requireVideoCompletion: z.boolean(),
  }),
});

export type LessonFormData = z.infer<typeof lessonSchema>;

//course princing plan schema
export const basePriceSchema = z.object({
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  strikeThroughPrice: z.number().min(0).optional(),
});

export const oneTimePlanSchema = basePriceSchema.extend({
  type: z.literal("ONE_TIME_STANDARD"),
  expiry: z.enum(["LIFETIME", "LIMITED"]),
  expiryDays: z.number().min(1).optional(),
});

export const oneTimeTieredPlanSchema = basePriceSchema.extend({
  type: z.literal("ONE_TIME_TIERED"),
  tiers: z.array(
    z.object({
      name: z.string().min(1),
      price: z.number().min(0),
      features: z.array(z.string()),
    }),
  ),
});

export const splitPaymentPlanSchema = basePriceSchema.extend({
  type: z.literal("SPLIT_PAYMENT"),
  installments: z.number().min(2),
  intervalDays: z.number().min(1),
});

export const subscriptionPlanSchema = basePriceSchema.extend({
  type: z.literal("SUBSCRIPTION_STANDARD"),
  interval: z.enum(["MONTHLY", "YEARLY"]),
  trialDays: z.number().min(0).optional(),
});

export const subscriptionTieredPlanSchema = basePriceSchema.extend({
  type: z.literal("SUBSCRIPTION_TIERED"),
  interval: z.enum(["MONTHLY", "YEARLY"]),
  tiers: z.array(
    z.object({
      name: z.string().min(1),
      price: z.number().min(0),
      features: z.array(z.string()),
    }),
  ),
});

export const donationPlanSchema = z.object({
  type: z.literal("DONATION"),
  suggestedAmounts: z.array(z.number().min(0)),
  minimumAmount: z.number().min(0),
});

export const pricingPlanSchema = z.discriminatedUnion("type", [
  oneTimePlanSchema,
  oneTimeTieredPlanSchema,
  splitPaymentPlanSchema,
  subscriptionPlanSchema,
  subscriptionTieredPlanSchema,
  donationPlanSchema,
]);

export type PricingPlan = z.infer<typeof pricingPlanSchema>;

// course quiz schema

export const questionSchema = z.object({
  id: z.string(),
  type: z.enum([
    "MULTIPLE_CHOICE",
    "SINGLE_CHOICE",
    "TRUE_FALSE",
    "TEXT",
    "MATCHING",
  ]),
  question: z.string().min(1, "Question is required"),
  points: z.number().min(0, "Points must be non-negative"),
  options: z
    .array(
      z.object({
        id: z.string(),
        text: z.string().min(1, "Option text is required"),
        isCorrect: z.boolean().optional(),
      }),
    )
    .optional(),
  correctAnswer: z.string().optional(),
  explanation: z.string().optional(),
  timeLimit: z.number().min(0).optional(), // in seconds
});

export const quizSchema = z.object({
  title: z.string().min(1, "Quiz title is required"),
  description: z.string().optional(),
  passingScore: z.number().min(0, "Passing score must be non-negative"),
  shuffleQuestions: z.boolean().default(false),
  showResults: z.boolean().default(true),
  timeLimit: z.number().min(0).optional(), // in minutes
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export type Question = z.infer<typeof questionSchema>;
export type Quiz = z.infer<typeof quizSchema>;

// course schedule schema

export const moduleSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required"),
  module: z.string().min(1, "Module name is required"),
  description: z.string().min(1, "Description is required"),
  icon: z.string(),
  timeframe: z.string().min(1, "Timeframe is required"),
});

export const moduleFormSchema = moduleSchema.omit({ id: true });

export type ModuleFormData = z.infer<typeof moduleFormSchema>;
export type ModuleData = z.infer<typeof moduleSchema>;
