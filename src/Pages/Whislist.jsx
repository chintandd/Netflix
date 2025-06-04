import { useSelector } from 'react-redux'
import MoviesListLong from "../Components/MovieListLong/MoviesListLong";
import Header from "../Components/Header";
import useGetWhislist from '../APIs/useGetWhislist';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Whislist = () => {

  const isAuth  = useSelector((store)=>store.auth.isAuth)
  const navigate = useNavigate()

  useEffect(() => {
        if (isAuth === false) {
          const intendedUrl = location.pathname + location.search;
          localStorage.setItem("redirectAfterLogin", intendedUrl);
          navigate("/login");
        } 
        
      }, [isAuth]);

    const whishlistMovies = useSelector((store)=>store.movie.whishlistMovies)
    

  useGetWhislist()
  return (
    <div className=' bg-[linear-gradient(rgba(0,0,0,0.94),rgba(0,0,0,1)),url("/assets/filterBG.webp")] min-h-screen max-w-screen font-[my-font-Rg] text-white pb-8 flex flex-col gap-5 md:gap-7 lg:gap-10'>
      <Header/>
      {/* <h1 className='text-center text-3xl font-[my-font-Bd] underline underline-offset-6 decoration-2 decoration-[#D9232E]'>Wishlist Movies</h1> */}
      {whishlistMovies.length == 0 && <div className='flex-1 min-h-0 mx-auto w-[96vw] md:w-[80vw] lg:w-[72vw] xl:w-[65vw] lg:pt-10 xl:pt-15 bg-[#161616] rounded-xl flex items-center justify-center'>
         <h1 className='text-center text-2xl font-[my-font-Md] '> No Favourties ! </h1>
      </div>}
      <MoviesListLong title={"Wishlist Movies"} movies={whishlistMovies}/>
    </div>
  )
}

export default Whislist
