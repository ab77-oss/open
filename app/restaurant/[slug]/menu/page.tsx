import RestaurantNavBar from '../components/RestaurantNavBar'
import Menu from '../components/Menu'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

const fetchItems = async(slug:string) => {
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
    }

    return restaurant
}


async function RestaurantMenu({params}:{params:{slug:string}}){
    const menu = await fetchItems(params.slug)
    console.log({menu})
    return (
    
        <>
            <div className="bg-white w-[100%] rounded p-3 shadow">
            <RestaurantNavBar slug={params.slug}/>
            <Menu />
            </div>
        </>
   
  
  )
}

export default RestaurantMenu



