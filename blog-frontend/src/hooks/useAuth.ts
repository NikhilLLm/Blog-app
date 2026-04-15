import { useContext } from "react";
import { AuthContext} from "../context/AuthContext";
import type { AuthContextType } from "../context/AuthContext";
//using type means that authcontextType only exist at complie time not at runtime 


export function useAuth() : AuthContextType{
    const context=useContext(AuthContext)

    if(!context){
        throw new Error('useAuth must be used inside AuthProvider')
    }

    return context
}