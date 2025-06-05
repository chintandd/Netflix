import React, { useEffect, useRef, useState } from "react";
import Netflix_Logo from "/assets/Netflix_Logo.png";
import { CircleX, EyeOff } from "lucide-react";
import HandleError from "../utils/HandleError";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HandleLoginProcess from "../utils/HandleSign_Signup";
import LoaderScreen from "../utils/LoaderScreen";
import { Eye } from 'lucide-react';
import { auth } from "../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import toast,{ Toaster } from "react-hot-toast";

const Login = () => {
  const [searchParams] = useSearchParams();
  const [isSignForm, setIsSignForm] = useState(false);
  const [err, setErr] = useState({});
  const [loading, setLoading] = useState(false);
  const [intializing, setintializing] = useState(true);
  const [showPassword,setShowPassword] = useState(false)
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((store) => store.auth.isAuth);


  const emailFromUrl = searchParams.get("email") || ""


  useEffect(() => {
    if (isAuth === true) {
      // true - user already signed in
      const redirectTo = localStorage.getItem("redirectAfterLogin") || "/home";
      localStorage.removeItem("redirectAfterLogin");
      navigate(redirectTo);
    } else if (isAuth === false) {
      // false - user not sign-in(signed out)
      setintializing(false);
    }
  }, [isAuth]);

  if (intializing || isAuth === null) return <LoaderScreen />; // null - still checking

  function handleForm() {
    const errObj = HandleError(
      !isSignForm && nameRef.current?.value,
      emailRef.current?.value,
      passwordRef.current?.value,
    );
    setErr(errObj);
    const validation = Object.values(errObj).every((value) => value === null);
    if (!validation) return;
    setLoading(true);
    HandleLoginProcess(
      isSignForm,
      setLoading,
      nameRef.current?.value,
      emailRef.current?.value,
      passwordRef.current?.value,
      dispatch,
      navigate,
    );
  }

    function handleForgot(){
      const email = prompt("Enter Email")
       sendPasswordResetEmail(auth, email)
    .then(() => {
        toast.success('Email sent !')
  
    })
    .catch(() => {
     
    });
    }

  function switchForm() {
    setErr({});
    setIsSignForm(!isSignForm);
  }


  return (
    <>
      <div className='min-h-[90vh] max-w-screen bg-black sm:bg-[linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url("/assets/background.jpg")] bg-cover bg-center  bg-gradient-to-b from-black flex flex-col items-center justify-center text-white font-[my-font-rg]'>
       <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
           className:'text-sm md:text-lg p-4 font-[my-font-Rg]',
           style:{
            padding:'1rem'
           }
        }}
      />
        <div className="header absolute top-0 w-full h-16 px-3 md:h-20 lg:h-25 lg:px-[5vw] py-2">
          <img className="h-full" src={Netflix_Logo} alt="netflix-logo" />
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-[85vw] sm:w-[28rem] sm:bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8))] flex flex-col gap-6 sm:px-16 py-10 pb-28"
        >
          <h1 className="text-4xl font-[my-font-Ebd] pb-3">
            {isSignForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignForm && (
            <div className="form-group w-full text-sm md:text-base">
              <div className="h-14 relative w-full flex items-center border-1 border-[#606060] rounded-md">
                <input
                  ref={nameRef}
                  type="text"
                  placeholder=" "
                  className="h-[100%] w-full absolute bottom-0 z-10 pt-4 px-4"
                />
                <label className="absolute w-full px-5 text-[#ffffffc3] z-1 ease duration-100">
                  Enter First Name
                </label>
                
              </div>
              {err.firstname && (
                <p className="text-red-700 text-sm mt-1.5 flex items-center gap-1">
                  <CircleX size={18} /> {err.firstname}
                </p>
              )}
            </div>
          )}
          <div className="form-group w-full  text-base">
            <div className="h-14 relative w-full flex items-center  border-1 border-[#606060] rounded-md">
             
               <input
                ref={emailRef}
                defaultValue={emailFromUrl}
                type="text"
                placeholder=" "
                className="h-[100%] w-full absolute bottom-0 z-10 pt-4 px-4"
              />
              <label className="absolute w-full px-5 text-[#ffffffc3] z-1 ease duration-100 text-sm md:text-base">
                Enter Email
              </label>
             
             
            </div>
            {err.email && (
              <p className="text-red-700 text-sm mt-1.5 flex items-center gap-1">
                <CircleX size={18} /> {err.email}
              </p>
            )}
          </div>

          <div className="form-group w-full text-base">
            <div className="h-14 relative w-full flex items-center border-1 border-[#606060] rounded-md">
              <div className="h-full w-full flex items-center ">
                 <input
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                placeholder=" "
                className="h-[100%] w-full absolute bottom-0 z-10 pt-4 px-4"
              />
              <label className="absolute w-full px-5 text-[#ffffffc3] z-1 ease duration-100 text-sm md:text-base">
                Enter Password
              </label>
              </div>
             
               <div onClick={()=>setShowPassword(prev=>!prev)} className="z-10 h-[43%] mr-4 aspect-square cursor-pointer">
               {showPassword ?  <Eye className="h-full w-full text-[#ffffffd4]"/> : <EyeOff className="h-full w-full text-[#ffffffd4]"/>}
               </div>
            </div>
            {err.password && (
              <p className="text-red-700 text-sm mt-1.5 flex items-center gap-1">
                <CircleX size={18} /> {err.password}
              </p>
            )}
          </div>

          <div
            onClick={handleForm}
            className="h-10 w-full bg-red-600 hover:bg-red-700 ease duration-75 rounded-md flex items justify-center cursor-pointer"
          >
            <button className="font-[my-font-Bd] flex justify-center items-center">
              {loading ? (
                <span className="loader-btn w-5 h-1/2 border-2 border-[#ebebebe8]"></span>
              ) : isSignForm ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </button>
          </div>

          {isSignForm && <p onClick={handleForgot} className="text-center text-sm underline cursor-pointer hover:text-[#ffffffc3]">
            Forgot Password ?
          </p>}
          {/* <div
            onClick={handleCheckBox}
            className="flex gap-3 items-center cursor-pointer"
          >
            <CustomCheckBox checked={checked} />
            <p className="text-sm">Remember Me</p>
          </div> */}

          <div className="text-[#ffffffc3] w-full flex gap-1.5  text-sm md:text-base">
            {isSignForm ? "New to Netflix?" : "Already a User?"}
            <p
              onClick={switchForm}
              className="text-white font-[my-font-Md] hover:underline cursor-pointer"
            >
              {isSignForm ? "Sign Up now" : "Sign In now"}
            </p>
          </div>
        </form>
      </div>
      <div className="footer h-70 max-w-screen bg-[#161616] text-[#ffffffc3] text-md px-[18vw] py-15 flex flex-col gap-5">
        <p>Questions? Call 000-800-919-1743 (Toll-Free)</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-2 text-sm">
          <p className="underline">FAQ</p>
          <p className="underline"> Help Centre</p>
          <p className="underline">Terms of Use </p>
          <p className="underline">FAQ</p>
          <p className="underline"> Help Centre</p>
          <p className="underline">Terms of Use </p>
        </div>
      </div>
    </>
  );
};

export default Login;
