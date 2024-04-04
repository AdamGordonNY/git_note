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
export const ResourceLinkSchema = z.object({
  title: z.string().min(4).max(50),
  url: z.string().url(),
});
const PostTypeSchema = z.enum(["knowledge", "component", "workflow"]);
export const CreatePostSchema = z.object({
  title: z.string().min(4).max(50),
  postType: PostTypeSchema.default("knowledge"),
  description: z.string().min(4).max(50),
  content: z.string().min(4).max(50),
  tags: z.array(z.string()).optional(),
  code: z.string().optional(),
  experiences: z.array(z.object({ name: z.string() })).optional(),
  resourceLinks: z.array(ResourceLinkSchema.optional()).optional(),
});

export const CreateTagSchema = z.object({
  name: z.string().min(4).max(50),
  postId: z.string(),
});
