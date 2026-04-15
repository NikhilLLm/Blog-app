//Represents all of the things React can render.

//Where ReactElement only represents JSX, ReactNode represents everything that can be rendered
import type { ReactNode} from "react";
import { useState } from "react";
import * as authAPI from '../services/api'
import { AuthContext } from "./AuthContext";

//where to store

export function AuthProvider({children}:{children:ReactNode}){
    const [user,setUser]=useState(null)
    const [accessToken,setAccessToken]=useState(localStorage.getItem('accessToken'))
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState<string | null>(null)//question why did not use string and null in user as type
    


    //getting login context
    const login=async (email:string,password:string)=>{
        setIsLoading(true)
        try{
            const response=await authAPI.login({email,password})
            setUser(response.user)
            setAccessToken(response.accessToken)
            localStorage.setItem('accessToken',response.accessToken)
            setError(null)
        }catch(err:any){
            setError(err.message)
        }finally{
            setIsLoading(false)
        }

    }

    //logout
    const logout=()=>{
        setUser(null)
        setAccessToken(null)
        localStorage.removeItem('accessToken')
    }


    //signup
    const signup=async(email:string,name:string,password:string)=>{
       setIsLoading(true)
    try {
      const response = await authAPI.signup({ email, name, password })
      setUser(response.user)
      setAccessToken(response.accessToken)
      localStorage.setItem('accessToken', response.accessToken)
      setError(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
    }

    const isAuthenticated=!!user && !!accessToken

    return (
        <AuthContext.Provider
         value={{
            user,
            accessToken,
            isLoading,
            error,
            login,
            logout,
            signup,
            isAuthenticated,
         }}
         >
        {children}
        </AuthContext.Provider>
    )

}