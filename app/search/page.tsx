import Header from "./components/Header"
import SearchBarSide from "./components/SearchSideBar"
import RestaurantCard from "./components/RestaurantCard"
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client"


const prisma =new PrismaClient();

interface SearchParams{

  city?:string,cuisine?:string,price?:PRICE

}



const fetchDataByCity = (searchParams:SearchParams) =>{

  const where:any = {};

  if(searchParams.city){

    const location = {
      name:{
        equals:searchParams.city.toLowerCase()
    }
  }

  where.location = location

  }
  
  if(searchParams.cuisine){

    const cuisine = {

      name:{

        equals:searchParams.cuisine.toLowerCase()        
    }
  }

  where.cuisine = cuisine

  }

  if(searchParams.price){

    const price = {

        equals:searchParams.price
    
  }

  where.price = price
  }
  

  const select  = {
      id:true,
      name:true,
      main_image:true,
      price:true,
      cuisine:true,
      location:true,
      slug:true,
      reviews:true
    }

    return prisma.restaurant.findMany({
      where,
      select,

    })
}

const fetchLocation =async () =>{
  return prisma.location.findMany()

}

const fetchCuisine = () =>{

  return prisma.cuisine.findMany()

}








export default async function Search({searchParams}:{searchParams:SearchParams}){

  const restaurant = await fetchDataByCity(searchParams)
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



