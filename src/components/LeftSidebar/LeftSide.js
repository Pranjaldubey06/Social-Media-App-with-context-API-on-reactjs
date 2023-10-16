import React,{useContext} from "react";
import nature from "../../assets/nature.jpg";
import smile from "../../assets/smile.png";
import {RiShoppingBagFill} from "react-icons/ri"
import {GrLocation} from "react-icons/gr"
import facebook from "../../assets/facebook.png";
import twitt from "../../assets/twitt.png";
import { Tooltip } from "@material-tailwind/react";
import { Avatar } from "@material-tailwind/react";
import { AuthContext } from "../AppContext/AppContext";

const LeftSide=()=>{
 const {user,userData}=useContext(AuthContext);
  return (
    <div className="flex flex-col h-screen bg-gray-100 pb-4 border-2 rounded-r-xl shadow-lg xl-full sm-">
      <div className="flex flex-col items-center relative">
        <img
          className="h-28 w-full rounded-r-xl"
          src={nature}
          alt="nature"
        ></img>
        <div className="absolute-bottom-2">
          <Tooltip content="Profile" placement="top">
            <Avatar className="-m-1" src={user?.photoURL||smile} size={14} alt="avatar"></Avatar>
          </Tooltip>
        </div>
      </div>
      <div className="flex flex-col items-center pt-1">
        <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none ">
        {user?.email || userData?.email}
        </p>
        <p className="font-roboto font-medium text-xs text-gray-700 no-underline tracking-normal leading-none ">
          Access exclusive tools & insights
        </p>
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none ">
          Try Premium for free
        </p>
      </div>
      <div className="flex flex-col pl-1 pt-6">
        <div className="flex items-center pb-4">
       <GrLocation className="h-12"/>
          
          <p className="font-roboto font-semibold text-lg no-underline tracking-normal leading-none">
            Indore
          </p>
        </div>
        <div className="flex items-center  ">
          <br></br>
          <RiShoppingBagFill className="h-12"/>
          <p className="font-roboto font-semibold text-lg no-underline tracking-normal leading-none">
            React Developer
          </p>
        </div>
         <div className="flex justify-center items-center pt-4">
          <p className="font-roboto font-bold text-md text-pink-600 no-underline tracking-normal leading-none mx-2">
            events
          </p>
          <p className="font-roboto font-bold text-md text-pink-600 no-underline tracking-normal leading-none mx-2">
            Groups
          </p>
          <p className="font-roboto font-bold text-md text-pink-600 no-underline tracking-normal leading-none mx-2">
            Follow
          </p>
          <p className="font-roboto font-bold text-md text-pink-600 no-underline tracking-normal leading-none mx-2">
            More
          </p>
        </div>
      </div>
      <div className="ml-2">
        <p className="font-roboto font-bold text-lg no-underline tracking-normal leading-none py-2 pt-6 pl-2">
          Social Profiles
        </p>
        <div className="lg:flex flex-col h-screen items-center">
          
          <img
            className="h-8 mb-3 mr-2 mt-2 "
            src={facebook}
            alt="facebook"
          ></img>
          <p className="font-roboto font-bold text-md text-transparent bg-clip-text bg-gradient-to-r to-red-700  from-blue-500 no-underline tracking-normal leading-none py-2 ">
              Social Network
            </p>
            
          <div>
            <img
              className=" h-12  mb-3 mr-2 pt-3 ml-10"
              src={twitt}
              alt="twitt"
            ></img>
            <p className="font-roboto font-bold text-md text-transparent bg-clip-text bg-gradient-to-r to-red-700  from-blue-500 no-underline tracking-normal leading-none py-2 ">
              Social Network
            </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
           </div>
        </div>
      </div>
  );
};
export default LeftSide;
