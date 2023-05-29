import Header from "./components/Header"
import SearchBarSide from "./components/SearchSideBar"
import RestaurantCard from "./components/RestaurantCard"
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client"


const prisma =new PrismaClient();



const fetchDataByCity = (city:string | undefined) =>{

  const select  = {
    id:true,
      name:true,
      main_image:true,
      price:true,
      cuisine:true,
      location:true,
      slug:true
    }



  if(!city) return  prisma.restaurant.findMany({select})

  return prisma.restaurant.findMany({

    where:{
      location:{
        name:
        {equals:city.toLowerCase()
        }
      }
    },

    select,

  })
}

const fetchLocation =async () =>{
  return prisma.location.findMany()

}

const fetchCuisine = () =>{

  return prisma.cuisine.findMany()

}








export default async function Search({searchParams}:{searchParams:{city?:string,cuisine?:string,price?:PRICE}}){

  const restaurant = await fetchDataByCity(searchParams.city)
  const location = await fetchLocation()
  const cuisine = await fetchCuisine()

    return (

      <>

    <Header />
    <div className="flex py-4 m-auto w-2/3 justify-between items-start">

      <SearchBarSide locations = {location} cuisines  = {cuisine} searchParams = {searchParams}  />
      
      <div className="w-5/6">

       {restaurant.length ? 
       <>
       {restaurant.map((restaurant)=>(

        <RestaurantCard restaurant = {restaurant} />

       ))}
      </>
        : <p>Sorry, we found no restaurant in this city </p> }

      </div>

    </div>

    </>

    )
}



