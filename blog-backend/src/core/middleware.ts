import jwt from "jsonwebtoken"
import { config } from "./config"
import type { Request,Response,NextFunction } from "express"

type JwtPayload={
    sub:string  //user id
    email:string
    name?:string  // ← Optional (can be undefined)
}


export function signAccessToken(payload:JwtPayload){
    return jwt.sign(payload,config.JWT_SECRET,{expiresIn:"15m"})

}

export function verifyAccessToken(token:string){
    return jwt.verify(token,config.JWT_SECRET) as JwtPayload & { iat: number; exp: number }
}


export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader.slice("Bearer ".length).trim();

  try {
    const decoded = verifyAccessToken(token);
    req.user = { id: decoded.sub, email: decoded.email, name: decoded.name || '' };
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}