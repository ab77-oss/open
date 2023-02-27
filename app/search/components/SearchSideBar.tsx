import { Cuisine, PRICE, Location } from '@prisma/client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React from 'react'

function SearchSideBar({locations, cuisines, searchParams
}:{
    locations:Location[];
    cuisines:Cuisine[];
    searchParams : {city?:string,cuisine?:string, price?:PRICE }
    
    }) {

  const prices= [{
    price:PRICE.CHEAP,
    label:"$",
    className:"border w-full text-reg font-light rounded-l p-2"
  },{
    price:PRICE.REGULAR,
    label:"$$",
    className:"border w-full text-reg font-light p-2"
  },{
    price:PRICE.EXPENSIVE,
    label:"$$$",
    className:"border w-full text-reg text-center font-light rounded-r p-2"
  }]
  return (
    <div className="w-1/5">
        <div className="border-b pb-4 text-center bg-slate-200 drop-shadow-md flex flex-col">
        <h1 className="mb-2">Region</h1>
        {
            locations.map((location) => (
                <Link 
                        href={{
                            pathname:'/search',
                            query: {
                                ...searchParams,
                                city:location.name,
                            },
                        }}
                        className='font-light text-reg capitalize'
                        key={location.id}
                    >
                    {location.name}
                </Link>
                ))
        }
        </div>

        <div className="border-b pb-4 text-center bg-slate-200 drop-shadow-md flex flex-col">
        <h1 className="mb-2">Region</h1>
        {
            cuisines.map((cuisine) => (
                <Link 
                        href={{
                            pathname:'/search',
                            query: {
                                ...searchParams,
                                cuisine:cuisine.name,
                            }
                        }}
                        className='font-light text-reg capitalize'
                        key={cuisine.id}
                    >
                    {cuisine.name}
                </Link>
               
            ))
        }
        </div>

        <div className="mt-3 pb-4">
            <h1 className="mb-2 text-center drop-shadow-md">Price</h1>
            <div className="flex">
                {
                    prices.map(price => (
                        <Link className="border w-full text-reg font-light rounded-l p-2"
                            href={{
                            pathname:'/search',
                                    query: {
                                    ...searchParams,
                                    price:price.price,
                                }
                            }}
                            >
                                {price.label}
                        </Link>
                    ))
                }
            </div>
        </div>
  </div>
  
  )
}

export default SearchSideBar