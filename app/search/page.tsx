import React from 'react'
import Header from './components/Header'
import SearchSideBar from './components/SearchSideBar'
import RestaurantCard from './components/RestaurantCard'
import { PRICE, PrismaClient, Cuisine, Location } from '@prisma/client'


const prisma = new PrismaClient()

const fetchRestaurantByCity= async (city:string) => {
    const  restaurants = await prisma.restaurant.findMany({
        where: {
            location : {
                name: {
                    equals: city
                }
            }
        },
     
        select: {
            id:true,
            name:true,
            main_image:true,
            price:true,
            cuisine:true,
            location:true,
            slug:true
        }
    });
    if(!restaurants){
        throw new Error()
    }
    return restaurants
}


const fetchLocations = async () => {
    return  prisma.location.findMany() 
}

const fetchCuisines = async () => {
    return  prisma.cuisine.findMany() 
}





async function Search({searchParams}:{searchParams:{city:string,cuisine?:string, price?:PRICE }}) {

 const restaurants = await fetchRestaurantByCity(searchParams.city)

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

