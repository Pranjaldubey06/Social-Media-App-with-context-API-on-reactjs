import React, {
  useRef,
  useContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import smile from "../../assets/smile.png";
import { BiImageAdd, BiMessageRoundedDetail } from "react-icons/bi";
import { RiLiveFill } from "react-icons/ri";
import { AuthContext } from "../AppContext/AppContext";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import {
  PostReducer,
  postActions,
  postsStates,
} from "../AppContext/PostReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
//import { progress } from "@material-tailwind/react";
import { Alert } from "@material-tailwind/react";
import PostCard from "./PostCard"

const MainSection = () => {
  const { user, userData } = useContext(AuthContext);
  const [state, dispatch] = useReducer(PostReducer, postsStates);
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      } 
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };
  const storage = getStorage();
  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };
  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
   console.log("file", file);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `image/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );

        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };
  useEffect(() => {
    const postData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      await onSnapshot(q, (doc) => {
        dispatch({
          type: SUBMIT_POST,
          posts: doc?.docs?.map((item) => item?.data()),
        });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
    };
    return () => postData();
  }, [SUBMIT_POST]);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4 w-full bg-hite rounded-3xl shadow-lg">
        <div className="flex items-center border-b-2 border-gray-300 pb-4 pl-4 w-full">
          <img className="h-7" src={user?.photoURL || smile} alt="view"></img>
           <form className="w-full" onSubmit={handleSubmitPost}>
             <div className="flex justify-between items-center">
               <div className="w-full ml-4">
                 <input
                   placeholder={`What's On Your Mind ${
                     user?.displayName?.split(" ")[0] ||
                     userData?.name?.charAt(0).toUpperCase() +
                       userData?.name?.slice(1)
                  }`}
                  type="text"
                  name="text"
                  className="outline-none w-full bg-white rounded-md"
                  ref={text}
                ></input>
              </div>
              <div className="mx-4">
                {image && (
                  <img
                    className="h-24 rounded-xl"
                    src={image}
                    alt="previewImage"
                  ></img>
                )}
              </div>
              <div className="mr-4">
              <button className="bg-blue-300 text-lg font-semibold outline-double rounded-xl" variant="text" type="submit">
                  Share
                </button>
              
              </div>
            </div>
          </form>
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className="bg-blue-700 py-1 rounded-md"
        >
          {/*put progress bar*/}
        </span>
        <div className="flex justify-around items-center pt-4">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="cursor-pointer flex items-center"
            >
              <BiImageAdd className="" size={25} />
              <input
                id="addImage"
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
              ></input>
            </label>
            {file && (
              <button
                className=" text-lg font-semi-bold bg-blue-300"
                variant="text"
                onClick={submitImage}
              >
                Upload
              </button>
            )}
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none"></p>
          </div>
          <div className="flex items-center ">
            <RiLiveFill className="cursor-pointer" size={25} />
            <p className="font-roboto font-medium text-md text-gray-700 no-underline tracking-normal leading-none"></p>
          </div>
          <div className="flex items-center">
            <BiMessageRoundedDetail className="cursor-pointer" size={25} />
            <p
              className="font-roboto font-medium text-md text-gray-700 no-underline traacking-normal leading-none"
              size={32}
            ></p>
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 w-full">
        {" "}
        {state.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">
              Something went wrong refresh and try again...
            </Alert>
          </div>
        ) : (
          <div>
            {state.posts.length > 0 &&
              state?.posts?.map((post, index) => {
                return (
                  <PostCard
                    key={index}
                    logo={post.logo}
                    id={post?.documentId}
                    uid={post?.uid}
                    name={post.name}
                    image={post.image}
                    email={post.email}
                    text={post.text}
                    timestamp={new Date(
                    post?.timestamp?.toDate()
                    )?.toUTCString()}
                  ></PostCard>
                );
              })}
          </div>
        )}
      </div>
      <div ref={scrollRef}>{/*Refrence for letter*/}</div>
    </div>
  );
};

export default MainSection;
