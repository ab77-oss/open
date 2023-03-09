"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState, useEffect, useContext } from 'react';
import AuthModalInput from './AuthModalInput';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { Alert } from '@mui/material';

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

export default function AuthModal({isSignin}:{isSignin:boolean}) {
 
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {signin} = useAuth()
  const {loading, data, error} = useContext(AuthenticationContext)
  
  const renderContent = (signinContent: string, signupContent:string) => {
    return  isSignin ? signinContent : signupContent
  };

  const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]:e.target.value
    })
  }
  const [inputs, setInputs] = useState({
    firstName:"",
    lastName:"",
    email:"",
    phone:"",
    city:"",
    password:""
  });

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    if(isSignin){
      if(inputs.password && inputs.email){
        return setDisabled(false)
      }else {
        if(
          inputs.firstName && 
          inputs.lastName && 
          inputs.email && 
          inputs.phone && 
          inputs.password && 
          inputs.city){
          return setDisabled(false)
        }
      }
    }
    setDisabled(true)
  }, [inputs]);

  const handleClick = () => {
    if(isSignin){
      signin({email:inputs.email, password:inputs.password})
    }
  }

  return (
    <div>
      <button className={ `${renderContent("bg-blue-400 text-white","")} border p-1 px-4 rounded mr-3`} onClick={handleOpen}>
     
      {renderContent("Sign in" , "Sign up")}

      </button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='w-72 m-auto'
      >
        <Box sx={style}>
        {loading ? ( 
          <div className='PY-26 pX-2 h-[600p] flex justify-center'>
            <CircularProgress />
          </div>
        ):(
        <div className="p-2 h-[600px]">
          {error ? (
          <Alert severity="error" className='mb-4'>
            {error}
            </Alert>)
            :
            null}
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                {renderContent("Sign in", "Create Account")}
            </div>
            <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                    {renderContent("Log Into Your Account", "Create Your OpenTable Account")}
                </h2>
                <AuthModalInput 
                  inputs={inputs} 
                  handleChangeInput={handleChangeInput} 
                  isSignin={isSignin}
                />
                <button 
                  className='uppercase bg-red-600 w-full p-3 text-white rounded text-sm mb-5 disabled:bg-gray-400' 
                  disabled={disabled}
                  onClick={handleClick}
                  >
                {renderContent("Sign In", "Create Account")}
                </button>
            </div>
          </div>)}
        </Box>
      </Modal>
    </div>
  );
}