import { z } from "zod";

export const memberProfileSchema = z.object({
  name: z.string(),
  designation: z.string().optional(), // for Team Member
  alt: z.string().optional(), // for Influencer
  photourl: z.string().url(),
});
