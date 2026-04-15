import { Prisma } from "@prisma/client";
import { db } from "../../lib/db";
import { signAccessToken } from "../../core/middleware";
import { hashPassword, comparePassword } from "../../lib/password";
import type { RegisterInput } from "./auth.schema";


export async function registerUser(input: RegisterInput) {
  const passwordHash = await hashPassword(input.password);

  try {
    const user = await db.user.create({
      data: {
        email: input.email,
        passwordHash,
        name: input.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    return user;
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      const e = new Error("Email already exists");
      (e as Error & { statusCode?: number }).statusCode = 409;
      throw e;
    }
    throw err;
  }
}


//creating login



export async function loginUser(email:string,password:string){
  const user=await db.user.findUnique({
    where: {email},
    select: {id:true,email:true,name:true,passwordHash:true}
  })

  if(!user){
    const e=new Error("Invalid credentials");
    (e as Error & {statusCode?: number}).statusCode=401
    throw e
  }
  const ok=await comparePassword(password,user.passwordHash)
  if(!ok){
    const e = new Error("Invalid credentials");
    (e as Error & { statusCode?: number }).statusCode = 401;
    throw e;
  }

  const token = signAccessToken({sub:user.id,email:user.email})
  return{
    token,
    user: { id: user.id, email: user.email, name: user.name },
  }
}