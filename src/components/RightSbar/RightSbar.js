import React, { useState, useContext } from "react";
import rightpic from "../../assets/rightpic.jpg";
import { AuthContext } from "../AppContext/AppContext";
import { Link } from "react-router-dom";
import { Avatar } from "@material-tailwind/react";
import  smile  from "../../assets/smile.png";
import { AiFillDelete } from "react-icons/ai";
import {
 collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  arrayRemove
} from "firebase/firestore";
import { db } from "../firebase/firebase";
  const RightSbar = () => {
  const [input, setInput] = useState("");
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;
  const searchFriends = (data) => {
    return data.filter((item) =>
      item["name"].toLowerCase().includes(input.toLowerCase())
    );
  };

  const removeFriend =  async(id,name,image)=>{
    const q  =query(collection(db,"users"),where("uid","==",user?.uid))
    const getDoc=await getDocs(q);
    const userDocumentId =getDoc.docs[0].id;

    await updateDoc(doc(db,"users",userDocumentId),{
      friends:arrayRemove({id:id,name:name,image:image})
    })
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100 shadow-lg border-2 rounded-l-xl">
      <div className="flex flex-col items-center relative pt-10">
        <img className="h-40 w-25 rounded-md" src={rightpic} alt="nature"></img>
      </div>
      <p className="font-roboto font-normal text-sm text-gray no-underline tracking-normal leading-tight py-2 mx-2 pl-5 pr-3">
        Nature is regarded as the mother who deliver everything good to us,it is
        always a pleasure meeting with nature....
      </p>
      <div className="mx-2 mt-10">
        <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none pl-4">
          Friends:{" "}
        </p>
        <input
          className="border-0 outline-none pl-4"
          name="input"
          value={input}
          type="text"
          placeholder="Search friends"
          onChange={(e) => setInput(e.target.value)}
        ></input>
        {friendList?.length > 0 ? (
          searchFriends(friendList)?.map((friend) => {
            return (
              <div
                className="flex items-center justify-between hover:bg-gray-100 duration-300 ease-in-out"
                key={friend.id}
              >
                <Link to={`/profile/${friend.id}`}>
                  <div className="flex items-center my-2 cursor-pointer">
                    <div className="flex items-center">
                      <Avatar
                        size="sm"
                        variant="circular"
                        src={friend?.image || smile}
                        alt="smile"
                      ></Avatar>
                      <p className="ml-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normla leading-none">
                        {friend.name}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="mr-4">
                  <AiFillDelete className="cursor-pointer" onClick={ ()=> removeFriend(friend.id,friend.name,friend.image)} />
                </div>
              </div>
            );
          })
        ) : (
          <p className="mt-10 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            Add friend to check thier  profile{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default RightSbar;
