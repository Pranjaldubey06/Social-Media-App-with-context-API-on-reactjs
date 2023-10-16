import React,{useState} from 'react'
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";


const Reset = () => {
    const [email, setEmail] = useState(""); 
  return (
    <div className="grid grid-cols-1 justify-items-center items-center h-screen">
      <div className="w-96">
        <Typography variant="h6" color="blue-gray" className="pb-4">
          Enter the email address associated with your account and we 'll send
          you a link to reset your password
        </Typography>
        <Input
          name="email"
          type="email"
          lable="Email"
          value={email}
          className='h-9 border-black'
          onChange={(e) => setEmail(e.target.value)}
        ></Input>
        <Button variant="gradient" fullWidth className=" h-8 mt-4 bg-pink-400 hover:bg-pink-300">
          Continue
        </Button>
      </div>
    </div>
    
  )
}

export default Reset
