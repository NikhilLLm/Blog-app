import {
	addPostController,
	getLibrariesController,
	getLibPostsController,
	libController,
	removePostController,
	saveToDefaultLibraryController,
} from "./libraries.controller";
import { Router } from "express";
import { requireAuth } from "../../core/middleware";


const librouter=Router()

librouter.post("/", requireAuth, libController)
librouter.get("/", requireAuth, getLibrariesController)
librouter.post("/default/posts/:postId", requireAuth, saveToDefaultLibraryController)
librouter.get("/:libraryId/posts", requireAuth, getLibPostsController)
librouter.post("/:libraryId/posts/:postId", requireAuth, addPostController)
librouter.delete("/:libraryId/posts/:postId", requireAuth, removePostController)

export default librouter