import RestaurantNavBar from '../components/RestaurantNavBar'
import Menu from '../components/Menu'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

const fetchRestaurantMenu  = async(slug:string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where : {
            slug
        },
        select : {
            items:true
        }
    })
    if(!restaurant){
        throw new Error()
        notFound();
    }

    return restaurant.items
}


async function RestaurantMenu({params}:{params:{slug:string}}){
    const menu = await fetchRestaurantMenu(params.slug)
    console.log({menu})
    return (
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar slug={params.slug}/>
            <Menu menu={menu}/>
            </div>
        </>
  )
}

export default RestaurantMenu



