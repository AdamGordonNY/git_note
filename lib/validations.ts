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
  z.object({
    title: z.string().min(4).max(50),
    url: z.string().url(),
  })
);
const ExperiencesSchema = z.array(
  z.object({
    name: z.string(),
  })
);
export const CreateTagSchema = z.array(z.string().min(4).max(15));
export const CreatePostSchema = z.object({
  title: z.string().min(4).max(50),
  postType: z.string().min(4).max(50),
  description: z.string().min(10).max(200),
  content: z.string().min(10).max(1000),
  tags: CreateTagSchema.min(1).max(5),
  code: z.string().optional(),
  experiences: ExperiencesSchema.optional(),
  resourceLinks: ResourceLinkSchema.optional(),
});
