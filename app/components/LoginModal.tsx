"use client"
import { useEffect, useState ,useContext} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthIModalnputs from './AuthIModalnputs';
import useAuth from '../../hooks/useAuth';
import { AuthenticationssContext } from '../context/AuthContext';
import { CircularProgress } from '@mui/material';





const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({isSignin}:{isSignin:boolean}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { signin } = useAuth()

  const { loading, data , error } = useContext(AuthenticationssContext)

  const renderContent = (signinContent:string,signupContent:string) => {

    return isSignin ?  signinContent :signupContent
    
  }

  const handleChangeIput = (e: React.ChangeEvent<HTMLInputElement>) =>{

    setInputs(
      {
        ...inputs,
        [e.target.name]:e.target.value
      }
    )

  }


  const [inputs,setInputs] = useState ({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    city:"",
    password:""
  })

const [disabled,setDisabled] = useState(true)
  useEffect(() =>{
    if(isSignin){
      if(inputs.password && inputs.email){
        return setDisabled(false)
      }
    }
    else{
      if(inputs.firstName && inputs.lastName && inputs.email && inputs.phone && inputs.password && inputs.city && inputs.phone ){
        return setDisabled(false)
      }
    } 

    setDisabled(true)

  }, [inputs])

const HandleClick = () =>{
  if (isSignin){
    signin({email:inputs.email, password:inputs.password})
  }
}

  return (
    <div>
      <button
              className={`${renderContent("bg-blue-400 text-white", "")} border p-1 px-4 rounded mr-3`}
              onClick={handleOpen}
            >
           {renderContent("Sign in" , "sign up")}
            </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          {loading ? <div className=' py-24 px-2 h-[600px] flex justify-center'><CircularProgress /></div> :
          
          <div className="p-2 h-[600px]">

            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className='text-sm'>
                {renderContent("Sign In" , "Create Account")}
              </p>
            </div>

            <div className='m-auto'>
              <h2 className='text-2xl font-light text-center'>
              {renderContent("Login Into Your Account" , "Create Your  Account")}  
              </h2>

              <AuthIModalnputs inputs = {inputs} handleChangeIput = {handleChangeIput} isSignin ={isSignin} />
              <button 
              className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm bm-5 disabled:bg-gray-400'
               disabled ={disabled}
               onClick={HandleClick}
              >
              {renderContent("Sign In" , "Create Account")}
              </button>
            </div>
            
          </div>
          }

        </Box>
      </Modal>
    </div>
  );
}