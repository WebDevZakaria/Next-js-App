import Header from "./components/Header"
import SearchBarSide from "./components/SearchSideBar"
import RestaurantCard from "./components/RestaurantCard"

export default function Search(){

    return (
      <>
    <Header />
    <div className="flex py-4 m-auto w-2/3 justify-between items-start">
      <SearchBarSide />
      <div className="w-5/6">
       <RestaurantCard />
      </div>
    </div>
    </>

    )
}