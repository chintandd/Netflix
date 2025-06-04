import { Play, Heart } from "lucide-react";
import { genresIds } from "../../utils/Constants";
import { Link } from "react-router-dom";
import { memo} from "react";
import { setWhislist } from "../../APIs/useSetWishlist";
import { useDispatch, useSelector } from "react-redux";
import { toggleWhislistMovies } from "../../../Redux/movieSlice";


const ExploreMovieCard = ({ data, isHovered, handleHover, removeHover }) => {


  let genresArray = data.genres.map((genre) => genresIds[genre]);
  let genresString = genresArray.splice(0, 3).join(" · ");
  const uid  = useSelector(store => store.auth.uid)
  const dispatch = useDispatch()
  
  const wishlistMovies = useSelector(store=>store.movie.whishlistMovies)
  const wishlist = wishlistMovies.map(w=>String(w.movieId))

  
    async function handleWhislist(movieId,poster,title,year,genres,popularity){
      
    const result =  await setWhislist(uid,movieId,poster,title,year,genres,popularity)
    if(result){
        dispatch(toggleWhislistMovies(result))
        console.log(result);
        
      }
      
    }
    



  return (

      <div
        onMouseEnter={() => handleHover(data.movieId)}
        onMouseLeave={removeHover}
        className="item aspect-video h-full rounded-xl relative cursor-pointer"
      >
        <div className="h-full rounded-xl -z-1">
          <Link to={`/watch?v=${data.movieId}`}>
              <img
                className="rounded-xl -z-1"
                src={`https://image.tmdb.org/t/p/w500${data.posterImage}`}
                alt={data.title}
                loading="lazy"
              />
          </Link>
          
        </div>

        <div
          className={`h-[0%] w-[0%] flex flex-col rounded-xl overflow-hidden aspect-video  ease duration-250 ${isHovered && "h-[200%] w-[130%] opacity-100 z-1"} absolute opacity-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#171717]`}
        >
          <Link to={`/watch?v=${data.movieId}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${data.posterImage}`}
                alt=""
                loading="eagar"
              />
          </Link>
          
          <div className="py-3 xl:py-3 px-5 flex-1 min-h-0">
            <div className="h-full w-full flex flex-col gap-2">
              <div className="play-like h-[40%] flex gap-3 items-center">
                    <Link to={`/watch?v=${data.movieId}`}>
                      <div className="rounded-full bg-white h-[90%]  p-[5px] flex justify-center items-center cursor-pointer">
                         <Play fill="black" className="w-full h-full" />
                      </div>
                    </Link>
                
                <div onClick={()=>handleWhislist(data.movieId,data.posterImage,data.title,data.year,data.genres,data.popularity)} className="rounded-full aspect-square h-[80%]  cursor-pointer">
                  <Heart className={`w-full h-full ${wishlist.includes(String(data.movieId)) && 'fill-[#D9232E] text-[#D9232E] '}   ease-in duration-75 `} />
                </div>
              </div>
              <div className="h-[50%]flex w-full  font-[my-font-Md] flex-col gap-1 items-start">
                <p className="text-sm lg:text-md xl:text-lg font-[my-font-Bd] line-clamp-1 ">
                  {data.title}
                </p>
                <p className="flex items-center text-xs lg:text-sm xl:text-md text-[#ffffffa3]">
                  {genresString}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default memo(
  ExploreMovieCard,
  (prev, next) => prev.isHovered == next.isHovered,
);
