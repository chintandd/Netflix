import { Triangle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HumBurgurMenu = ({expand,setMenuExpand}) => {

  function handleClick(){
    let body = document.querySelector('body')
     body.classList.remove('h-screen','max-h-screen','overflow-hidden')  
    setMenuExpand(prev=>!prev)
  }

  const [comingSoon,setComingSoon] = useState(false)
  return (
    <div className={`min-h-dvh max-h-dvh w-screen bg-black  fixed ${expand ? 'bottom-0 md:bottom-full' : 'bottom-full'} z-50 py-4 px-3 md:px-15 flex flex-col font-[my-font-Rg] text-white ease-in duration-200 `}>
            <div className="h-20 ">
                  <div onClick={()=>handleClick()}  className="h-7/12 sm:h-9/12 md:h-10/12 2xl:h-12/12 flex md:hidden items-center cursor-pointer">
                          <X className={`h-full aspect-square ${!expand && 'rotate-180'} ease-in duration-200`}/>
                  </div>
            </div> 
            <div className='pt-10 flex flex-col gap-10 items-center  flex-1 min-h-0  text-xl tracking-widest  '>
                <Link onClick={()=>handleClick()} to={'/home'}><p>Home</p></Link>

                <div onClick={()=>setComingSoon(prev => !prev)} className='relative'>TV Shows
                  <div className={`absolute  h-10 opacity-0 ${comingSoon && 'opacity-100'} pointer-events-none group-hover:opacity-100 ease-in duration-100 w-fit  top-1/2 -translate-y-1/2 left-[160%] text-xs rounded-md`}>
                    <Triangle className="fill-[#2D2D2D]  h-full rotate-270 aspect-square text-[#2D2D2D] absolute right-8 top-1/2 -translate-y-1/2"/>
                    <p className="absolute h-full px-4  flex items-center text-center leading-relaxed  justify-center bg-[#2D2D2D] left-1/2 -translate-x-1/2 rounded-md">Coming Soon !</p>
                 </div>
                </div>

                <Link onClick={()=>handleClick()} to={'/movies'}><p>All Movies</p></Link>
                <Link onClick={()=>handleClick} to={`/whislist`}> <p>Wishlist</p></Link>
                
            </div>
         </div>
  )
}

export default HumBurgurMenu
