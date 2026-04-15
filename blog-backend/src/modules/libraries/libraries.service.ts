
import { db } from "../../lib/db";
import { Prisma } from "@prisma/client";

type HttpError = Error & { statusCode?: number };

function makeHttpError(message: string, statusCode: number): HttpError {
  const err = new Error(message) as HttpError;
  err.statusCode = statusCode;
  return err;
}

export async function createLib(user_id:string,name:string,Default:boolean){
  try {
    const lib=await db.library.create({
      data:{
        ownerId:user_id,
        name:name,
        isDefault:Default
      },
      select:{
        id:true,
        ownerId:true,
        name:true,
        isDefault:true,
        createdAt:true,
        posts:true,
      }
    })
    return lib
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw makeHttpError("Library with this name already exists", 409);
    }
    throw err;
  }
}


export async function addPostToLibrary(userId: string | undefined, libraryId: string, postId: string, note?: string) {
  if (!userId) {
    throw makeHttpError("Unauthorized", 401);
  }
  const library = await db.library.findUnique({ where: { id: libraryId } });
  if (!library) {
    throw makeHttpError("Library not found", 404);
  }
  if (library.ownerId !== userId) {
    throw makeHttpError("Forbidden: You do not own this library.", 403);
  }
  try {
    const entry = await db.libraryPost.create({
      data: {
        libraryId,
        postId,
        note,
      },
    });
    return entry;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      throw makeHttpError("Post already saved in this library", 409);
    }
    throw err;
  }
}


export async function getLibraries(userID:string | undefined){

  
     if (!userID) throw makeHttpError("Unauthorized", 401);

    const libs = await db.library.findMany({
    where: { ownerId: userID },
    select: {
      id: true,
      name: true,
      isDefault: true,
      createdAt: true,
      posts: true,
    },
  });
  return libs;
}


export async function getLibPosts(userId: string | undefined, libraryId:string){
  if (!userId) throw makeHttpError("Unauthorized", 401);

  const library = await db.library.findUnique({
    where: { id: libraryId },
    select: { id: true, ownerId: true },
  });

  if (!library) {
    throw makeHttpError("Library not found", 404);
  }
  if (library.ownerId !== userId) {
    throw makeHttpError("Forbidden", 403);
  }

  const entries = await db.libraryPost.findMany({
    where:{libraryId:libraryId},
    select:{
      postId:true,
      note:true,
      savedAt:true,
      post:true,
    }
  })
  return entries
}


export async function findOrCreateDefaultLibrary(userId: string) {
  if (!userId) {
    throw makeHttpError("Unauthorized", 401);
  }

  let defaultLib = await db.library.findFirst({
    where: { ownerId: userId, isDefault: true },
    select: {
      id: true,
      ownerId: true,
      name: true,
      isDefault: true,
      createdAt: true,
    },
  });

  if (!defaultLib) {
    defaultLib = await createLib(userId, "Bookmarks", true);
  }

  return defaultLib;
}


export async function removePostFromLibrary(userId: string | undefined, libraryId: string, postId: string) {
  if (!userId) {
    throw makeHttpError("Unauthorized", 401);
  }

  const library = await db.library.findUnique({ where: { id: libraryId } });
  if (!library) {
    throw makeHttpError("Library not found", 404);
  }
  if (library.ownerId !== userId) {
    throw makeHttpError("Forbidden: You do not own this library.", 403);
  }

  const entry = await db.libraryPost.findUnique({
    where: { libraryId_postId: { libraryId, postId } },
  });

  if (!entry) {
    throw makeHttpError("Post not found in library", 404);
  }

  await db.libraryPost.delete({
    where: { libraryId_postId: { libraryId, postId } },
  });

  return { success: true };
}