import { Router } from "express";
import { login,register,me } from "./auth.controller";
import { requireAuth } from "../../core/middleware";
const authRouter=Router();

authRouter.post("/register",register);
authRouter.post("/login", login);
authRouter.get("/me", requireAuth, me);

export default authRouter;
