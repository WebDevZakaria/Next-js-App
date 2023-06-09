



interface Props  {
        inputs: {
            firstName:string,
            lastName:string,
            email:string,
            phone:string,
            city:string,
            password:string
          };
          handleChangeIput:(e:React.ChangeEvent<HTMLInputElement>)=>void;

          isSignin:boolean
      }


function AuthIModalnputs({inputs,handleChangeIput,isSignin}:Props) {

  return (

    <div>
        {isSignin ? null :(

            <div className="my-3 flex justify-between text-sm">

            <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="First Name" value={inputs.firstName} onChange={handleChangeIput} name = "firstName" />
            <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="Last Name" value={inputs.lastName} onChange={handleChangeIput} name = "lastName" />

        </div>

        )}
        

        <div className="my-3 flex justify-between text-sm">
        <input type="text" className="border rounded p-2 py-3 w-full" placeholder="Email" value={inputs.email} onChange={handleChangeIput} name = "email" />
        </div>


{isSignin ? null :(
    <div className="my-3 flex justify-between text-sm">

    <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="Phone" value={inputs.phone} onChange={handleChangeIput} name = "phone" />
    <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="City"  value={inputs.city} onChange={handleChangeIput} name = "city"/>
    
    </div>
)}

<div className="my-3 flex justify-between text-sm">

        <input type="password" className="border rounded p-2 py-3 w-full" placeholder="Password" value={inputs.password} onChange={handleChangeIput} name = "password" />

        </div>
    </div>

  )

}

export default AuthIModalnputs
