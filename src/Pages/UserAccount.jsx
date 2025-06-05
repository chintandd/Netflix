import Netflix_Logo from "/assets/Netflix_Logo.png";
import { User } from 'lucide-react';
import { Mail } from 'lucide-react';
import { LockKeyhole } from 'lucide-react';
import { Link } from "react-router-dom";
import { MoveLeft } from 'lucide-react';
import LoaderScreen from "../utils/LoaderScreen";
import useUserAccount from "../APIs/useUserAccount";
import { useEffect, useState } from "react";
import { updateProfile,updatePassword,deleteUser,reauthenticateWithCredential,EmailAuthProvider} from "firebase/auth";
import { auth } from "../Firebase";
// import { ToastContainer,toast, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ArrowLeftFromLine } from 'lucide-react';
import toast,{ Toaster } from "react-hot-toast";

const UserAccount = () => {
   const [name,setName] = useState("") 
   const [image,setImage] = useState(null)
   const [password,setPassword] = useState("")
   const [imageUploading,setImageUploading] = useState(false)
   const [passwordError,setPasswordError] = useState(false)
   const [passwordExpand,setPasswordExpand] = useState(false)
   const navigate = useNavigate()
   let user = useUserAccount()
  
  

 useEffect(()=>{
  console.log(user);

  if(user == "No User"){
      navigate("/login");
    
  }else if(user){
    setName(user?.name || "")
      // const intendedUrl = location.pathname + location.search;
      // localStorage.setItem("redirectAfterLogin", intendedUrl);
      
  }
 },[user])



 function handleChange(e){
  const file  = e.target.files[0]
  if(file){
    const ImageUrl = URL.createObjectURL(file)
    setImageUploading(true)
   toast.promise(
  uploadImageCloundary(file),
   {
     loading: 'Uploading...',
     success: <b>Image Uploaded !</b>,
     error: <b>Upload failed !</b>,
   }
 );
  }
 }


 function handlePassword(){
  const passwordREGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
  return passwordREGEX;
 }


// upload image to cloundary and get url

async function uploadImageCloundary(file){
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "profile_preset"); 

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/dwurtjdmt/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const json = await data.json();
    setImageUploading(false)
    setImage(json.secure_url)
    
}



async function updateProfilePassword(){
  const user = auth.currentUser;
  await updatePassword(user, password)
  console.log("passwod updated");
  
}

// upload updated profile to firebase

async function updateProfileFirebase(){
  if(passwordExpand){
      updateProfilePassword()
  }
  updateProfile(auth.currentUser, {
    displayName: name, photoURL: image
  }).then(() => {
        toast.success('Account Updated !')
        setTimeout(()=>{
          navigate("/home")
        },1500)
  
  }).catch(() => {
  })
}

// update(save) profile

function handleSave(){
 if(!passwordExpand){
  updateProfileFirebase()
 }
 else{
  const isValid = handlePassword()
  setPasswordError(!isValid)
    if(!isValid){
      return
    }
    else{

      updateProfileFirebase()
    }
 }
}

// delete a profile

function handleDelete(){
  deleteProfile()
}

