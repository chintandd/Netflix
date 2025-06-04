import { Play } from "lucide-react";
import { CircleAlert } from "lucide-react";
import { heroMovieId } from "../utils/Constants";
import { Link } from "react-router-dom";

const HeroContent = ({ trailerDetails }) => {
  const { genres, directorName, year, title, overview } = trailerDetails;
  let genresString = genres.join(" | ");

  return (
    <div className=" max-w-screen px-5 py-2 md:px-15 bg-transparent mt-8 md:mt-25 text-white flex flex-col gap-3 md:gap-4 xl:gap-6">
      <p className="text-xs sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-[my-font-Md]">
        {genresString}
      </p>
      <h1 className="text-3xl md:text-6xl xl:text-7xl font-[my-font-Ebd] md:w-4/5 lg:3/4  leading-tight">
        {title}
      </h1>
      <p className="text-md md:text-xl lg:text-2xl xl:text-3xl font-[my-font-Md] spa">
        {year} | DIRECTOR:{" "}
        <span className="font-[my-font-Lt]">{directorName}</span>
      </p>
      <p className="text-sm md:text-lg lg:text-xl xl:text-2xl font-[my-font-Lt] w-full md:w-[80%] text-[#fffd]">
        {overview}
      </p>
      <div className="flex items-center gap-2 md:gap-4 h-9 md:h-13 mt-2 md:mt-0">
        <Link to={`/watch?v=${heroMovieId}`} className="h-full cursor-pointer">
          {" "}
          <div className="flex gap-3 items-center justify-center h-full bg-white text-black px-3 md:px-6 rounded-l-full rounded-r-full cursor-pointer">
            <Play fill="#000" size={20}/>
            <p className="text-sm sm:text-md md:text-lg lg:text-xl font-[my-font-Md]">
              Play
            </p>
          </div>
        </Link>
       
      </div>
    </div>
  );
};

export default HeroContent;
