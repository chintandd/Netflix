import Netflix_Logo from "/assets/Netflix_Logo.png";
import { Bell, ChevronUp, ChevronDown, SquareUser, LogOut } from "lucide-react";
import { useState } from "react";
import { auth } from "../Firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar"; 
import { Menu } from 'lucide-react';
import HumBurgurMenu from "./HumBurgurMenu";
import { useSelector } from "react-redux";
import { Triangle } from 'lucide-react';


const Header = () => {
  const [searchExpand, setSearchExpand] = useState(false);
  const [accountExpand, setAccountExpand] = useState(false);
  const [searchBox, setSearchBox] = useState(null);
  const [menuExpand,setMenuExpand] = useState(false)
  const navigate = useNavigate();
    const photoUrl = useSelector((store) => {
    return store.auth.photoUrl;
  });

  function logOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch(() => {

      });
  }


// When humbuger menu opens no scroll

  function handleMenu(){
    let body = document.querySelector('body')
     body.classList.add('h-screen','max-h-screen','overflow-hidden')  
    setMenuExpand(prev=>!prev)

  }

  return (
    <>
    <HumBurgurMenu expand={menuExpand} setMenuExpand={setMenuExpand}/>
    <div className="w-full h-16 sm:h-20 flex items-center justify-between gap-5 py-2 px-3 text-white md:px-15 z-30 font-[my-font-Rg] ">
      
      <div className="h-7/12 sm:h-9/12 md:h-10/12 2xl:h-12/12 flex items-center gap-3">
        {!searchExpand &&  <div onClick={()=>handleMenu()} className="h-full flex md:hidden items-center cursor-pointer">
                <Menu className="h-full aspect-square"/>
        </div>}
        
        <img
        className="h-full scale-120"
        src={Netflix_Logo}
        alt=""
      />
     
      </div>

      <div className="menu w-full hidden md:flex h-full items-center justify-evenly font-[my-font-Rg] text-lg whitespace-nowrap">
       <Link to={"/home"}> <p className="hidden md:block">Home</p></Link>
        <div className={`hidden md:block relative group cursor-pointer ${searchExpand && "md:hidden lg:block"}`}>
          TV Shows
          <div  className="absolute h-8 opacity-0 pointer-events-none group-hover:opacity-100 ease-in duration-150 w-fit  left-1/2 -translate-x-1/2 top-[120%] text-xs rounded-md">
          <Triangle className="fill-[#2D2D2D] h-full aspect-square text-[#2D2D2D] absolute left-1/2 -translate-x-1/2"/>
          <p className="absolute h-full px-4 top-3 flex items-center justify-center whitespace-nowrap bg-[#2D2D2D] left-1/2 -translate-x-1/2 rounded-md">Coming Soon !</p>
          </div>
        </div>
        <Link to={`/movies`}>
          <p className={`hidden md:block ${searchExpand && "md:hidden lg:block"}`}>
            All Movies
          </p>
        </Link>
        <Link to={`/whislist`}>
          <p className={`hidden xl:block ${searchExpand && "xl:hidden 2xl:block"}`}>
          Wishlist
        </p>
        </Link>
        
      </div>

      <div
        className={`flex h-3/5 items-center ease duration-200 ${
          searchExpand ? "gap-0 sm:gap-6" : "gap-4 sm:gap-6"
        } `}
      >
   
        <SearchBar
          searchExpand={searchExpand}
          setSearchExpand={setSearchExpand}
          searchBox={searchBox}
          setSearchBox={setSearchBox}
        />

        <div className="h-full hidden md:flex items-center cursor-pointer relative group">
          <Bell />
          <div  className="absolute h-8 opacity-0 pointer-events-none group-hover:opacity-100 ease-in duration-150 w-fit  left-1/2 -translate-x-1/2 top-[120%] text-xs rounded-md">
          <Triangle className="fill-[#2D2D2D] h-full aspect-square text-[#2D2D2D] absolute left-1/2 -translate-x-1/2"/>
          <div className="absolute h-full px-4 top-3 flex items-center justify-center whitespace-nowrap bg-[#2D2D2D] left-1/2 -translate-x-1/2 rounded-md">Coming Soon !</div>
          </div>
        </div>
        

        <div className="my-acc h-full relative">
          <div
            className={`h-full items-center gap-2 ${
              searchExpand ? "hidden sm:flex" : "flex"
            }`}
          >
            <div className="aspect-square h-full rounded-md overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={photoUrl}
                alt=""
              />
            </div>
            <div
              onClick={() => setAccountExpand(!accountExpand)}
              className="cursor-pointer"
            >
              {accountExpand ? <ChevronUp /> : <ChevronDown />}
            </div>
            <div
              className={`w-[280%] sm:w-[300%] backdrop-sepia bg-[#000000be] absolute ${
                accountExpand ? "top-[120%] opacity-100" : "opacity-0 hidden -z-1"
              } top-[120%] right-[-10%] sm:right-[-5%] flex flex-col gap-2 items-center p-4 md:p-6 text-sm font-[my-font-md] rounded-xl ease duration-200`}
            >
             <Link to={`/user`} className="w-full"> <div  className="flex gap-3 w-full items-center bg-[#2D2D2D] hover:bg-[#454444da] rounded-lg p-2 cursor-pointer">
                <SquareUser size={20} />
                <p className="text-xs md:text-sm">My Account</p>
              </div></Link>
              <div
                onClick={() => logOut()}
                className="flex gap-3 w-full items-center bg-[#2D2D2D] hover:bg-[#454444da] rounded-lg p-2 cursor-pointer"
              >
                <LogOut size={20} />
                <p className="text-xs md:text-sm">Sign Out</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default Header;
