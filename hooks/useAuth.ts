import { AuthenticationContext } from "../app/context/AuthContext"
import axios from "axios"
import { removeCookies } from "cookies-next"
import { useContext } from "react"

const useAuth = () => {

const {setAuthState} = useContext(AuthenticationContext)
        
    
    const signin = async ({
        email,
        password
    }:{
        email:string, 
        password:string
    }, handleClose:() => void ) => {
        setAuthState({
            data:null,
            error:null,
            loading:true
        });
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signin",{
                email,
                password
            });
            console.log(response)
            setAuthState({
                data:response.data,
                error:null,
                loading:false
            });
            handleClose()
        } catch (error:any) {
            console.log(error)
            setAuthState({
                data:null,
                error:error.response.data.errorMessage,
                loading:true
            })
        }
    }
    const signup =  async ({
        
        firstName,
        lastName, 
        email,
        phone, 
        city,
        password
    }:{
        
        firstName:string;
        lastName:string;
        email:string;
        phone:number;
        city:string;
        password:string
        


    },
    handleClose:() => void ) => {
        setAuthState({
            data:null,
            error:null,
            loading:true
        });
        try {
            const response = await axios.post("http://localhost:3000/api/auth/signup",{
                firstName,
                lastName, 
                email,
                phone,
                city,
                password
            });
            console.log(response)
            setAuthState({
                data:response.data,
                error:null,
                loading:false
            });
            handleClose()
        } catch (error:any) {
            console.log(error)
            setAuthState({
                data:null,
                error:error.response.data.errorMessage,
                loading:true
            })
        }
    };

    const signout = () => {
        removeCookies("jwt");
        setAuthState({
            data:null,
            error:null,
            loading:true
        })

    }


    return {
        signin,
        signup,
       signout
    }
}

export default useAuth