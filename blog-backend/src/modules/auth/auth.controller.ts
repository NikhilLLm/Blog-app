import { Request, Response } from "express";
import { loginSchema, registerSchema } from "./auth.schema";
import { loginUser, registerUser } from "./auth.services";

export async function register(req: Request, res: Response) {
  try {
    const parsed = registerSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const user = await registerUser(parsed.data);
    return res.status(201).json({ user });
  } catch (err) {
    const e = err as Error & { statusCode?: number };
    if (e.statusCode) {
      return res.status(e.statusCode).json({ message: e.message });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}


//login controller

export async function login(req:Request, res:Response){
  try{
    const parsed=loginSchema.safeParse(req.body)
    if(!parsed.success){
      return res.status(400).json({
        message: "Invalid request body",
        errors: parsed.error.flatten().fieldErrors
      })
    }
    const result=await loginUser(parsed.data.email,parsed.data.password)
    return res.status(200).json(result)
  }catch (err){
    const e = err as Error & { statusCode?: number };
    if (e.statusCode) return res.status(e.statusCode).json({ message: e.message });
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function me(req: Request, res: Response) {
  return res.status(200).json({ user: req.user });
}