import { convertToDisplayTime, Time } from "@/utils/convertToDisplayTime";
import {format} from "date-fns"

function Header({
  image,
  name,
  date,
  partySize
}:{
  image:string;
  name:string;
  date:string;
  partySize:string;
}) {
  return (
     <div>
     <h3 className="font-bold">You're almost done!</h3>
     <div className="mt-5 flex">
       <img
         src={image}
         alt=""
         className="w-32 h-24 rounded"
       />
       <div className="ml-4">
         <h1 className="text-3xl font-bold">
           {name}
         </h1>
         <div className="flex mt-3">
           <p className="mr-6">
            {format(new Date(date), "ccc, LLL,d")}
            </p>
           <p className="mr-6">7:30 PM</p>
           <p className="mr-6">{partySize}</p>
         </div>
       </div>
     </div>
   </div>
  )
}

export default Header