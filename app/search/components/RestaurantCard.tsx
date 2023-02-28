import Price from '@/app/components/Price'
import { PrismaClient,Location, Cuisine, PRICE } from '@prisma/client'
import Link from 'next/link'
import React from 'react'


const prisma = new PrismaClient()

export interface  Restaurant {
    id:number,
    name:string,
    main_image:string,
    cuisine:Cuisine,
    location:Location,
    price:PRICE,
    slug:string
   }


function RestaurantCard({restaurant}:{restaurant:Restaurant}) { 
    
    
  return (
    <div className="border-b flex pb-5">
    <img
      src={restaurant.main_image}
      alt=""
      className="w-40 h-36 rounded"
    />
    <div className="pl-4">
      <h2 className="text-2xl">{restaurant.name}</h2>
      <div className="flex items-start">
        <div className="flex mb-2">*****</div>
        <p className="ml-2 text-sm">Awesome</p>
      </div>
      <div className="mb-5">
        <div className="font-light flex text-reg">
        <Price price={restaurant.price} />
          <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
          <p className="mr-4 capitalize">{restaurant.location.name}</p>
        </div>
      </div>
      <div className="text-red-600">
      <Link href={`restaurant/${restaurant.slug}`}>View more information</Link>
      </div>
    </div>
  </div>
  
  )
}

export default RestaurantCard