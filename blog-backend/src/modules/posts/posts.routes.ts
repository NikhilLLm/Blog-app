import { Router } from "express";
import { requireAuth } from "../../core/middleware";
import { createPostHandler,publishPostHandler,getMyPostsHandler,getPublicPostByIdHandler,getPublicPostsHandler,deletePostHandler } from "./posts.controller";

const postsRouter = Router();

postsRouter.post("/", requireAuth, createPostHandler);
postsRouter.patch("/:id/publish", requireAuth, publishPostHandler);
postsRouter.delete("/:id", requireAuth, deletePostHandler);
postsRouter.get("/mine", requireAuth, getMyPostsHandler);
postsRouter.get("/posts",getPublicPostsHandler)
postsRouter.get("/:id", getPublicPostByIdHandler);
export default postsRouter;
