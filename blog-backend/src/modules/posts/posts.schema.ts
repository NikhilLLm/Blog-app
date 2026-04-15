import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().trim().min(3).max(150),
  content: z.string().trim().min(20),
  description: z.string().trim().max(300).optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;


export const publishPostParamsSchema = z.object({
  id: z.string().min(1, "Post id is required"),
});
export const getPostParamsSchema = z.object({
  id: z.string().min(1, "Post id is required"),
});
export type PublishPostParams = z.infer<typeof publishPostParamsSchema>;
export type getPostParamsSchema=z.infer<typeof getPostParamsSchema>;