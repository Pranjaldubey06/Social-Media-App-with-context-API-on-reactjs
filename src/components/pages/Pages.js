import React from 'react';
import Home from "./Home";
import{Routes,Route} from "react-router-dom"
import Login from './Login';
import Ragister from './Ragister';
import Reset from './Reset'
import FriendProfile from '../pages/FriendProfile';
const Pages = () => {
  return (
  <div>
    <Routes>
      <Route path="/"element={<Home></Home>}></Route>
      <Route path="/login"element={<Login></Login>}> </Route>
      <Route path="/Ragister" element={<Ragister></Ragister>}></Route>
      <Route path="/Reset" element={<Reset></Reset>}></Route>
   <Route path="/profile/:id"
   element={<FriendProfile></FriendProfile>}></Route>
  </Routes>
  </div>
  )
}
export default Pages
