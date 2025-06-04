import Nlogo from "/assets/nlogo.png";
import { Play, Heart, Volume2, VolumeOff, Triangle } from "lucide-react";
import PlayImage from "../Components/PlayImage";
import PlayVideo from "../Components/PlayVideo";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWhislist } from "../APIs/useSetWishlist";
import { toggleWhislistMovies } from "../../Redux/movieSlice";
import useGetWhislist from "../APIs/useGetWhislist";

const PlayScreen = ({ data }) => {
  const [isPlay, setIsPlay] = useState(false);
  // const [isMuted,setIsMuted] = useState(true)

  // function handleSound(){
  //     const video = document.getElementById("play-video");
  //     if (video) {
  //     video.muted = !isMuted;
  //     setIsMuted(!isMuted)
  //     }
  // }

  useGetWhislist()

  function handlePlay() {
    setIsPlay(true);
  }
   const dispatch  = useDispatch()
   
    const uid  = useSelector(store => store.auth.uid)
   
     const wishlistMovies = useSelector(store=>store.movie.whishlistMovies)
     const wishlist = wishlistMovies.map(w=>String(w.movieId))
   
       
         async function handleWhislist(movieId,poster,title,year,genres,popularity){
           
         const result =  await setWhislist(uid,movieId,poster,title,year,genres,popularity)
         if(result){
             dispatch(toggleWhislistMovies(result))
           }
           
         }



  return (
    <div
      className={`w-full h-[32vh] md:h-[60vh] lg:h-[70vh] z-10 relative overflow-hidden`}
    >
      {!isPlay && <PlayImage poster={data.poster} />}
      {isPlay && <PlayVideo youtubeKey={data.youtubeKey} />}
      {!isPlay && (
        <div className="w-full h-full flex justify-end flex-col gap-2 px-4 md:px-10 lg:px-15 xl:px-20 relative overflow-hidden">
          <div className=" flex self-end flex-col w-full gap-1 md:gap-3 ">
            <div className="h-5 absolute top-5 left-0 md:h-7 lg:h-10 flex items-center gap-4 px-4 md:px-10 lg:px-15">
              <img className="h-full" src={Nlogo} alt="" />
              <p className="text-sm md:text-xl lg:text-2xl font-[my-font-Bd]">
                MOVIES
              </p>
            </div>
            <div className="h-[100%]  w-auto flex items-end ">
              <picture className="h-1/2 md:h-2/5 xl:h-1/3 w-auto">

        <source media="(max-width:640px)" srcSet={`https://image.tmdb.org/t/p/w185/${data.logo}`}/>
        <source media="(min-width:1280px)" srcSet={`https://image.tmdb.org/t/p/original/${data.logo}`}/>

        <img
                className="h-full w-auto"
                src={`https://image.tmdb.org/t/p/w185/${data.logo}`}
                alt=""
        />

      </picture>
              
            </div>
            <div className="min-h-8   md:min-h-10 lg:min-h-12  w-full mt-4 md:mt-8 lg:mt-15 flex  gap-5 text-black items-center ">
              <div className="h-full w-full flex gap-2 md:gap-4  lg:gap-5 items-center ">
                <div
                  onClick={handlePlay}
                  className="h-full flex items-center  rounded-lg justify-center gap-2 lg:gap-3 w-20 md:w-30 lg:w-45 bg-white rouned-lg cursor-pointer"
                >
                  <Play className="h-4 w-4  lg:h-5 lg:w-5 " fill="black" />
                  <p className="text-sm md:text-xl lg:text-2xl font-[my-font-Bd] cursor-pointer">
                    Play
                  </p>
                </div>
                  <div onClick={()=>handleWhislist(data.movieId,data.poster,data.title,data.year,data.genres,data.popularity)} className=" h-[90%] aspect-square rounded-full flex items-center justify-center border-1 md:border-2 border-white cursor-pointer group relative text-black">
                    <div  className="absolute h-8 opacity-0 pointer-events-none group-hover:opacity-100 ease-in duration-150 w-fit  left-1/2 -translate-x-1/2 bottom-[150%]   bg-amber-500  text-xs rounded-md">
                      <div className="absolute text-sm h-full px-4 top-0 flex items-center justify-center whitespace-nowrap bg-white left-1/2 -translate-x-1/2 rounded-md font-[my-font-Bd]">{wishlist.includes(data.movieId) ? 'Remove from favourite !' : 'Add to favourite !'}</div>
                      <Triangle className="fill-white top-3 -z-1 rotate-180 h-full aspect-square text-white absolute left-1/2 -translate-x-1/2"/>
                    </div>
                    
                    <Heart className={`h-[75%] w-[75%] md:mt-1  ${wishlist.includes(String(data.movieId)) ? 'fill-[#D9232E] text-[#D9232E]' : 'text-white'} ease-in duration-75`}  strokeWidth={1.5}  />
                  </div>
              </div>
              {/* <div onClick={()=>handleSound()} className="h-full  flex items-center rounded-full bg-[#ffffff22] justify-center cursor-pointer aspect-square  border-2 border-[#ffffffa7]">
                {isMuted ? <VolumeOff className="h-5 w-5" color="#fff" /> :<Volume2 className="h-5 w-5" color="#fff" />}
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayScreen;
