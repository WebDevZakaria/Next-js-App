"use client"

import Image from "next/image"
import errorMascot from "../../public/icons/error.png"

function Error({error}:{error:Error}) {


  return (

    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
        <Image src={errorMascot} alt="error" className="w-56 mb-8" />
        <div className="bg-white px-9 py-14 shadow rounded">
            <h3 className="text-3xl font-bold mx-14"> Well , not found  </h3>
            <p className="text-reg font-bold mx-12 mt-8">
                {error.message}
            </p>
            <p className="mt-6 text-small font-light mx-28"> Error: 400</p>
        </div>
    </div>
  )
}

export default Error
