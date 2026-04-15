import type { Request, Response } from "express";
import {
    addLibBodySchema,
    addLibParamsSchema,
    createLibraryBodySchema,
    libraryIdParamsSchema,
} from "./libraries.schema";
import {
    addPostToLibrary,
    createLib,
    findOrCreateDefaultLibrary,
    getLibraries,
    getLibPosts,
    removePostFromLibrary,
} from "./libraries.service";

export async function libController(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const parsedBody = createLibraryBodySchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Invalid request body",
                errors: parsedBody.error.flatten().fieldErrors,
            });
        }

        const { name } = parsedBody.data;
        const library = await createLib(userId, name, false);
        return res.status(201).json({ library });
    } catch (err) {
        const e = err as Error & { statusCode?: number };
        if (e.statusCode) {
            return res.status(e.statusCode).json({ message: e.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function addPostController(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const parsedParams = addLibParamsSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "Invalid route params",
                errors: parsedParams.error.flatten().fieldErrors,
            });
        }

        const parsedBody = addLibBodySchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Invalid request body",
                errors: parsedBody.error.flatten().fieldErrors,
            });
        }

        const { libraryId, postId } = parsedParams.data;
        const { note } = parsedBody.data;

        const saved = await addPostToLibrary(userId, libraryId, postId, note);
        return res.status(201).json({ saved });
    } catch (err) {
        const e = err as Error & { statusCode?: number };
        if (e.statusCode) {
            return res.status(e.statusCode).json({ message: e.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getLibrariesController(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const libraries = await getLibraries(userId);
        return res.status(200).json({ libraries });
    } catch (err) {
        const e = err as Error & { statusCode?: number };
        if (e.statusCode) {
            return res.status(e.statusCode).json({ message: e.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}

export async function getLibPostsController(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const parsedParams = libraryIdParamsSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "Invalid route params",
                errors: parsedParams.error.flatten().fieldErrors,
            });
        }

        const posts = await getLibPosts(userId, parsedParams.data.libraryId);
        return res.status(200).json({ posts });
    } catch (err) {
        const e = err as Error & { statusCode?: number };
        if (e.statusCode) {
            return res.status(e.statusCode).json({ message: e.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function saveToDefaultLibraryController(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const parsedParams = addLibParamsSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "Invalid route params",
                errors: parsedParams.error.flatten().fieldErrors,
            });
        }

        const parsedBody = addLibBodySchema.safeParse(req.body);
        if (!parsedBody.success) {
            return res.status(400).json({
                message: "Invalid request body",
                errors: parsedBody.error.flatten().fieldErrors,
            });
        }

        const { postId } = parsedParams.data;
        const { note } = parsedBody.data;

        const defaultLib = await findOrCreateDefaultLibrary(userId);
        const saved = await addPostToLibrary(userId, defaultLib.id, postId, note);
        return res.status(201).json({ saved, library: defaultLib });
    } catch (err) {
        const e = err as Error & { statusCode?: number };
        if (e.statusCode) {
            return res.status(e.statusCode).json({ message: e.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}


export async function removePostController(req: Request, res: Response) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const parsedParams = addLibParamsSchema.safeParse(req.params);
        if (!parsedParams.success) {
            return res.status(400).json({
                message: "Invalid route params",
                errors: parsedParams.error.flatten().fieldErrors,
            });
        }

        const { libraryId, postId } = parsedParams.data;
        const result = await removePostFromLibrary(userId, libraryId, postId);
        return res.status(200).json(result);
    } catch (err) {
        const e = err as Error & { statusCode?: number };
        if (e.statusCode) {
            return res.status(e.statusCode).json({ message: e.message });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
}



