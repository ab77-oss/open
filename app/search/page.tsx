import React from 'react'
import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient, Cuisine, Location } from '@prisma/client'
import { notFound } from 'next/navigation'


const prisma = new PrismaClient()

const fetchRestaurant = async (city:string, cuisine:string, price:PRICE) => {
    const restaurants = await prisma.restaurant.findMany({
        where: {
            location:{
                name: {
                    equals:city.toLowerCase()
                }
            },
            cuisine:{
                name:{
                    equals:cuisine
                }
            },
            price : {
                equals:price
            }

        },
        select :{
            id:true,
            name:true,
            main_image:true,
            price:true,
            cuisine:true,
            location:true,
            slug:true,
            reviews:true
        }
    });
    if(!restaurants){
        throw new Error()
        notFound();
    }
    return restaurants

}


const fetchLocations = async () => {
    return  prisma.location.findMany() 
}

const fetchCuisines = async () => {
    return  prisma.cuisine.findMany() 
}





async function Search({searchParams}:{searchParams:{city:string,cuisine:string, price:PRICE }}) {

 const restaurants = await fetchRestaurant(searchParams.city, searchParams.cuisine, searchParams.price)

 const locations = await fetchLocations();
 const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar 
            locations={locations} 
            cuisines={cuisines} 
            searchParams={searchParams}
        />
      
            <div className="w-5/6">
            {restaurants.length ? ( 
            <>
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant}/>
                ))}
            </>
            ):(
                <p>No Restaurant in this location</p>
            )
            }
        </div>
      </div>
    </>

  
  )
}

export default Search

