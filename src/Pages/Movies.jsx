import React, { useEffect, useState } from 'react'
import FilterBar from '../Components/FilterBar'
import MoviesListSM from '../Components/MovieListSmall/MovieListSM'
import useAllMovies from '../APIs/useAllMovies'
import Pagination from '../Components/Pagination'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import Header from '../Components/Header'


const Movies = () => {

    const [pageCount,setPageCount] = useState(1)
    const maxPage = useSelector((store)=>store.movie.totalPage)
    const isAuth = useSelector((store) => {
    return store.auth.isAuth;
  });

  const navigate = useNavigate()

    useEffect(() => {
      if (!isAuth) {
        const intendedUrl = location.pathname + location.search;
        localStorage.setItem("redirectAfterLogin", intendedUrl);
        navigate("/login");
      } 
    }, [isAuth]);

    function prevButton(){
        if(pageCount == 1) return null;
        setPageCount(pageCount - 1)
    }

    function nextButton(){
      if(pageCount == maxPage) return null;
        setPageCount(pageCount + 1)
    }

    useAllMovies(pageCount)

  return (
    <div className='flex min-h-screen pb-5 items-center w-full bg-[linear-gradient(rgba(0,0,0,0.94),rgba(0,0,0,1)),url("/assets/filterBG.webp")] justify-between flex-col'>
    <div className='flex flex-col items-center'>
        <Header />
      <FilterBar/>
      <MoviesListSM pageNo={pageCount}/>
    </div>
      <div>
        <Pagination pageCount={pageCount} prevButton={prevButton} nextButton={nextButton}/>
      </div>
    </div>
  )
}

export default Movies
