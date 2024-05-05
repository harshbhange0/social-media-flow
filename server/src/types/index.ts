import { z } from "zod";
const UserZodSchema = z.object({
  email: z.string(),
  photoUrl: z.string().optional(),
  bio: z.string().optional(),
  about: z.string().optional(),
});

export default UserZodSchema;

export type userTypes = z.infer<typeof UserZodSchema>;
