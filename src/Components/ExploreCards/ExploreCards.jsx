import { useId, useState, memo } from "react";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import "swiper/css";
import ExploreMovieCard from "./ExploreMovieCard";

const ExploreCards = memo(({ title, movies }) => {
  const [hover, setHover] = useState(null);
  // const isLoading = useSelector((store)=>store.movie.loadingHandle.loadingPopular)
  const uniqueId = useId();

  function handleHover(movieId) {
    setHover(movieId);
  }

  function removeHover() {
    setHover(null);
  }


  if (movies.length == 0) {
    return (
      <div className="flex  flex-nowrap items-center overflow-hidden gap-3 md:gap-6 w-full py-4 md:py-6 px-5 md:px-15  h-40 md:h-44  lg:h-48 xl:h-60 2xl:h-60">
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
        <div className="bg-[#ffffff22] h-full aspect-video rounded-xl "></div>
      </div>
    );
  }
  return (
    <div className="w-screen  text-white">
      <div className="flex flex-col gap-3 md:gap-6 h-40 md:h-44  lg:h-48 xl:h-60 2xl:h-60 w-full">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-[my-font-bd] px-5 md:px-15">
          {title}
        </h2>
        <div className="card-container w-full flex-1 min-h-0 px-5 lg:px-15   relative">
          <Swiper
            modules={[Navigation, Scrollbar]}
            spaceBetween={10}
            speed={500}
            scrollbar
            slidesPerView="auto"
            slidesPerGroup={1}
            navigation={{
              nextEl: `.next-${uniqueId}`,
              prevEl: `.prev-${uniqueId}`,
            }}
            className="swiper-container h-full "
          >
            {movies.map((i) => {
              return (
                <SwiperSlide
                  key={i.movieId}
                  className={`swiper-slide h-full aspect-video ${hover == i.movieId && " overflow-visible z-1"}`}
                >
                  <ExploreMovieCard
                    data={i}
                    isHovered={hover == i.movieId}
                    handleHover={handleHover}
                    removeHover={removeHover}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div
            className={`swiper-button-prev prev-${uniqueId} absolute top-1/2 left-0 w-20 h-full -translate-y-1/2 cursor-pointer z-10 flex items-center justify-start`}
          >
            <ChevronLeft className="w-7 h-7 md:w-10 md:h-10 lg:w-13 lg:h-13 rounded-xl" />
          </div>
          {!hover && (
            <div className="absolute top-1/2 left-0 transform w-20 bg-gradient-to-r from-black/100 via-black/50 to-transparent h-full  -translate-y-1/2  cursor-pointer  z-8  flex items-center  justify-center"></div>
          )}
          <div
            className={`swiper-button-next next-${uniqueId} absolute top-1/2 right-5 w-20 h-full -translate-y-1/2 cursor-pointer z-10 flex items-center justify-end`}
          >
            <ChevronRight className="w-7 h-7 md:w-10 md:h-10 lg:w-13 lg:h-13 rounded-xl" />
          </div>
          {!hover && (
            <div className="absolute top-1/2 right-0 transform w-20 bg-gradient-to-l from-black/100 via-black/50 to-transparent h-full  -translate-y-1/2  cursor-pointer  z-8 flex items-center  justify-center"></div>
          )}
        </div>
      </div>
    </div>
  );
});

export default ExploreCards;
