import { z } from "zod";

// Basic Info Form Schema
const BasicInfoSchema = z.object({
  fullname: z.string().optional(),
  email: z.string().email(),
  location: z.string().optional(),
  portfolio: z.string().url().optional(),
});

// Security Form Schema
const SecuritySchema = z.object({
  password: z.string().min(8), // Assuming you want to include password updates in a separate form
});

// Learning Goals Form Schema
const GoalSchema = z.object({
  name: z.string(),
  completed: z.boolean(),
});
const LearningGoalsSchema = z.array(GoalSchema);

// Technologies Form Schema
const TechnologiesSchema = z.array(z.string()); // Assuming technologies are strings

// Experiences Form Schema
const ExperiencesSchema = z.array(
  z.object({
    name: z.string(),
  })
);

// Availability Form Schema
const AvailabilitySchema = z.object({
  startTime: z.date(),
  endTime: z.date(),
});

const NetworkSchema = z.object({
  username: z.string().optional(),
  url: z.string().optional(),
});
const SocialsSchema = z.object({
  twitter: NetworkSchema.optional(),
  facebook: NetworkSchema.optional(),
  linkedin: NetworkSchema.optional(),
  github: NetworkSchema.optional(),
  instagram: NetworkSchema.optional(),
  dribbble: NetworkSchema.optional(),
});
// Combining all schemas for a complete Profile Edit Schema (if needed as one)
const CompleteProfileEditSchema = z.object({
  fullname: z.string().optional(),
  email: z.string().email(),
  location: z.string().optional(),
  portfolio: z.string().url().optional(),
  learningGoals: LearningGoalsSchema.optional(),
  technologies: TechnologiesSchema.optional(),
  experiences: ExperiencesSchema.optional(),
  availability: AvailabilitySchema.optional(),
  newProjects: z.boolean().default(false).optional(),
  socials: SocialsSchema.optional(),
});

export {
  BasicInfoSchema,
  SecuritySchema,
  LearningGoalsSchema,
  TechnologiesSchema,
  ExperiencesSchema,
  AvailabilitySchema,
  SocialsSchema,
  CompleteProfileEditSchema,
};
