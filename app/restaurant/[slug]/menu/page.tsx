
import Header from "../components/Header"
import RestaurantNavBar from "../components/RestaurantNavBar"
import Menu from "../components/Menu"
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

const fetchItems = async(slug:string)=>{
  const restaurant = await prisma.restaurant.findUnique({


    where:{
      slug
    },

    select :{
      items:true
    }
  })

  if(!restaurant){

    throw new Error()
    
  }

  return restaurant.items

}

export default async function RestaurantMenu({params}:{params:{slug:string}}){

  const itemmenu = await fetchItems(params.slug) 


    return(
      
      <div className="bg-white w-[100%] rounded p-3 shadow">
        {/* RESAURANT NAVBAR */}
       <RestaurantNavBar slug={params.slug} />
        {/* RESAURANT NAVBAR */}
         {/* MENU */}
       <Menu menuItems = {itemmenu} />
        {/* MENU */}
      </div>
  
    )
}