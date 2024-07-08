import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
  fullname: z.string().min(4).max(50),
});
export const onboardingSchemaOne = z.object({
  fullname: z.string().min(4).max(50),
  portfolio: z.string().min(4).max(50),
  profilePicture: z.string().url(),
});
export const onboardingSchemaTwo = z.object({
  learningGoals: z.array(z.string().min(5).max(80)),
});
export const onboardingSchemaThree = z.object({
  experiences: z.array(z.string().min(5).max(80)),
});
export const onboardingSchemaFour = z.object({
  availability: z.array(z.date()),
});
export const onboardingSchema = z.object({
  onboardingSchemaOne,
  onboardingSchemaTwo,
  onboardingSchemaThree,
  onboardingSchemaFour,
});
export const ResourceLinkSchema = z.array(
  z
    .object({
      title: z.string().min(4).max(50),
      url: z.string().url(),
    })
    .optional()
);
const ExperiencesSchema = z.array(
  z.object({
    name: z.string().max(300),
  })
);
export const CreateTagSchema = z.array(
  z
    .string()
    .min(3, { message: "Tag must be minimum 3 characters" })
    .max(15, { message: "Tag must be maximum 15 characters" })
);
export const CreatePostSchema = z.object({
  title: z
    .string()
    .min(4, { message: "Input must be minimum 4 characters" })
    .max(50, { message: "Input must be maximum 50 characters" }),
  postType: z.string(),
  description: z
    .string()
    .min(25, { message: "Input must be at least 25 characters" })
    .max(500, { message: "Input must be at most 500 characters" }),
  content: z
    .string()
    .min(10, { message: "Input must be at least 10 characters" }),
  tags: CreateTagSchema.min(1, { message: "One tag is required" }).max(5, {
    message: "Maximum of 5 tags allowed",
  }),
  code: z.string().optional(),
  experiences: ExperiencesSchema.optional(),
  resourceLinks: ResourceLinkSchema.optional(),
  image: z.string().optional(),
});
