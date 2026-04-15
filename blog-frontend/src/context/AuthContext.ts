import { createContext } from "react";


//define the shape of auth data(what to store)
export interface AuthContextType{
    user:{
        id:string
        email:string
        name:string
    }|null
    accessToken:string | null
    isLoading:boolean
    error:string | null
    login: (email: string, password: string) => Promise<void>
     logout: () => void
     signup: (email: string, name: string, password: string) => Promise<void>
     isAuthenticated:boolean
}


//create context
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

