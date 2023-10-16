import React, { useContext, useReducer, useEffect, useState } from "react";
import { Avatar, Button, Menu, MenuHandler, MenuItem, MenuList } from "@material-tailwind/react";
import smile from "../../assets/smile.png";
import { FcLike } from "react-icons/fc";
import { BiCommentDetail } from "react-icons/bi";
import { AuthContext } from "../AppContext/AppContext";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
//import {AiOutlineHeart} from "react-icons/ai"
import {
  PostReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import CommentSection from "./commentSection";

 const PostCard = ({ uid, id, logo, name, email, text, image, timestamp }) => {
const { user } = useContext(AuthContext);
   const [state, dispatch] = useReducer(PostReducer, postsStates);
  const likesRef = doc(collection(db, "posts", id, "likes"));
  const likesCollection = collection(db, "posts", id, "likes");
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const [open, setOpen] = useState(false);
  const singlePostDocument = doc(db, "posts", id);
  
 const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  
  const addUser = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].ref;
      await updateDoc(data, {
        friends: arrayUnion({
          id: uid,
          image: logo,
          name: name,
        }),
     });
  } 
     catch(err){
       alert(err.message);
         console.log(err.message);
    }
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const q = query(likesCollection, where("id", "==", user?.uid));
    const querySnapshot = await getDocs(q);
    const likesDocId = await querySnapshot?.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteId = doc(db, "posts", id, "likes", likesDocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, {
          id: user?.uid,
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
   const deletePost = async (e) => {
    e.preventDefault();    try {
      if (user?.uid === uid) {
        await deleteDoc(singlePostDocument);
      } else {
       alert("you can't delete other users posts...");
      }
    }
  catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };
  useEffect(() => {
    const getLikes = async () => {
      try {
        const q = collection(db, "posts", id, "likes");
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_LIKE,
            likes: doc.docs.map((item) => item.data()),
          });
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };
    return () => getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR]);

  return (
    <div className="mb-2">
      <div className="flex flex-col  py-4 bg-gray-100 rounded-t-3xl">
        <div className="flex  justify-start items-center pb-4  ml-12 pl-4">
          <Avatar
            size="xs"
            variant="circular"
            src={logo || smile}
            alt="smile"
          ></Avatar>
          <div className="flex flex-col ml-4">
            <p className="py-2 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              {name}
            </p>
            <p className="font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
              Published:{timestamp}
            </p>
          </div>
          {user?.uid !== uid && (
            <div onClick={addUser} className="w-full flex cursor-pointer ">
              {" "}
              <AiOutlineUserAdd
                size={42}
                className="hover:bg-blue-100 rounded-xl pl-3"
              />
            </div>
          )}
        </div>
    
      <div className ="w-full flex justify-end cursor-pointer absolute"> 
          <Menu>
            <MenuHandler>
             <Button>
              <CiMenuKebab
         size={28}
         color="black"
         className="hover:bg-gray-300 rounded-xl top-7 right-0 cursor-pointer"
          />
       </Button>
          </MenuHandler>
            <MenuList>
              <MenuItem className="hover:bg-gray-300 cursor-pointer font-semibold text-lg">Activity</MenuItem>
              <MenuItem className="hover:bg-gray-300 cursor-pointer font-semibold text-lg">Stories</MenuItem>
              <MenuItem className="hover:bg-gray-300 cursor-pointer font-semibold text-lg" onClick={deletePost}>Delete Post</MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div>
          <p className="ml-16 pb-4 font-roboto font-medium text-sm text-gray-700 no-underline tracking-normal leading-none">
            {text}
          </p>
          {image && (
            <img className="h-[350px] w-full" src={image} alt="postImage"></img>
          )}
        </div>
        <div className=" flex justify-around items-center pt-4 ">
          <div className=" flex items-center">
            <div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-300 mx-10">
              <FcLike className="h-8 mr-4" size={25} onClick={handleLike} />
              {state.likes?.length > 0 && state?.likes?.length}
            </div>
            <div className="flex items-center cursor-pointer  rounded-lg p-2 hover:bg-gray-300 mx-10">
              <BiCommentDetail
                className="h-8 mr-4"
                size={25}
               onClick={handleOpen}
              />
            </div>
            {/*<div className="flex items-center cursor-pointer rounded-lg p-2 hover:bg-gray-300 mx-10">
              <AiFillDelete
                className="h-8 mr-4"
                onClick={deletePost}
                size={25}
              />
          </div>*/}
          </div>
        </div>
      </div>
      {open && <CommentSection postId={id}></CommentSection>}
    </div>
  );
};
export default PostCard;
