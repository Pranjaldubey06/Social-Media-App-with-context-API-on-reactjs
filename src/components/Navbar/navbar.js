import React from 'react'
import  NavLinks from "./NavLinks";
import UserLinks from "./UserLinks";
import {Link} from "react-router-dom"



const navbar = () => {
  return (
   <div className="flex justify-between items-center border-b border-gray-300 w-full px-5 py-2 ">
    <Link to="/">
        <div className='text-4xl font-extrabold text-gray-900 dark:text-white font-roboto '>
            <span className='text-transparent bg-clip-text bg-gradient-to-r to-pink-600 from-blue-400'>
               Social Media 
            </span>{" "}
           
        </div>
      </Link>
   
     <div className='flex justify-center items-center mx-auto'>
<NavLinks></NavLinks>

     </div>
     <div>
     <UserLinks></UserLinks>
     </div>
    </div>
  )
}

export default navbar
