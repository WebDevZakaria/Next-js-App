"use client"
import Link from "next/link"
import LoginModal from "./LoginModal"
import { useContext } from "react"
import { AuthenticationssContext } from "../context/AuthContext"
import useAuth from "../../hooks/useAuth"



export default function NavBar(){

  const {data,loading } = useContext(AuthenticationssContext)
  const {signout} = useAuth()

    return (
        <nav className="bg-white p-2 flex justify-between">
        <Link href="" className="font-bold text-gray-700 text-2xl"> OpenTable </Link>
        <div>
          {loading ? null :(
            <div className="flex">
            {data ? <button className="bg-blue-400 text-white" onClick = {signout}> Signout</button>
            :
            <>
            <LoginModal isSignin = {true} />
            <LoginModal isSignin = {false} />
            </>
            }

            
          </div>
          )}
          
        </div>
      </nav>
    )
}