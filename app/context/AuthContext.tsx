"use client"

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState , createContext, useContext, useEffect} from "react";

interface User {
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    city:string;
    phone:string;
    password:string
   
}


interface State {
    loading:boolean;
    error:string|null;
    data:User|null
}

interface AuthState extends State{
    setAuthState: React.Dispatch<React.SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
    loading:false,
    error:null,
    data:null,
    setAuthState:() => {}
    
})


export default function AuthContext({children}:{children:React.ReactNode}) {
  
    const [authState, setAuthState] = useState<State>({
        loading:true,
        data:null,
        error:null
    });
    const fetchUser= async () => {
        try {
            const jwt = getCookie('jwt')
            if(!jwt){
                setAuthState({
                    data:null,
                    error:null,
                    loading:false
                });
            }
            const response = await axios.get("http://localhost:3000/api/auth/me", {
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            })
            console.log(response)
            axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`

            setAuthState({
                data:response.data,
                error:null,
                loading:false
            });

        } catch (error:any) {
             setAuthState({
                data:null,
                error:error.response.data.errorMessage,
                loading:false
            });
        }
    }

    useEffect(() => {
        fetchUser()
    },[])
    return (
        <AuthenticationContext.Provider 
            value={{
                ...authState,
                setAuthState
        }}
        >
        {children}
        </AuthenticationContext.Provider>
        );
}