async function deleteProfile(){
    const password = prompt("Enter Your Password To Confirm ")
    const credential = EmailAuthProvider.credential(auth.currentUser.email,password);

    reauthenticateWithCredential(auth.currentUser, credential).then(()=>{
       deleteUser(auth.currentUser).then(()=>{
              toast.error('Account Deleted !')


           setTimeout(()=>{
          navigate("/")
        },1000)
   })
    }).catch(()=>{
        toast.error('Password not match !')

    })
   

       

       
}



  if(!user) return <LoaderScreen/>

  return (
    <div className='h-screen max-w-screen flex justify-center items-center bg-black text-white font-[my-font-Rg]'>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontSize: '1.1rem',    
            padding: '16px 20px',  
            minWidth: '300px',    
          },
        }}
      />
              <div className=" h-screen xl:w-[40vw] lg:w-[55vw] md:w-[70vw] w-[92vw] flex justify-center items-center relative">
              <div className="absolute top-10 left-2 cursor-pointer  active:text-[#D9232E] ">
                <Link to={"/home"} ><MoveLeft className="h-8 w-8 hover:scale-110  hover:text-[#D9232E] md:ease-in md:duration-100"/></Link>
              </div>
                 <div className='bg-[#161616] rounded-2xl w-full flex flex-col items-center px-4 md:px-10 lg:px-15 gap-10 py-8'>
          <h1 className='text-2xl md:text-3xl lg:text-4xl font-[my-font-Bd] underline underline-offset-4  decoration-[#D9232E]'>My Account</h1>
          <div className='user-details bg w-full flex flex-col gap-5 md:gap-10'>
             <div className="profile-box flex flex-col w-full gap-1.5 ">
              <span className='text-sm md:text-base lg:text-lg font-[my-font-Md] pb-1.5'>Profile Photo</span>
              <div className='w-full h-17 md:h-20 lg:h-24  flex items-center gap-5 md:gap-10 lg:gap-15'>
                <div className='preview-image h-[100%]  aspect-square rounded-lg'>
                  {image ?  <img className='h-full w-full object-cover object-center rounded-lg' src={image} alt="profile" /> :  <img className='h-full w-full object-cover object-center rounded-lg' src={user.photo} alt="profile" />}
                </div>
                <label htmlFor="profilePic" className='px-4 py-2 text-xs md:text-sm  bg-[#D9232E] rounded-lg cursor-pointer font-[my-font-Md]'>{imageUploading ? "Uploading ..." : "Choose Profile"}</label>
                <input type="file" className='hidden' accept="image/*" id="profilePic" onChange={handleChange} />
              </div>
            </div>
            <div className="detail-box flex flex-col w-full gap-1.5">
              <span className='text-sm md:text-base lg:text-lg font-[my-font-Md]'>Name</span>
              <div className='h-12 w-full flex items-center gap-2 border-1 border-[#ffffff42] rounded-lg px-3'>
                  <User className="h-[80%] aspect-square " />
                 <input type="text" className='h-full w-full text-sm md:text-base lg:text-lg  outline-none rounded-lg pl-2' value={name} onChange={(e)=>setName(e.target.value)}  />
              </div>
            </div>
           <div className="detail-box flex flex-col w-full gap-1.5">
              <span className='text-sm md:text-base lg:text-lg font-[my-font-Md]'>Email</span>
              <div className='h-12 w-full flex items-center gap-2 border-1 border-[#ffffff42] bg-[#ffffff11] rounded-lg px-3'>
                  <Mail className="h-[80%] aspect-square " />
                 <input disabled={true} type="text" className='h-full w-full text-sm md:text-base lg:text-lg  outline-none rounded-lg pl-2' value={user.email} />
              </div>
            </div>
            
          <div className="detail-box flex  w-full gap-3 h-12">
            <button onClick={()=>setPasswordExpand(!passwordExpand)} className='font-[my-font-Bd] text-xs md:text-sm  h-full px-3 whitespace-nowrap  cursor-pointer  rounded-lg bg-[#fff] text-black w-fit'><span className="sm:hidden">{passwordExpand ? <ArrowLeftFromLine className="h-5 w-5 rotate-180"/>:'Change Password ?'}</span> <span className="hidden sm:block">Change Password ?</span></button>
              <div className={`flex flex-col min-h-full gap-0.5 opacity-0 ease-in duration-100 ${passwordExpand && 'opacity-100'}`}>
                <div className='min-h-full w-full flex items-center gap-2 border-1 border-[#ffffff42] rounded-lg px-3'>
                  <LockKeyhole className="h-[80%] aspect-square " />
                 <input type="text" className='h-full w-full text-sm md:text-base lg:text-lg  outline-none rounded-lg pl-2' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="New Password" />
                </div>
                {passwordError &&  <span className="text-xs md:text-sm text-[#D9232E]">Password not valid !</span>}
              </div>
             
            </div>
            <div className="flex items-center gap-5 h-10">
            <button onClick={handleSave} disabled={imageUploading == true} className='font-[my-font-Bd] text-sm md:text-base h-full px-6  cursor-pointer  rounded-lg bg-[#fff] text-black w-fit active:text-white active:bg-black'>Save</button>
            <button onClick={handleDelete} className='font-[my-font-Bd] text-sm md:text-base h-full px-3  cursor-pointer  rounded-lg bg-[#D9232E] w-fit'>Delete account</button>
            </div>
          </div>
      </div>
      
              </div>
     
    </div>
  )
}

export default UserAccount
