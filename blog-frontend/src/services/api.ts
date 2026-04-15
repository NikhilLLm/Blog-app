import axios from "axios";

interface LoginCredentials{
    email:string
    password:string
}

interface AuthResponse{
    accessToken:string
    user:{
        id:string
        email:string
        name:string
    }
}
//creating axios instance

const api=axios.create({
    baseURL:import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers:{
        'Content-Type':'application/json'
    }
})
//adding interceptores:- it is just like middleware which check for the authorization to the path of user
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem('accessToken')
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})
api.interceptors.response.use(
    (response) => response,
    (error)=>{
        if(error.response?.status===401){
            //unauthorized:redirect to login
            localStorage.removeItem('accessToken')
            window.location.href='/login'
        }
        throw error
    }
)

//using api instance


//signup
export const signup=(data:{email:string;name:string;password:string}):Promise<AuthResponse>=>{
    return api.post('/auth/register',data)
}

//login
export const login=(credentials:LoginCredentials):Promise<AuthResponse>=>{
    return api.post('/auth/login',credentials)
}

//get current user

export const getMe=():Promise<{id:string;email:string;name:string}> =>{
    return api.get('/auth/me')

}

//logout (clear token and redirect to login page)

export const logut=()=>{
    localStorage.removeItem('accessToken')
    window.location.href='/login'
}