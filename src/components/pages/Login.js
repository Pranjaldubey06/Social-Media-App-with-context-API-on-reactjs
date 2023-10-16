import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ClipLoader from "react-spinners/ClipLoader";
import { useContext } from "react";
import { AuthContext } from "../AppContext/AppContext";
import { auth, onAuthStateChanged } from "../firebase/firebase";

const Login = () => {
  const { signInWithGoogle, loginWithEmailAndPassword } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }  
    });
  },[navigate]);

  let initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .required("Required")
      .min("6", "Must be at least 6 characters long")
      .matches(/^[a-zA-Z]+$/, "Password can only contain letters"),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      loginWithEmailAndPassword(email,password);
      setLoading(true);
    } else {
      setLoading(false);
      alert("Check your input fields");
    }
    console.log("formik", formik);
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });
  return(  
    <>
      {loading ? (
        <div className="grid grid-cols-1 justify-items-center items-center h-screen">
          <ClipLoader color="#367fd6" size={150} speedMultiplier={0.5} />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-300">
          <div className="w-96 p-6 shadow-black bg-white rounded-md">
            <h1 className=" text-3xl font-bold block text-center">Login</h1>
            <form onSubmit={handleSubmit}>
              <div>
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
                  <p className="text-red-600">{formik.errors.email}</p>
                )}
              </div>
              <div>
                <label for="password" className="block text-base mb-2">
                  Password
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
                  <p className="text-red-600">{formik.errors.password}</p>
                )}
              </div>
              <div className="mt-3 flex  justify-between  items-center">
                <div className="flex">
                  <input className="font-roboto" type="checkbox"></input>

                  <label>Remember Me</label>
                </div>
                <p className="text-indigo-800 font-semibold">
                  Forgot Password?
                </p>
              </div>
              <div className="mt-5">
                <button
                  type="submit"
                  className=" font-roboto border-3 border-pink-400 bg-pink-400 text-white py-1 w-full rounded-lg hover:bg-pink-300"
                >
                  Login
                </button>

                <div>
                  <button
                    varient="gradient"
                    fullWidth
                    className="text-white font-roboto mt-3 mb-4 bg-pink-400 w-full h-10 rounded-lg hover:bg-pink-300"
                    onClick={signInWithGoogle}
                  >
                    Sign In With Google
                  </button>
                  <Link to="/reset">
                    <p className="ml-1 font-bold font-roboto text-sm text-blue-500 text-center">
                      Reset the password
                    </p>
                  </Link>

                  <div className="mt-6 flex font-roboto text-base justify-center">
                    <Link to="/Ragister">
                      <p>Don't have an account?</p>
                      <p className="ml-1 font-roboto text-sm text-blue-500 text-center">
                        Register{" "}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
