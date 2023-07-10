import { NextApiRequest, NextApiResponse } from "next";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";
import { table } from "console";

const prisma  = new PrismaClient()

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {slug , day ,time,partySize} = req.query as {
        slug:string;
        day:string;
        time:string;
        partySize:string
    }
    if(!day || !time || !partySize){
        return res.status(400).json({
            errorMessage:"Invalid Data"
        })
    }

    const searchTime = times.find(t => {
        return t.time === time
    })?.searchTimes

    if(!searchTime){

        return res.status(400).json({

            errorMessage:"Invalid Data"       

        })

    }


    const bookings = await prisma.booking.findMany({
        where:{
            booking_time:{
                gte:new Date(`${day}T${searchTime[0]}`),
                lte:new Date(`${day}T${searchTime[searchTime.length-1]}`)
            }
        },

        select: {
            number_of_people:true,
            booking_time:true,
            tables:true

         }
    })

    const bookingTablesObj :{[key:string]:{[key:number]:true} } = {}

    bookings.forEach(booking =>{

        bookingTablesObj[booking.booking_time.toISOString()]  = booking.tables.reduce((obj,table) =>{

            return {
                ...obj,
                [table.table_id]:true
            }
        }

        ,{})

    })
    
const bookingTableObj :{[key:string]:{[key:number]:true}} = {}

   bookings.forEach(booking =>{
    bookingTableObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj,table) =>{
        return {
            ...obj,
            [table.table_id]:true
        }
    },{})
   })


   const restarant = await prisma.restaurant.findUnique(
    {
        where:{
            slug
        },
        select : {
            tables:true,
            open_time:true,
            close_time:true

            }

    }
   )
   if(!restarant){
    return res.status(400).json({
        errorMessage:"Invalid Data"
    })

   }

   const tables = restarant.tables

   const searchTimesWithTables = searchTime.map(searchTime =>{
    return {
        date:new Date(`${day}T${searchTime}`),
        time:searchTime,
        tables
    }
   })



   searchTimesWithTables.forEach(t =>{
    t.tables = t.tables.filter(table =>{     
    if(bookingTablesObj[t.date.toISOString()]){
        if(bookingTablesObj[t.date.toISOString()][table.id ]) return false
    }
    return true
})
   })



   const availabilties = searchTimesWithTables.map(t =>{
    const sumSeats = t.tables.reduce((sum,table) =>{
        return sum + table.seats
    },0)

    return {
        time:t.time,
        available:sumSeats >= parseInt(partySize)
    }
    
   }).filter(availability =>{

  const timeIsAfterOpenningHour = new Date(`${day}T${availability.time}`) >= new Date(`${day}T${restarant.open_time}`)
  const timeBeforeClosingHour =  new Date(`${day}T${availability.time}`) <= new Date(`${day}T${restarant.close_time}`)

  return timeIsAfterOpenningHour && timeBeforeClosingHour

   })

    return res.json ({slug , day ,time,partySize})

}


//vivaan-fine-indian-cuisine-ottawa