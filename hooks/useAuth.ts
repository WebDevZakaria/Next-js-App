
import axios from "axios"
import { useContext } from "react";
import { AuthenticationssContext } from "../app/context/AuthContext";




const useAuth = () =>{

    const {data, error, setAuthState} = useContext(AuthenticationssContext)
    
    const signin = async ({
        email,password}:{
            email:string;password:string
        }) =>{
           setAuthState({
            data:null,
            error:null,
            loading:true

        })  
        try{

           const response = await axios.post("http://localhost:3000/api/auth/signin",{
                email,password
            })
            setAuthState({
                data:response.data,
                error:null,
                loading:false
    
            })
            console.log(response)
        }
        catch(error:any){
            console.log(error)
            
            setAuthState({

                data:null,
                error:error.response.data.errorMessage,
                loading:false

            })
            
        }


    }

    const signup = async () =>{}

    return {
        signin,
        signup
    }

}



export default useAuth