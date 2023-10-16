import React from 'react'

const Card = ({name,img,status}) => {
  return (
    <div>
    <div className="relative">
        <img
          className="h-72 w-38 rounded-3xl hover:scale-105 duration-700 ease-in-out cursor-pointer shadow-lg"
          src={img}
          alt={name}
        ></img>
        <p className=" absolute bottom-4 left-4 text-sm font-medium text-white font-roboto no-underline leading-none">
          {name}
        </p>
        <p
          className={`${
            status === "Offline"
              ? "absolute text-sm  left-3 bottom-1 font-medium text-red-600 font-roboto no-underline leading-none"
              : "absolute bottom-1 left-3 text-sm font-medium text-green-600 font-roboto no-underline leading-none"
          }`}
        >
          {status}
        </p>
      </div> 
    </div>
  )
}

export default Card;
