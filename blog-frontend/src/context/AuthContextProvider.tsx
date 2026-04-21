//Represents all of the things React can render.

//Where ReactElement only represents JSX, ReactNode represents everything that can be rendered
import type { ReactNode} from "react";
import { useState, useEffect } from "react";
import * as authAPI from '../services/api'
import { AuthContext } from "./AuthContext";

//where to store

export function AuthProvider({children}:{children:ReactNode}){
    const [user,setUser]=useState(null)
    const [accessToken,setAccessToken]=useState(localStorage.getItem('accessToken'))
    const [isLoading,setIsLoading]=useState(false)
    const [error,setError]=useState<string | null>(null)//question why did not use string and null in user as type
    
    // Helper function to map error codes to friendly messages
    const getErrorMessage = (err: any): string => {
        const status = err.response?.status
        const data = err.response?.data
        
        switch(status) {
            case 400:
                return "Invalid email or password"
            case 401:
                return "Invalid email or password"
            case 404:
                return "User not found. Please sign up first"
            case 409:
                return "Email already exists. Please sign in"
            case 500:
                return "Server error. Please try again later"
            default:
                return data?.message || err.message || "Something went wrong"
        }
    }

    //getting login context
    const login= async (email:string,password:string)=>{
        setIsLoading(true)
        try{
            const response=await authAPI.login({email,password})
            console.log(response)
            setUser(response.user)
            setAccessToken(response.accessToken)
            console.log("accessToken:",response.accessToken)
            localStorage.setItem('accessToken',response.accessToken)
            setError(null)
        }catch(err:any){
            const errorMessage = getErrorMessage(err)
            setError(errorMessage)
            throw err  // ← Rethrow error to handleSubmit
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
      const errorMessage = getErrorMessage(err)
      setError(errorMessage)
      throw err  // ← Rethrow error to handleSubmit
    } finally {
      setIsLoading(false)
    }
    }

    const isAuthenticated=!!user && !!accessToken

    //check if user is already logged in (on app startup)
    const checkAuth = async () => {
        const token = localStorage.getItem('accessToken')
        if (!token) return
        
        try {
            const response = await authAPI.getMe()
            setUser(response)
            setAccessToken(token)
        } catch (err) {
            localStorage.removeItem('accessToken')
            console.log("token:",localStorage.removeItem('accessToken'))
            setUser(null)
            setAccessToken(null)
        }
    }

    //run checkAuth on component mount
    useEffect(() => {
        console.log("checkauth is working")
        checkAuth()
    }, [])

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
            setError,
         }}
         >
        {children}
        </AuthContext.Provider>
    )

}