import { useEffect } from "react";
import { db } from "../Firebase";
import { collection,getDocs} from "firebase/firestore"; 
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addWhislistMovies } from "../../Redux/movieSlice";


const useGetWhislist = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
   const isAuth = useSelector((store)=>store.auth.isAuth)
   const uid = useSelector((store)=>store.auth.uid)

     useEffect(() => {
         if (isAuth === null) {
           const intendedUrl = location.pathname + location.search;
           localStorage.setItem("redirectAfterLogin", intendedUrl);
           navigate("/login");
         } 
       }, [isAuth]);

    useEffect(()=>{
        if(uid ===  null) return;
        getData(uid)
    },[uid])

    async function getData(uid){
      console.log("wishlist");
      
        const whislistRef = collection(db,`users/${uid}/profiles/p1/whislist`)
        const data = await getDocs(whislistRef)
        const arr = []
        data.forEach((movie)=>{
           arr.push(movie.data())  
        })
        dispatch(addWhislistMovies(arr))
    }
}

export default useGetWhislist
