import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
import {useFormik} from "formik"
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader"
import { useContext } from 'react';
import { AuthContext } from '../AppContext/AppContext';
import { auth, onAuthStateChanged } from "../firebase/firebase";

 const Ragister = () => {
  const [loading,setLoading]=useState(false)
  const {registerWithEmailAndPassword}=useContext(AuthContext); 
  const navigate = useNavigate();   
    
    useEffect(() => {
      setLoading(true);
      if(auth){
        onAuthStateChanged(auth, (user) => {
          if (user) {
            navigate("/");
            setLoading(false);
          } else {
            setLoading(false);
          }  
        });
      }
     
    },[navigate]);

 let initialValues={
      name:"",
      email:"",
      password:"",
    };
    const validationSchema=Yup.object({
        name:Yup.string().required('Required').min('4','must br at least 4 character'),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string() 
        .required("Required")
        .min("6", "Must be at least 6 characters long")
      .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
        })

const handleRegister =(e)=>{
 e.preventDefault();
    const {name,email,password}=formik.values;
    if( formik.isValid === true){
      registerWithEmailAndPassword(name,email,password);
        setLoading(true);
    }else{
       setLoading(false);
        alert("check your details")
    }
  }
  const formik=useFormik({initialValues,validationSchema,handleRegister});
  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#367fd6" size={150} speedMultiplier={0.5} />
        </div>
      ):(
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <div className="w-96 p-6 shadow-black bg-white rounded-md">
        <h1 className=" text-3xl font-bold block text-center">Ragister</h1>
       <form onSubmit={handleRegister}>
       
        <div className='mb-2'>
        <label for="UserName" className="block text-base mb-2">
              Username:
            </label>
            <input
            name="name"
              type="Username"
              id="Username"
              className="border w-full text-base px-2 py-1 focus:ring-0 focus:border-black"
              placeholder="Enter Your Name..."
              size="lg"
              {...formik.getFieldProps("name")}
             />
        </div>
        <div>
        {formik.touched.name && formik.errors.name && (
              <p className="text-red-600">
                {formik.errors.name}
              </p> 
        )}
        </div>
    
        <div className='mt-4 mb-2' >
        <label for="Email" className="block text-base mb-2">
              Email id:
            </label>
            <input
              type="Email"
              id="Email"
              className="border w-full text-base px-2 py-1 focus:ring-0 focus:border-black"
              placeholder="Enter Email..."
              size="lg"
              {...formik.getFieldProps("email")}
             />
          </div>
          <div>
        {formik.touched.email && formik.errors.email && (
              <p className="text-red-600">
                {formik.errors.email}
              </p> 
        )}
        </div>
          <div className='mt-4 mb-2'>
            <label for="password" className="block text-base mb-2">
              Password:
            </label>
            <input
              type="password"
              id="password"
              className="border w-full text-base px-2 py-1 focus:ring-0 focus:border-black"
              placeholder="Enter Password..."
              size="lg"
              {...formik.getFieldProps("password")}
             
            />
            </div>
            <div>
        {formik.touched.password && formik.errors.password && (
              <p className="text-red-600">
                {formik.errors.password}
              </p> 
        )}
        </div>
            <div>
            <button
              type="submit"
              className="mt-6 font-roboto border-3 border-pink-400 bg-pink-400 text-white py-1 w-full rounded-lg hover:bg-pink-300"
            >
            Create Account
            </button>
           </div>
           <div className="mt-6 flex font-roboto text-base justify-center">
                <Link to="/login">
                <p>Already Have An Account?</p>
                  <p className="ml-1 font-roboto text-sm text-blue-500 text-center">
                   Login
                  </p>
                </Link>
         </div>
          <div>
        </div>
        </form>
        </div>
       </div>
      )}
       </>
       )
 
        }
    
  export default Ragister
