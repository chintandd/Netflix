import { auth } from "../Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { setUser } from "../../Redux/authSlice";
import { toast, Slide } from "react-toastify";
import profile from "/assets/profile.jpg"

export default function HandleLoginProcess(
  isSignForm,
  setLoading,
  name,
  email,
  password,
  dispatch,
  navigate,
) {


  if (isSignForm) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Wrong Email or Password !", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      });
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: profile,
        })
          .then(() => {
            const currentUser = auth.currentUser;
            dispatch(
              setUser({
                name: currentUser.displayName,
                photoUrl: currentUser.photoURL,
                email: currentUser.email,
                uid:currentUser.uid
              }),
            );
            navigate("/home");
          })
          .catch(() => {
            
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error("Email already exists !", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
      });
  }
}
