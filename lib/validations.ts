import * as z from "zod";

export const signInSchema = z.object({
  username: z.string().email(),
  password: z.string().min(8).max(16),
});

export const signUpSchema = z.object({
  username: z.string().email(),
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
  knowledgeLevel: z.array(z.string().min(5).max(80)),
});
export const onboardingSchemaFour = z.object({
  schedule: z.array(z.date()),
});
export const onboardingSchema = z.object({
  onboardingSchemaOne,
  onboardingSchemaTwo,
  onboardingSchemaThree,
  onboardingSchemaFour,
});

const SocialsZodSchema = z.object({
  twitter: z.string().optional(),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  instagram: z.string().optional(),
  dribbble: z.string().optional(),
});

const TechnologyStackZodSchema = z.object({
  name: z.string(),
});

const UserEditZodSchema = z.object({
  fullname: z.string().optional(),
  email: z.string().optional().readonly(), // Note: Changing usernames might require additional checks for uniqueness.
  location: z.string().optional(),
  image: z.string().optional(),
  portfolio: z.string().optional(),
  learningGoals: z.array(z.string()).optional(),
  technologyStack: TechnologyStackZodSchema.array().optional(),
  experienceLevel: z.array(z.string()).optional(),
  availability: z.array(z.date()).optional(),
  socials: SocialsZodSchema.optional(),
});

export default UserEditZodSchema;
