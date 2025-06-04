import { useEffect, useState } from "react";
import { auth } from "../Firebase";
import { useSelector } from "react-redux";

const useUserAccount = () => {

    const isAuth = useSelector((store)=>store.auth.isAuth)
    const [user,setUser]=useState(null)

useEffect(()=>{
    
    if(!isAuth && isAuth == null) return
    const user =  auth.currentUser;
    
    if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
        setUser({name:displayName,email:email,photo:photoURL})
        
    }
    else{
        setUser("No User")
        
    }
    

},[isAuth])

    return user;
}

export default useUserAccount
