import type { Request, Response } from "express";
import { createPostSchema,publishPostParamsSchema,getPostParamsSchema } from "./posts.schema";
import { createPost,publishPost,getMyPosts, getPosts,getPost,deletePost } from "./posts.service";

export async function createPostHandler(req: Request, res: Response) {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const parsed = createPostSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const post = await createPost(userId, parsed.data);
  return res.status(201).json({ post });
}


//publishing control


export async function publishPostHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const parsedParams = publishPostParamsSchema.safeParse(req.params);
    if (!parsedParams.success) {
      return res.status(400).json({
        message: "Invalid route params",
        errors: parsedParams.error.flatten().fieldErrors,
      });
    }

    const result = await publishPost(userId, parsedParams.data.id);

    if (result.alreadyPublished) {
      return res.status(200).json({
        message: "Post already published",
        post: result.post,
      });
    }

    return res.status(200).json({
      message: "Post published successfully",
      post: result.post,
    });
  } catch (err) {
    const e = err as Error & { statusCode?: number };
    if (e.statusCode) {
      return res.status(e.statusCode).json({ message: e.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMyPostsHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const posts = await getMyPosts(userId);
    return res.status(200).json({ posts });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}


export async function getPublicPostsHandler(req: Request, res: Response) {
  try {
    const posts = await getPosts();
    return res.status(200).json({ posts });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function getPublicPostByIdHandler(req: Request, res: Response) {
  try {
    const parsed = getPostParamsSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid route params",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const post = await getPost(parsed.data.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
}

//delete handler

export async function deletePostHandler(req: Request, res: Response) {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const parsed = publishPostParamsSchema.safeParse(req.params);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid route params",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    await deletePost(userId, parsed.data.id);
    return res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    const e = err as Error & { statusCode?: number };
    if (e.statusCode) return res.status(e.statusCode).json({ message: e.message });
    return res.status(500).json({ message: "Internal server error" });
  }
}