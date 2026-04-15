import { db } from "../../lib/db";
import type { CreatePostInput } from "./posts.schema";

type HttpError = Error & { statusCode?: number };

function makeHttpError(message: string, statusCode: number): HttpError {
  const err = new Error(message) as HttpError;
  err.statusCode = statusCode;
  return err;
}

export async function createPost(authorId: string, input: CreatePostInput) {
  const post = await db.post.create({
    data: {
      authorId,
      title: input.title,
      content: input.content,
      description: input.description,
    },
    select: {
      id: true,
      title: true,
      content: true,
      description: true,
      status: true,
      authorId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return post;
}


//publishing 

export async function publishPost(authorId:string,id:string){
    const post = await db.post.findUnique({
    where: { id },
    select: {
      id: true,
      authorId: true,
      status: true,
      publishedAt: true,
      title: true,
      content: true,
      description: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if(!post) throw makeHttpError("Post not found",404);
  if(post.authorId!==authorId){
    throw makeHttpError("Forbidden",403)
  }
  if (post.status === "PUBLISHED") {
    return { alreadyPublished: true, post };
  }

  const updated = await db.post.update({
    where: { id },
    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
    select: {
      id: true,
      authorId: true,
      title: true,
      content: true,
      description: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
    },
  });

  return { alreadyPublished: false, post: updated };
}


//getting user's post

export async function getMyPosts(authorId: string) {
  return db.post.findMany({
    where: { authorId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}


//get the post



export async function getPosts() {
  return db.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      publishedAt: true,
      createdAt: true,
    },
  });
}

// public single-post read: only published
export async function getPost(id: string) {
  return db.post.findFirst({
    where: {
      id,
      status: "PUBLISHED",
    },
    select: {
      id: true,
      title: true,
      content: true,
      description: true,
      status: true,
      publishedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}


//delete post

export async function deletePost(authorId:string,id:string){
  const post=await db.post.findUnique({
    where:{id},
    select:{id:true,authorId:true},
  })

  if(!post){
    const e=new Error("Post not found") as Error & {statusCode?: number}
    e.statusCode=404
    throw e
  }

  if (post.authorId !== authorId) {
    const e = new Error("Forbidden") as Error & { statusCode?: number };
    e.statusCode = 403;
    throw e;
  }

  await db.post.delete({ where: { id } });
  return { success: true };
}