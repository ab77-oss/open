import Price from '@/app/components/Price'
import { calculateReviewRatingAverage } from '@/utils/calculateReviewRatingAverage'
import { PrismaClient,Location, Cuisine, PRICE, Review } from '@prisma/client'
import { calculateOverrideValues } from 'next/dist/server/font-utils'
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
    slug:string,
    reviews:Review[]
   }


function RestaurantCard({restaurant}:{restaurant:Restaurant}) { 
    
 const renderRatingtext= () => {
    const rating = calculateReviewRatingAverage(restaurant.reviews)

    if(rating > 4) return "Awesome"
    else if(rating <=4 && rating > 3) return "Good"
    else if ( rating <=3 && rating >2) return "Average"
    else ""
    }
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
        <p className="ml-2 text-sm">{renderRatingtext()}</p>
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