"use client"
import useReservation from "@/hooks/useReservation";
import { CircularProgress } from "@mui/material";
import { SetStateAction, useEffect, useState, Dispatch } from "react"


function Form({
  slug, date,  partySize
}:{
  slug:string;
  date:string
  partySize:string;
}) {

  const [inputs, setInputs] = useState({
    bookerFirstName:"",
    bookerLastName:"",
    bookerPhone:"",
    bookerEmail:"",
    bookerOccasion:"",
    bookerRequest:""
  });

  const [day, time] = date.split("T")
  const [disabled, setDisabled] = useState(false);
  const [didBook, setDidBook] = useState(false)
  const {error, loading, createReservation} = useReservation()

  useEffect(() => {
    if(
      inputs.bookerFirstName && 
      inputs.bookerLastName &&
      inputs.bookerEmail &&
      inputs.bookerPhone
      ){
        return setDisabled(false)
      }
      return setDisabled(true)
  },[inputs])

  const handleChangeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]:e.target.value
    });
  };

  const handleClick = async () => {
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName:inputs.bookerFirstName,
      bookerLastName:inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion:inputs.bookerOccasion,
      bookerPhone:inputs.bookerPhone,
      bookerRequest:inputs.bookerRequest,
      setDidBook
      
    })
  }
  
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      {didBook ? 
      <div>
      <h1>You are all booked up</h1>
      <p>Enjoy your reservation</p>
      </div>
      
      : 
   <>
    <input
      type="text"
      className="border rounded p-3 w-80 mb-4"
      placeholder="First name"
      name="bookerFirstName"
      value={inputs.bookerFirstName}
      onChange={handleChangeInput}
    />
    <input
      type="text"
      className="border rounded p-3 w-80 mb-4"
      placeholder="Last name"
      value={inputs.bookerLastName}
      name="bookerLastName"
      onChange={handleChangeInput}
    />
    <input
      type="text"
      className="border rounded p-3 w-80 mb-4"
      placeholder="Phone number"
      value={inputs.bookerPhone}
      name="bookerPhone"
      onChange={handleChangeInput}
    />
    <input
      type="text"
      className="border rounded p-3 w-80 mb-4"
      placeholder="Email"
      value={inputs.bookerEmail}
      name="bookerEmail"
      onChange={handleChangeInput}
    />
    <input
      type="text"
      className="border rounded p-3 w-80 mb-4"
      placeholder="Occasion (optional)"
      value={inputs.bookerOccasion}
      name="bookerOccasion"
      onChange={handleChangeInput}
    />
    <input
      type="text"
      className="border rounded p-3 w-80 mb-4"
      placeholder="Requests (optional)"
      value={inputs.bookerRequest}
      name="bookerRequest"
      onChange={handleChangeInput}
    />
    <button disabled={disabled || loading}
      className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
      onClick={handleClick}
    
    >
   {loading ? <CircularProgress color="inherit" />:"Complete Reservation" }
    </button>
    <p className="mt-4 text-sm">
      By clicking “Complete reservation” you agree to the OpenTable Terms
      of Use and Privacy Policy. Standard text message rates may apply.
      You may opt out of receiving text messages at any time.
    </p>
    </>}


  </div>
    )
  }


export default Form