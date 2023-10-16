import React from 'react'
import Navbar from '../Navbar/navbar';
import LeftSide from '../LeftSidebar/LeftSide';
import RightSbar from '../RightSbar/RightSbar';
import CardSection from"../../components/mainPart/CardSection";
import MainSection from "../../components/mainPart/MainSection";

const Home = () => {
  return (
   <div className='w-full'>
    <div className='fixed top-0 z-10 w-full bg-white'>
    <Navbar></Navbar>
      </div>
      <div className='flex bg-gray-100 '>
      <div className='flex-auto w-[18%] fixed top-16'>
      <LeftSide></LeftSide>
      </div>
      <div className ='flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl'>
      <CardSection></CardSection>
      <MainSection></MainSection>
      
      </div>
      <div className='flex-auto w-[18%] fixed right-2 top-14'>
       <RightSbar></RightSbar>
      </div>
     </div>
   </div>
 )
}
export default Home;
