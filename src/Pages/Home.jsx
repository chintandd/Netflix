import Header from "../Components/Header";
import HeroContent from "../Components/HeroContent";
import HeroVideo from "../Components/HeroVideo";
import AllCards from "../Components/AllCards";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useHeroMovie from "../APIs/useHeroMovie";
import usePopularMovies from "../APIs/usePopularMovies";
import useTrendingMovies from "../APIs/useTrendingMovies";
import useUpcomingMovies from "../APIs/useUpcomingMovies";
import useCategoryMovies from "../APIs/useCategoryMovies";
import { heroMovieId } from "../utils/Constants";
import LoaderScreen from "../utils/LoaderScreen";
import useGetWhislist from "../APIs/useGetWhislist";

const Home = () => {
  const navigate = useNavigate();

  const isAuth = useSelector((store) => {
    return store.auth.isAuth;
  });


  const heroVideo = useSelector((store) => store.movie.heroMovie);
  const popularMovies = useSelector((store) => store.movie.popularMovies);
  const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);
  const trendingMovies = useSelector((store) => store.movie.trendingMovies);
  const categoryMovies = useSelector((store) => store.movie.categoryMovies);

  useHeroMovie(heroMovieId);
  usePopularMovies();
  useUpcomingMovies();
  useTrendingMovies();
  useCategoryMovies();
  useGetWhislist()

  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  if(heroVideo.trailer == null){
    return <LoaderScreen/>
  }

  return (
    <>
    <div className="home min-h-screen max-w-screen bg-black flex flex-col font-[my-font-Rg] z-10 relative pb-20 overflow-hidden">
      <HeroVideo trailer={heroVideo.trailer} />
      <div className="min-h-screen max-w-screen  flex flex-col z-5">
        <Header />
        <HeroContent trailerDetails={heroVideo} />
        <AllCards
          popularMovies={popularMovies}
          upcomingMovies={upcomingMovies}
          trendingMovies={trendingMovies}
          categoryMovies={categoryMovies}
        />
        
      </div>
    </div>
    </>
  );
};

export default Home;
