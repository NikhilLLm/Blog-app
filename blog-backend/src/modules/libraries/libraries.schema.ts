import { z } from "zod";

export const createLibraryBodySchema = z.object({
  name: z.string().trim().min(1, "Library name is required").max(80),
});

export const addLibParamsSchema = z.object({
  libraryId: z.string().min(1, "Library ID is required"),
  postId: z.string().min(1, "Post ID is required"),
});

export const addLibBodySchema = z.object({
  note: z.string().trim().max(500).optional(),
});

export const libraryIdParamsSchema = z.object({
  libraryId: z.string().min(1, "Library ID is required"),
});

export type CreateLibraryBody = z.infer<typeof createLibraryBodySchema>;
export type AddLibParams = z.infer<typeof addLibParamsSchema>;
export type AddLibBody = z.infer<typeof addLibBodySchema>;

