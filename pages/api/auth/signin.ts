import { PrismaClient } from "@prisma/client";
import { error } from "console";
import { NextApiRequest, NextApiResponse } from "next";
import * as jose from "jose"
import validator from "validator";
import bcrypt from "bcrypt" 

import { setCookie } from "cookies-next";


const prisma = new PrismaClient()

export default async function handler(req:NextApiRequest,res:NextApiResponse){

    if(req.method === "POST"){

        const errors:string[] = []

        const {email,password} = req.body

        const validationSchema = [
            {
                valid:validator.isEmail(email),
                errorMessage:"Email is invalid"

            },

            {
                valid:validator.isLength(password,{min:1}),
                errorMessage:"Password is invalid"

            },
            


        ]
        validationSchema.forEach(check =>{
            if(!check.valid){
                errors.push(check.errorMessage)
            }
        })

        if(errors.length){
            return res.status(400).json({errorMessage:errors[0]})
        }


        const userWithEmail = await prisma.user.findUnique({
            where: {
                email,
            }
        })

        if(!userWithEmail){
            return res.status(401).json({errorMessage:"Email or Password invalid"})
        }

        const isMatch = await bcrypt.compare(password, userWithEmail.password)

        if(!isMatch){
            return res.status(401).json({errorMessage:"Email or Password invalid"})
        }
        const alg = "HS256"
      const secret = new TextEncoder().encode(process.env.JWT_SECRET)

      

      const token = await new jose.SignJWT({email:userWithEmail.email}).setProtectedHeader({alg}).setExpirationTime("24h").sign(secret)

      setCookie("jwt",token,{req,res,maxAge:60 * 6 * 24}) 

        return res.status(200).json({
        firstName:userWithEmail.first_name,
        lastName:userWithEmail.last_name,
        email:userWithEmail.email,
        city:userWithEmail.city,
        phone:userWithEmail.phone

})
    }

    return res.status(404).json("Unknown endpoint ")

}