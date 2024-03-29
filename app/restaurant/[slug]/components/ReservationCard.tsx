"use client"
import { useState } from 'react';
import {partySize as partySizes, times} from '../../../../data/index';
import DatePicker from 'react-datepicker'
import useAvailabilities from '@/hooks/useAvailabilities';
import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { convertToDisplayTime } from '@/utils/convertToDisplayTime';
import { stringify } from 'querystring';


function ReservationCard({
  openTime, 
  closeTime,
  slug,

}:{
  openTime:string; 
  closeTime:string;
  slug:string;


}) {

    const [selectedDate, setSelectedDate]= useState<Date | null>(new Date())
    const [time, setTime] = useState(openTime)
    const [partySize, setPartySize] = useState("2")
    const [day, setDay] = useState(new Date().toISOString().split("T")[0])

    const {loading, data,error, fetchAvailabilities} = useAvailabilities({slug, partySize,time,day})

  const handleChangeDate= (date:Date | null)=> {
    if(date){
      setDay(date.toISOString().split("T")[0])
      return setSelectedDate(date);
    }
    return setSelectedDate(null)
  };
  const handleClick = () => {
    fetchAvailabilities()
  }
  const filterTimeByRestaurantOpenWindow= () => {
    const timesInWindow : typeof times = [];
    let isWithInWindow=false

    times.forEach(time => {
      if(time.time === openTime){
        isWithInWindow=true
      }
      if(isWithInWindow){
        timesInWindow.push(time)
      }
      if(time.time===closeTime){
        isWithInWindow=false
      }
    });
    return timesInWindow

  }
  return (
    <div className="w-[27%] relative text-reg">
    <div className="fixed w-[15%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation</h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select name="" className="py-3 border-b font-light" id="" value={partySize} onChange={(e) => setPartySize(e.target.value)}>
          {
            partySizes.map(partySize => (
              <option value="" key={partySize.value}>{partySize.label}</option>
            ))
          }
          
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Date</label>
          <DatePicker selected={selectedDate} onChange={handleChangeDate} className='py-3 border-b font-light text-reg w-28' dateFormat="MMMM dd" wrapperClassName='w-[24]'/>
        </div>
        <div className="flex flex-col w-[48%]">
          <label htmlFor="">Time</label>
          <select name="" id="" className="py-3 border-b font-light" value={time} onChange={(e) => setTime(e.target.value)}>
            {filterTimeByRestaurantOpenWindow().map(time => (
               <option value={time.time}>{time.displayTime}</option>
            ) )}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
          onClick={handleClick}
        >
          {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
        </button>
      </div>
    </div>
    {data && data.length ? (
      <div className='mt-4'>
        <p className='text-reg'>Select a Time</p>
        <div className='flex flex-wrap mt-2'>
          {data.map(time => {
            return time.available ? <Link href={`/reserve/${slug}?date=${time.time}$partySize=${partySize}`} className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3">
              <p className='text-sm font-bold'>
               {/* {convertToDisplayTime(time.time)} */}
               {time.time}
              </p>
            </Link> : <p className='bg-gray-300 p-2 w-24 mb-3 rounded mr-3'></p>
          })}
        </div>
      </div>
    ):null}
  </div>
  )
}

export default ReservationCard